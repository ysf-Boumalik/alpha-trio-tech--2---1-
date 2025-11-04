"use client"

import { useMemo } from "react"
import en from "@/locales/en.json"
import fr from "@/locales/fr.json"
import ar from "@/locales/ar.json"
import { useLanguage } from "@/components/language-provider"

type Lang = "EN" | "FR" | "AR"

const DICT: Record<Lowercase<Lang>, any> = {
  en,
  fr,
  ar,
}

function getByKey(obj: any, key: string) {
  if (!key) return undefined
  const parts = key.split('.')
  let cur: any = obj
  for (const p of parts) {
    if (cur == null) return undefined
    cur = cur[p]
  }
  return cur
}

export function useTranslation() {
  const { language } = useLanguage()

  const dict = useMemo(() => {
    const code = (language || "EN").toLowerCase() as Lowercase<Lang>
    return DICT[code] || DICT.en
  }, [language])

  function t(key: string, fallback?: string) {
    const val = getByKey(dict, key)
    if (val == null) return fallback ?? key
    return val
  }

  return { t, locale: language }
}
