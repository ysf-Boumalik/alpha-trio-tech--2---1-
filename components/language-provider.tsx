"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Lang = "EN" | "AR" | "FR"

type LangContext = {
  language: Lang
  setLanguage: (l: Lang) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LangContext | undefined>(undefined)

const STORAGE_KEY = "alpha:language"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Lang>(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY)
      if (v === "EN" || v === "AR" || v === "FR") return v
    } catch (e) {
      // ignore
    }
    return "EN"
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch (e) {
      // ignore
    }

    // update html attributes for accessibility and direction
    if (typeof document !== "undefined") {
      if (language === "AR") {
        document.documentElement.lang = "ar"
        document.documentElement.dir = "rtl"
      } else if (language === "FR") {
        document.documentElement.lang = "fr"
        document.documentElement.dir = "ltr"
      } else {
        document.documentElement.lang = "en"
        document.documentElement.dir = "ltr"
      }
    }
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "AR" : prev === "AR" ? "FR" : "EN"))
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
