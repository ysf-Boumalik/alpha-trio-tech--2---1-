"use client"

import { useTranslation } from "@/lib/useTranslation"
import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { language } = useLanguage()
  const { t } = useTranslation()

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">AlphaTrio Tech</h3>
            <p className="text-gray-400 text-sm">{t("Where Deep Tech Meets Human Mindset")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("Quick Links")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/" className="hover:text-purple-400 transition">
                  {t("Home")}
                </a>
              </li>
              <li>
                <a href="/portfolio" className="hover:text-purple-400 transition">
                  {t("Portfolio")}
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-purple-400 transition">
                  {t("Services")}
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-purple-400 transition">
                  {t("About")}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t("Services")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/services#it" className="hover:text-purple-400 transition">
                  {t("IT Solutions")}
                </a>
              </li>
              <li>
                <a href="/services#automation" className="hover:text-purple-400 transition">
                  {t("Automation")}
                </a>
              </li>
              <li>
                <a href="/services#ai" className="hover:text-purple-400 transition">
                  {t("AI Solutions")}
                </a>
              </li>
              <li>
                <a href="/services#apps" className="hover:text-purple-400 transition">
                  {t("App Development")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("Contact")}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t("Email")}: contact@alphatriotech.com</li>
              <li>{t("Phone")}: +212 767879005</li>
              <li>{t("Address")}: Rabat, Morocco</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 mx-auto">
            © 2024 AlphaTrio Tech. {t("All rights reserved")}.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition">
              <span className="sr-only">Facebook</span>
              {/* Facebook Icon */}
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition">
              <span className="sr-only">Twitter</span>
              {/* Twitter Icon */}
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition">
              <span className="sr-only">LinkedIn</span>
              {/* LinkedIn Icon */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}