// src/config/i18n.ts
export const locales = ['en', 'ar', 'fr'] as const;  // أضف 'fr' هنا

export const defaultLocale = 'en';

export const localeConfig = {
  en: { direction: 'ltr' },
  ar: { direction: 'rtl' },  // RTL للعربية
  fr: { direction: 'ltr' },  // LTR للفرنسية
} as const;