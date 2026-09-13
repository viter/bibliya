'use client';

import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { knyhySZ, knyhyNZ, StringDictionary } from '@/utils/knyhy';
import { decode } from 'html-entities';
import { useForm, UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useOverlayStore } from '@/store/overlayStore';
import { ScrollArea } from '../ui/scroll-area';

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

export default function SearchOverlayContent() {
  const router = useRouter();

  const closeOverlay = useOverlayStore((s) => s.closeOverlay);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
      zavit: [],
      knyha: [],
    },
  });

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
    closeOverlay();
    router.push(`/poshuk?${searchParams.toString()}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full p-3">
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
                        'focus:outline-hidden border outline-hidden border-muted-foreground/70 bg-background',
                        form.formState.errors.search &&
                          'bg-destructive/10 dark:border dark:border-destructive',
                      )}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button type="submit">Шукати</Button>
        </div>

        {form.formState.errors.search && (
          <p className="text-destructive mt-3">{form.formState.errors.search.message}</p>
        )}
        <div className="mt-5">
          <ScrollArea
            className="h-[60vh] max-h-154"
            scrollbarClassName="opacity-0 data-[hovering]:opacity-100 data-[scrolling]:opacity-100"
          >
            <div className="flex gap-5 bg-muted p-3 rounded-md">
              <ZavitChckBox zavit="sz" form={form} />
              <ZavitChckBox zavit="nz" form={form} />
            </div>

            <div className="grid grid-cols-3 gap-2 md:grid-cols-5 grid-flow-row mt-3 bg-muted p-3 rounded-lg">
              <KnyhyChckBoxes knyhy={knyhySZ} form={form} />
            </div>

            <div className="grid grid-cols-3 gap-2 md:grid-cols-5 grid-flow-row mt-3 bg-muted p-3 rounded-lg">
              <KnyhyChckBoxes knyhy={knyhyNZ} form={form} />
            </div>
          </ScrollArea>
        </div>
      </form>
    </Form>
  );
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
          <FormItem className="flex items-center">
            <FormControl>
              <Checkbox
                onCheckedChange={(checked) => {
                  if (checked) form.setValue('knyha', []);
                  return checked ? field.onChange([zavit]) : field.onChange([]);
                }}
                className="mr-2 bg-background border border-muted-foreground/70"
                checked={field.value?.includes(zavit)}
              />
            </FormControl>
            <FormLabel className="text-foreground text-xs md:text-base font-normal">
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
                <FormItem key={knyha[0]} className="flex items-center">
                  <FormControl>
                    <Checkbox
                      onCheckedChange={(checked) => {
                        if (checked) form.setValue('zavit', []);
                        return checked
                          ? field.onChange([...(field.value as string[]), knyha[0]])
                          : field.onChange(field.value?.filter((value) => value !== knyha[0]));
                      }}
                      className="mr-2 bg-background border border-muted-foreground/70"
                      checked={field.value?.includes(knyha[0])}
                    />
                  </FormControl>
                  <FormLabel
                    className="text-foreground text-xs md:text-base font-normal"
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
