// src/components/LanguageSwitcher.tsx
'use client';  // Client Component
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const t = useTranslations('common');  // إذا عندك namespace للـ common
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div>
      <button onClick={() => switchLanguage('en')}>EN</button>
      <button onClick={() => switchLanguage('ar')}>AR</button>
      <button onClick={() => switchLanguage('fr')}>FR</button>
    </div>
  );
}