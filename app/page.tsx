"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";
import { Button } from "@/components/ui/button";
import { TweetCard } from "@/components/ui/tweet-card";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const tweets = [
  "1884066338739830835",
  "1826866882064122056",
  "1638226410065268737",
  "1986514377470845007",
  "1882993091784880557",
  "1415752955152666627",
  "1725656554878492779",
  "1917711292325933358",
  "1890910896903319896",
  "1907275807191339448",
  "1907422133849911388",
  "1929282761170280832",
  "1925649192325648725",
  "1938964723342680437",
  "1985105567367708703"
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AlphaTrio Tech
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-gray-200 mb-6">
            {t("Where Deep Tech Meets Human Mindset")}
          </p>
          <p className="text-lg text-slate-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {t(
              "Professional IT solutions, automation, and AI services to transform your business"
            )}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="book-cta bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold text-white transition shadow-lg hover:shadow-purple-900/70 h-14 hover:cursor-pointer">
              {t("Book Free Consultation")}
            </Button>
            <Link
              href="/portfolio"
              className="border border-purple-500 text-slate-900 dark:text-white hover:bg-purple-500/10 px-8 py-3 rounded-lg font-semibold transition content-center"
            >
              {t("View Portfolio")}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Motivation Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("home.motivation.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("home.motivation.description")}
            </p>
          </div>
          <InfiniteMovingCards
            items={tweets.map(id => <TweetCard key={id} id={id} />)}
            direction="left"
            speed="slow"
            pauseOnHover={true}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_70%)]"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center text-white z-10"
        >
          <h2 className="text-4xl font-bold mb-6">
            {t("Ready to Transform Your Business?")}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t("Let's discuss how we can help you achieve your goals")}
          </p>
          <Button className="book-cta bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition shadow-lg h-12 hover:cursor-pointer">
            {t("Schedule Your Free Consultation")}
          </Button>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
