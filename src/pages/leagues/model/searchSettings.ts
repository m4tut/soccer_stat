import { IOptions } from '~shared/ui/MySelect/types';

// input
export const placeholderInput: string = 'Найти';

// select
export const defaultValueSelect: string = 'league';

export const optionsSelect: IOptions[] = [
  { text: 'Лига', value: 'league' },
  { text: 'Страна', value: 'country' },
];
