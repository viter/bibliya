import type { JSX, ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Інструкція',
  description: 'Як читати, шукати та зберігати цитати на сайті «Святе Письмо»',
};

const sections = [
  { id: 'chytannia', title: 'Читання' },
  { id: 'poshuk', title: 'Пошук' },
  { id: 'vyhliad', title: 'Вигляд сайту' },
  { id: 'akaunt', title: 'Акаунт' },
  { id: 'tsytaty', title: 'Мої цитати' },
  { id: 'pytannia', title: 'Часті питання' },
];

function Ui({ children, solid = false }: { children: ReactNode; solid?: boolean }): JSX.Element {
  return (
    <span
      className={
        solid
          ? 'inline-block whitespace-nowrap rounded-md bg-primary px-2 text-sm font-medium text-primary-foreground'
          : 'inline-block whitespace-nowrap rounded-md border border-border bg-secondary px-2 text-sm font-medium text-secondary-foreground'
      }
    >
      {children}
    </span>
  );
}

function Note({ children, warn = false }: { children: ReactNode; warn?: boolean }): JSX.Element {
  return (
    <p className={warn ? 'rounded-lg bg-accent p-4 text-sm' : 'rounded-lg bg-muted p-4 text-sm'}>
      {children}
    </p>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }): JSX.Element {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function Steps({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ol className="flex list-decimal flex-col gap-2 pl-6 marker:font-semibold marker:text-primary">
      {children}
    </ol>
  );
}

function Bullets({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-muted-foreground">{children}</ul>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <section id={id} className="flex scroll-mt-4 flex-col gap-4">
      <h2 className="border-b-2 border-primary pb-2 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Faq({ question, children }: { question: string; children: ReactNode }): JSX.Element {
  return (
    <details className="rounded-lg border border-border bg-card">
      <summary className="cursor-pointer px-4 py-3 font-medium">{question}</summary>
      <div className="px-4 pb-4">{children}</div>
    </details>
  );
}

export default function DopomohaPage(): JSX.Element {
  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-10 pb-16 leading-relaxed text-foreground">
      <header>
        <h1 className="text-3xl font-bold text-primary md:text-4xl">Як користуватися сайтом</h1>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Читайте Біблію в перекладі о. Івана Хоменка, шукайте потрібні слова та зберігайте улюблені
          вірші у власну добірку цитат.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Без реєстрації
          </h2>
          <ul className="list-disc pl-5">
            <li>читати всі книги</li>
            <li>шукати за словами й фразами</li>
            <li>обирати тему й колір сайту</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Після реєстрації
          </h2>
          <ul className="list-disc pl-5">
            <li>виділяти вірші й копіювати їх з підписом</li>
            <li>зберігати цитати</li>
            <li>розкладати їх за категоріями</li>
          </ul>
        </div>
      </div>

      <nav aria-label="Зміст інструкції" className="border-y border-border py-4">
        <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Зміст
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-primary underline underline-offset-4">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="chytannia" title="Читання">
        <Block title="Відкрийте книгу">
          <p>
            На головній сторінці книги розділені на <strong>Старий</strong> і{' '}
            <strong>Новий Завіт</strong>. Натисніть на назву книги, і вона відкриється. Щоб
            повернутися до списку книг, натисніть кнопку «додому» у верхньому лівому куті. На всіх
            сторінках, окрім книги, для цього також можна натиснути заголовок «Святе Письмо» зверху.
          </p>
        </Block>

        <Block title="Переходьте між розділами">
          <p>
            На комп’ютері зміст розділів завжди видно ліворуч від тексту: натисніть на потрібний
            розділ, і текст прокрутиться до нього. Розділ, який ви читаєте зараз, у змісті
            виділяється жирним.
          </p>
          <p>На телефоні зміст ховається. Відкрити його можна двома способами:</p>
          <Bullets>
            <li>натисніть значок меню (три смужки) у верхньому лівому куті;</li>
            <li>
              або проведіть пальцем по тексту <strong>вправо</strong>. Проведіть{' '}
              <strong>вліво</strong>, щоб закрити.
            </li>
          </Bullets>
          <p>
            Свайп має бути довгим і горизонтальним, тож звичайне гортання тексту вгору-вниз меню не
            відкриє.
          </p>
        </Block>
      </Section>

      <Section id="poshuk" title="Пошук">
        <Steps>
          <li>Натисніть значок лупи у верхньому правому куті.</li>
          <li>
            Введіть слово або фразу. Мінімум <strong>3 символи</strong>.
          </li>
          <li>
            За потреби звузьте пошук. Позначте <Ui>Старий Завіт</Ui> або <Ui>Новий Завіт</Ui>, або
            окремі книги (наведіть курсор на скорочення, щоб побачити повну назву).
          </li>
          <li>
            Натисніть <Ui solid>Шукати</Ui>.
          </li>
        </Steps>

        <Note>
          <strong>Або Завіт, або книги.</strong> Позначивши завіт, ви знімаєте вибір з окремих книг,
          і навпаки. Якщо нічого не позначено, сайт шукає по всій Біблії.
        </Note>

        <Block title="Що ви побачите">
          <p>
            Спершу йдуть вірші, де слова стоять точно в тому порядку, як ви їх ввели. Далі ті, де є
            всі слова, а наприкінці ті, де є хоча б одне. Знайдені слова підсвічуються жовтим.
          </p>
          <p>
            Натисніть на вірш у результатах, і <strong>у новій вкладці</strong> відкриється книга
            просто на цьому вірші. Список результатів залишається відкритим.
          </p>
        </Block>
      </Section>

      <Section id="vyhliad" title="Вигляд сайту">
        <p>
          Дві кнопки біля лупи налаштовують сайт під ваші очі. Обраний вигляд запам’ятовується в
          цьому браузері.
        </p>
        <Bullets>
          <li>
            <strong>Тема.</strong> Значок місяця чи сонця перемикає світлу й темну тему. Темна
            зручніша для вечірнього читання.
          </li>
          <li>
            <strong>Кольорова схема.</strong> Значок палітри відкриває 10 схем: «Опівнічне перо»,
            «Візантія», «Лісовий пергамен», «Патина» та інші. Схему й тему можна поєднувати.
          </li>
        </Bullets>
        <p>У книзі на телефоні ці дві кнопки лежать усередині меню розділів (див. вище).</p>
      </Section>

      <Section id="akaunt" title="Акаунт">
        <p>Акаунт потрібен лише для цитат. Читати й шукати можна й без нього.</p>

        <Block title="Реєстрація">
          <Steps>
            <li>
              Натисніть значок людини у верхньому правому куті, потім{' '}
              <strong>Зареєструватися</strong>.
            </li>
            <li>
              Вкажіть ім’я (від 2 символів), електронну пошту та пароль (від 8 символів). Пароль
              введіть двічі.
            </li>
            <li>
              Відкрийте лист від сайту та перейдіть за посиланням у ньому. Після цього ви одразу
              опинитесь у своєму акаунті.
            </li>
          </Steps>
          <Note warn>
            Поки пошту не підтверджено, увійти не вдасться. Якщо ви спробуєте, сайт надішле новий
            лист із посиланням. Не знайшли лист? Перевірте «Спам».
          </Note>
        </Block>

        <Block title="Вхід">
          <p>
            Введіть пошту й пароль або натисніть кнопку входу через <strong>Google</strong>, тоді
            пароль не потрібен. Коли ви ввійшли, значок людини змінюється на значок виходу. Наведіть
            курсор, і побачите своє ім’я. Натисніть його, щоб вийти.
          </p>
        </Block>

        <Block title="Забули пароль">
          <p>
            На сторінці входу натисніть <strong>Забули пароль?</strong>, введіть пошту й отримайте
            лист із посиланням. Перейдіть за ним і задайте новий пароль.
          </p>
        </Block>
      </Section>

      <Section id="tsytaty" title="Мої цитати">
        <Block title="Як зберегти цитату">
          <Steps>
            <li>Увійдіть в акаунт і відкрийте потрібну книгу.</li>
            <li>
              Виділіть текст. Це можна зробити мишею або пальцем, як завжди виділяють текст на
              сторінці. Виділення має починатися й закінчуватися всередині віршів.
            </li>
            <li>
              Над виділенням з’явиться маленька панель із двома кнопками: <Ui>Копіювати</Ui> і{' '}
              <Ui>Створити цитату</Ui> (значок лапок).
            </li>
            <li>
              У вікні <strong>Нова цитата</strong> за потреби відредагуйте текст, оберіть категорії
              й натисніть <Ui solid>Зберегти</Ui>.
            </li>
          </Steps>
          <p>
            Номери віршів у текст не потрапляють. Натомість сайт сам додає в кінці підпис із
            посиланням:
          </p>
          <figure className="rounded-lg border border-border bg-card p-4">
            <figcaption className="mb-1.5 text-xs tracking-wider text-muted-foreground uppercase">
              Приклад підпису: книга, розділ, вірші
            </figcaption>
            <p className="italic">
              Текст виділених віршів …{' '}
              <span className="font-medium text-primary not-italic">(Йо. 3,16)</span>
            </p>
          </figure>
          <p>
            Кнопка <strong>Копіювати</strong> на панелі теж копіює текст разом із цим підписом. Її
            зручно використати, щоб надіслати вірш у месенджері.
          </p>
          <Note>Панель виділення показується тільки після входу в акаунт.</Note>
        </Block>

        <Block title="Категорії">
          <p>
            Категорії допомагають розкласти цитати за темами: «Молитва», «Втіха», «Для проповіді».
            Створити нову можна прямо у вікні <strong>Нова цитата</strong>: натисніть{' '}
            <Ui>Додати категорію</Ui>, введіть назву й збережіть. Цитата може мати кілька категорій.
          </p>
          <p>
            Якщо жодну категорію не обрано, цитата потрапляє в категорію{' '}
            <strong>Без категорії</strong>. Щойно ви додасте справжню категорію, «Без категорії» з
            цієї цитати зникне.
          </p>
        </Block>

        <Block title="Перегляд і фільтр">
          <p>
            Усі збережені цитати лежать на сторінці <strong>Цитати</strong>. Кнопка з лапками
            з’являється у верхній панелі після входу, на телефоні вона без підпису. Найновіші цитати
            йдуть першими.
          </p>
          <Bullets>
            <li>
              Список категорій розташовано праворуч, а на телефоні він відкривається кнопкою{' '}
              <Ui>Категорії</Ui>.
            </li>
            <li>
              Натисніть категорію, щоб побачити лише її цитати. Можна обрати кілька: тоді
              показуються цитати з будь-якої з них.
            </li>
            <li>Натисніть категорію ще раз, щоб зняти вибір.</li>
            <li>Біля кожної цитати є кнопка копіювання.</li>
          </Bullets>
        </Block>

        <Block title="Редагування й видалення">
          <p>
            Щоб нічого не видалити випадково, кнопки змін приховано. Натисніть значок шестерні над
            списком (<Ui>Редагувати категорії</Ui>), і з’являться:
          </p>
          <Bullets>
            <li>
              <strong>біля цитати:</strong> значок ярлика, що змінює категорії цієї цитати, і кошик,
              що видаляє її (з підтвердженням);
            </li>
            <li>
              <strong>біля категорії:</strong> олівець для перейменування й кошик для видалення;
            </li>
            <li>
              <Ui>Додати категорію</Ui> під списком категорій.
            </li>
          </Bullets>
          <p>Закінчивши, натисніть шестерню ще раз.</p>
          <Note warn>
            <strong>Про що варто знати.</strong> Категорію можна видалити, лише коли в ній немає
            цитат. Спершу перенесіть або видаліть цитати. Назви категорій не можуть повторюватися.
            Текст уже збереженої цитати змінити не можна: видаліть її й створіть нову.
          </Note>
        </Block>
      </Section>

      <Section id="pytannia" title="Часті питання">
        <div className="flex flex-col gap-2">
          <Faq question="Панелі з кнопками «Копіювати» і «Створити цитату» немає">
            Перевірте, що ви ввійшли в акаунт і що виділення починається й закінчується всередині
            тексту віршів, а не на назві розділу чи порожньому місці. Спробуйте виділити знову.
          </Faq>
          <Faq question="Не приходить лист для підтвердження або скидання пароля">
            Зачекайте кілька хвилин і перевірте папку «Спам». Переконайтеся, що пошту введено без
            помилок. Для підтвердження можна спробувати увійти ще раз: сайт надішле новий лист.
          </Faq>
          <Faq question="Пошук нічого не знайшов">
            Спробуйте коротше слово або інші закінчення, а також зніміть позначки з книг і завітів.
            Пошук працює по слову в тому вигляді, як воно написане в тексті.
          </Faq>
          <Faq question="Що за вікно про cookie-файли?">
            Сайт використовує аналітичні cookie, щоб розуміти, як ним користуються. Ви можете{' '}
            <strong>Прийняти</strong> або <strong>Відхилити</strong> їх, і на читання та цитати це
            не вплине.
          </Faq>
          <Faq question="Мої тема й кольори «злетіли»">
            Вигляд зберігається в самому браузері. Якщо ви очистили дані сайтів, відкрили сайт в
            іншому браузері чи в режимі інкогніто, оберіть тему й схему ще раз.
          </Faq>
        </div>
      </Section>
    </article>
  );
}
