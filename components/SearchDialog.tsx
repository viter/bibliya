import React, { useEffect, useRef, type JSX } from 'react';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { knyhySZ, knyhyNZ, StringDictionary } from '@/utils/knyhy';
import { decode } from 'html-entities';
import { useForm, UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

interface SearchDialogProps {
  showDialog: boolean;
  onClose: () => void;
}

interface StringBooleanDictionary {
  [key: string]: boolean;
}

const booksCheckboxes: StringBooleanDictionary = {};

knyhySZ.forEach((item) => {
  Object.entries(item).forEach((knyha) => {
    booksCheckboxes[knyha[0]] = false;
  });
});
knyhyNZ.forEach((item) => {
  Object.entries(item).forEach((knyha) => {
    booksCheckboxes[knyha[0]] = false;
  });
});

const formSchema = z.object({
  search: z
    .string()
    .min(1, { message: 'Потрібно ввести пошукову фразу.' })
    .min(3, {
      message: 'Пошукова фраза має містити принаймні 3 символи.',
    })
    .max(200, { message: 'Пошукова фраза надто довга.' }),
  zavit: z.array(z.string()).optional(),
  knyha: z.array(z.string()).optional(),
});

export default function SearchDialog({ showDialog, onClose }: SearchDialogProps) {
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
      zavit: [],
      knyha: [],
    },
  });

  useEffect(() => {
    if (showDialog) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  function closeDialog() {
    dialogRef.current?.close();
    onClose();
    form.clearErrors();
    form.reset();
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    const searchParams = new URLSearchParams();
    searchParams.append('q', data.search);
    if (data.zavit?.length) {
      searchParams.append('zavit', data.zavit[0]);
    }
    if (data.knyha?.length) {
      data.knyha.forEach((kn) => {
        searchParams.append('k', kn);
      });
    }

    router.push(`/poshuk?${searchParams.toString()}`);
  }

  const dialog: JSX.Element | null = showDialog ? (
    <dialog
      ref={dialogRef}
      className="md:w-1/2 text-xs md:text-base bg-neutral-300 dark:bg-neutral-700 rounded-md shadow-lg backdrop:backdrop-blur-sm outline-hidden"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          closeDialog();
        }
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full h-full p-3">
          <div className="flex w-full items-center space-x-2">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        id="search"
                        className={cn(
                          'focus:outline-hidden border-0 outline-hidden shadow-md rounded-lg dark:bg-neutral-600',
                          form.formState.errors.search &&
                            'bg-red-100 dark:border dark:border-red-500',
                        )}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <Button
              type="submit"
              className="drop-shadow-md rounded-lg dark:bg-neutral-800 dark:text-neutral-300"
            >
              Шукати
            </Button>
          </div>

          {form.formState.errors.search && (
            <p className="text-red-500 mt-3">{form.formState.errors.search.message}</p>
          )}

          <div className="flex mt-5 gap-5 bg-neutral-200 dark:bg-neutral-600 p-3 rounded-lg">
            <ZavitChckBox zavit="sz" form={form} />
            <ZavitChckBox zavit="nz" form={form} />
          </div>

          <div className="grid grid-cols-4 md:grid-cols-5 grid-flow-row mt-3 bg-neutral-200 dark:bg-neutral-600 p-3 rounded-lg">
            <KnyhyChckBoxes knyhy={knyhySZ} form={form} />
          </div>

          <div className="grid grid-cols-5 grid-flow-row mt-3 bg-neutral-200 dark:bg-neutral-600 p-3 rounded-lg">
            <KnyhyChckBoxes knyhy={knyhyNZ} form={form} />
          </div>
        </form>
      </Form>
    </dialog>
  ) : null;

  return dialog;
}

interface ZavitChckBoxProps {
  zavit: string;
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

function ZavitChckBox({ zavit, form }: ZavitChckBoxProps) {
  return (
    <FormField
      control={form.control}
      name="zavit"
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <Checkbox
                onCheckedChange={(checked) => {
                  if (checked) form.setValue('knyha', []);
                  return checked ? field.onChange([zavit]) : field.onChange([]);
                }}
                className="mr-2 bg-neutral-100 border-none rounded-md"
                checked={field.value?.includes(zavit)}
              />
            </FormControl>
            <FormLabel className="dark:text-neutral-200 text-xs md:text-base font-normal">
              {zavit === 'sz' ? 'Старий Завіт' : 'Новий Завіт'}
            </FormLabel>
          </FormItem>
        );
      }}
    />
  );
}

interface KnyhyChckBoxesProps {
  knyhy: StringDictionary[];
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

function KnyhyChckBoxes({ knyhy, form }: KnyhyChckBoxesProps) {
  return (
    <>
      {knyhy.map((item) => {
        return Object.entries(item).map((knyha) => {
          return (
            <FormField
              key={knyha[0]}
              control={form.control}
              name="knyha"
              render={({ field }) => (
                <FormItem key={knyha[0]}>
                  <FormControl>
                    <Checkbox
                      onCheckedChange={(checked) => {
                        if (checked) form.setValue('zavit', []);
                        return checked
                          ? field.onChange([...(field.value as string[]), knyha[0]])
                          : field.onChange(field.value?.filter((value) => value !== knyha[0]));
                      }}
                      className="mr-2 bg-neutral-100 border-none rounded-md"
                      checked={field.value?.includes(knyha[0])}
                    />
                  </FormControl>
                  <FormLabel
                    className="dark:text-neutral-200 text-xs md:text-base font-normal"
                    title={
                      Array.isArray(knyha[1].title)
                        ? decode(knyha[1].title[1])
                        : decode(knyha[1].title)
                    }
                  >
                    {knyha[1].short}
                  </FormLabel>
                </FormItem>
              )}
            />
          );
        });
      })}
    </>
  );
}
