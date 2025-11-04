"use client"

import * as React from "react"
import { Globe } from "lucide-react"
import { useLanguage } from "./language-provider"

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      title="Change language"
      aria-label="Change language"
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 transition ${className ?? ""}`}
    >
      <Globe size={16} />
      <span className="font-semibold text-sm">{language}</span>
    </button>
  )
}

