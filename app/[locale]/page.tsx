import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');
  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('hero.subtitle')}
          </p>
          <button className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            {t('hero.cta')}
          </button>
        </div>
      </main>
    </div>
  );
}
