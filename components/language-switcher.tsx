"use client";

import { useLanguage } from "./language-provider";
import { Button } from "./ui/button";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "EN", label: "English" },
    { code: "FR", label: "Français" },
    { code: "AR", label: "العربية" },
  ];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => setLanguage(lang.code as any)}
        >
          {lang.code}
        </Button>
      ))}
    </div>
  );
}