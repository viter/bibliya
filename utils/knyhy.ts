export interface StringDictionary {
  [key: string]: { [key: string]: string | string[] };
}

export const knyhySZ: StringDictionary[] = [
  {
    but: { title: 'Буття', short: 'Бут.' },
    vyh: { title: 'Вихід', short: 'Вих.' },
    lev: { title: 'Левіт', short: 'Лев.' },
    chs: { title: 'Числа', short: 'Чис.' },
    vtz: { title: 'Второзаконня', short: 'Втор.' },
  },
  {
    nav: { title: 'Ісуса Навина', short: 'І. Н.' },
    sud: { title: 'Суддів', short: 'Суд.' },
    rut: { title: 'Рути', short: 'Рут.' },
    sam1: { title: 'I Самуїла', short: '1 Сам.' },
    sam2: { title: 'II Самуїла', short: '2 Сам.' },
    car1: { title: 'I Царів', short: '1 Цар.' },
    car2: { title: 'II Царів', short: '2 Цар.' },
    hr1: { title: 'I Хронік', short: '1 Хр.' },
    hr2: { title: 'II Хронік', short: '2 Хр.' },
    ezry: { title: 'Езри', short: 'Ез.' },
    neem: { title: 'Неємії', short: 'Неєм.' },
    tov: { title: 'Товита', short: 'Тов.' },
    jdt: { title: 'Юдити', short: 'Юд.' },
    est: { title: 'Естери', short: 'Ест.' },
    mak1: { title: 'I Макавеїв', short: '1 Мак.' },
    mak2: { title: 'II Макавеїв', short: '2 Мак.' },
  },
  {
    iov: { title: 'Іова', short: 'Іов.' },
    psal: { title: 'Псалмів', short: 'Пс.' },
    pryp: { title: 'Приповідок', short: 'Прип.' },
    prp: { title: 'Проповідника', short: 'Проп.' },
    pisn: { title: 'Пісні Пісень', short: 'П. п.' },
    mudr: { title: 'Мудрости', short: 'Муд.' },
    syr: { title: 'Сираха', short: 'Сир.' },
  },
  {
    isaj: { title: 'Ісаї', short: 'Іс.' },
    jer: { title: 'Єремії', short: 'Єр.' },
    pla: { title: 'Плач Єремії', short: 'Пл. Єр.' },
    var: { title: 'Варуха', short: 'Вар.' },
    lyst: { title: 'Лист Єремії', short: 'Лист Єр.' },
    jez: { title: 'Єзекиїла', short: 'Єз.' },
    dan: { title: 'Даниїла', short: 'Дан.' },
    osija: { title: 'Осії', short: 'Ос.' },
    joil: { title: 'Йоіла', short: 'Йоіл.' },
    amos: { title: 'Амоса', short: 'Ам.' },
    avd: { title: 'Авдія', short: 'Авд.' },
    jona: { title: 'Йони', short: 'Йона' },
    mih: { title: 'Міхея', short: 'Міх.' },
    naum: { title: 'Наума', short: 'Наум' },
    avak: { title: 'Авакума', short: 'Ав.' },
    sof: { title: 'Софонії', short: 'Соф.' },
    agg: { title: 'Аггея', short: 'Аг.' },
    zah: { title: 'Захарії', short: 'Зах.' },
    mal: { title: 'Малахії', short: 'Мал.' },
  },
];

export const knyhyNZ: StringDictionary[] = [
  {
    mat: { title: ['від Матея', 'Євангеліє від Матея'], short: 'Мт.' },
    mar: { title: ['від Марка', 'Євангеліє від Марка'], short: 'Мр.' },
    luk: { title: ['від Луки', 'Євангеліє від Луки'], short: 'Лк.' },
    ioan: { title: ['від Йоана', 'Євангеліє від Йоана'], short: 'Йо.' },
  },
  {
    dij: { title: 'Діяння апостолів', short: 'Ді.' },
  },
  {
    rym: { title: ['до Римлян', 'Послання Ап. Павла до Римлян'], short: 'Рим.' },
    kor1: { title: ['I до Корінтян', 'I Послання Ап. Павла до Корінтян'], short: '1 Кор.' },
    kor2: { title: ['II до Корінтян', 'II Послання Ап. Павла до Корінтян'], short: '2 Кор.' },
    gal: { title: ['до Галатів', 'Послання Ап. Павла до Галатів'], short: 'Гал.' },
    efes: { title: ['до Ефесян', 'Послання Ап. Павла до Ефесян'], short: 'Еф.' },
    fyl: { title: ['до Филип&apos;ян', 'Послання Ап. Павла до Филип&apos;ян'], short: 'Флп.' },
    kol: { title: ['до Колосян', 'Послання Ап. Павла до Колосян'], short: 'Кол.' },
    sol1: { title: ['I Солунян', 'I Послання Ап. Павла до Солунян'], short: '1 Сол.' },
    sol2: { title: ['II Солунян', 'II Послання Ап. Павла до Солунян'], short: '2 Сол.' },
    tym1: { title: ['I до Тимотея', 'I Послання Ап. Павла до Тимотея'], short: '1 Тим.' },
    tym2: { title: ['II до Тимотея', 'II Послання Ап. Павла до Тимотея'], short: '2 Тим.' },
    tyt: { title: ['до Тита', 'Послання Ап. Павла до Тита'], short: 'Тит.' },
    flm: { title: ['до Филимона', 'Послання Ап. Павла до Филимона'], short: 'Флм.' },
    evr: { title: ['до Євреїв', 'Послання Ап. Павла до Євреїв'], short: 'Євр.' },
  },
  {
    jak: { title: ['Ап. Якова', 'Послання Ап. Якова'], short: 'Як.' },
  },
  {
    pet1: { title: ['Перше', 'Перше послання Ап. Петра'], short: '1 Пт.' },
    pet2: { title: ['Друге', 'Друге послання Ап. Петра'], short: '2 Пт.' },
  },
  {
    iva1: { title: ['Перше', 'Перше послання Ап. Йоана'], short: '1 Йо.' },
    iva2: { title: ['Друге', 'Друге послання Ап. Йоана'], short: '2 Йо.' },
    iva3: { title: ['Третє', 'Третє послання Ап. Йоана'], short: '3 Йо.' },
  },
  {
    jud: { title: ['Ап. Юди', 'Послання Ап. Юди'], short: 'Юд.' },
  },
  {
    odkr: { title: 'Одкровення Йоана', short: 'Од.' },
  },
];

const knyhyArr = [...knyhySZ, ...knyhyNZ];
export let knyhy: StringDictionary = {};
knyhyArr.forEach((kn) => {
  knyhy = { ...knyhy, ...kn };
});
