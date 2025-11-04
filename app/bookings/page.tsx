"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/useTranslation"
import { motion } from "framer-motion"
import Link from "next/link"

interface Booking {
  id: string
  name: string
  email: string
  service: string
  date: string
  message?: string
}

export default function BookingsPage() {
  const { t } = useTranslation()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "IT Solutions",
    date: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings")
      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error(t("bookings.form.error", "Error fetching bookings:"), error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const newBooking = await response.json()
        setBookings([...bookings, newBooking])
        setFormData({ name: "", email: "", service: "IT Solutions", date: "", message: "" })
        alert("✅ تم حفظ الحجز بنجاح!")
      }
    } catch (error) {
      console.error("❌ خطأ في إضافة الحجز:", error)
      alert("فشل في إضافة الحجز")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-gray-100 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full"
      >
        {/* زر الرجوع إلى الصفحة الرئيسية */}
        <div className="flex justify-end mb-6">
          <Link
            href="/"
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold text-white transition shadow-lg hover:shadow-purple-600/30"
          >
            {t("bookings.backHome")}
          </Link>
        </div>

        {/* العنوان */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
            {t("bookings.title")}
          </h1>
          <p className="text-gray-700 dark:text-gray-400 mt-3 text-lg">
            {t("bookings.subtitle")}
          </p>
        </div>

        {/* الفورم */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900/70 backdrop-blur-xl p-8 rounded-2xl border border-slate-300 dark:border-slate-700 hover:border-purple-500/50 transition-all shadow-lg shadow-purple-500/10"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t("bookings.form.title")}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">{t("bookings.form.name")}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                placeholder={t("bookings.form.placeholders.name")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">{t("bookings.form.email")}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
                placeholder={t("bookings.form.placeholders.email")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">{t("bookings.form.service")}</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition"
              >
                {(t("bookings.servicesOptions") as string[]).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">{t("bookings.form.date")}</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">{t("bookings.form.message")}</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 h-24 transition"
                placeholder={t("bookings.form.placeholders.message")}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 rounded-lg shadow-md shadow-purple-500/20 transition"
            >
              {submitting ? t("bookings.form.submitting") : t("bookings.form.submit")}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  )
}
