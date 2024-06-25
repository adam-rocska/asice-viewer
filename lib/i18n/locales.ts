const locales = [
  'en',
  'hu', 'de', 'ro', 'sk', 'hr'
] as const;

export default locales;
export type KnownLocale = typeof locales[number];

export function isKnownLocale(candidate: string): candidate is KnownLocale {
  return locales.includes(candidate as any);
}