export interface Palette {
  key: string;
  name: string;
  swatch: string;
  swatchDark: string;
}

export const PALETTES: Palette[] = [
  { key: 'parchment', name: 'Тепла пергамена', swatch: '#8b5e34', swatchDark: '#c9a26b' },
  { key: 'slate', name: 'Грифельний', swatch: '#3e5c76', swatchDark: '#7fa6c9' },
  { key: 'forest', name: 'Лісовий пергамен', swatch: '#3f6e52', swatchDark: '#7fa98b' },
  { key: 'verdigris', name: 'Патина', swatch: '#3f7d72', swatchDark: '#6bbca9' },
  { key: 'midnight', name: 'Опівнічне перо', swatch: '#1f3a5f', swatchDark: '#5b8fc9' },
  { key: 'byzantine', name: 'Візантія', swatch: '#7a1f2b', swatchDark: '#c9a227' },
  { key: 'indigo', name: 'Вечірнє індиго', swatch: '#4b3f78', swatchDark: '#9683c9' },
  { key: 'rose', name: 'Рожевий рукопис', swatch: '#9c5257', swatchDark: '#cf8f8f' },
  { key: 'ink', name: 'Чорнило і папір', swatch: '#3a3a36', swatchDark: '#c9c7bf' },
  { key: 'olive', name: 'Оливковий скрипторій', swatch: '#6b7a3f', swatchDark: '#a6b56a' },
];

export const DEFAULT_PALETTE = 'midnight';
export const PALETTE_STORAGE_KEY = 'bibliya-palette';
