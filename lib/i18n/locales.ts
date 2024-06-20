const locales = [
  'en',
  'hu', 'de', 'ro', 'sk', 'hr'
] as const;

export default locales;
export type Locale = typeof locales[number];