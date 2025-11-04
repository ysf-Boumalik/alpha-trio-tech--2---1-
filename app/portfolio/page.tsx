"use client"

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import { useTranslation } from "@/lib/useTranslation";
import { useLanguage } from "@/components/language-provider";

export default function Portfolio() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      title: t("Inventory Management Dashboard"),
      description: t("Real-time inventory tracking system with analytics"),
      tags: ["React", "Node.js", "MongoDB"],
      year: 2024,
      image: "/images/img1.png",
    },
    {
      id: 2,
      title: t("Marketing Automation Platform"),
      description: t("Email marketing and campaign automation tool"),
      tags: ["Next.js", "Python", "PostgreSQL"],
      year: 2024,
      image: "/images/spyci.png",
    },
    {
      id: 3,
      title: t("Data Analytics Dashboard"),
      description: t("Business intelligence and data visualization platform"),
      tags: ["React", "D3.js", "AWS"],
      year: 2023,
      image: "/images/fatai.PNG",
    },
    {
      id: 4,
      title: t("Project Management System"),
      description: t("Collaborative project management and team coordination"),
      tags: ["Vue.js", "Firebase", "Tailwind"],
      year: 2023,
      image: "/images/thumbnail-maker.png",
    },
    {
      id: 5,
      title: t("RPA Solution"),
      description: t("Robotic process automation for enterprise workflows"),
      tags: ["Python", "UiPath", "Azure"],
      year: 2023,
      image: "/images/imgGYM.png",
    },
    {
      id: 6,
      title: t("E-Commerce Platform"),
      description: t("Full-stack e-commerce solution with payment integration"),
      tags: ["Next.js", "Stripe", "Supabase"],
      year: 2022,
      image: "/images/mohssni.jpg",
    },
  ];

  return (
    <>
      <Navigation />

      <section className="min-h-screen bg-white text-gray-900 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            {t("Our Portfolio")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            {t("Explore our latest projects and see how we've helped businesses transform with technology")}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl shadow-gray-700/50 dark:shadow-black/60 hover:shadow-2xl hover:shadow-purple-500/30 ring-1 ring-white/50 dark:ring-slate-600/30 transition-all duration-400 hover:-translate-y-2 hover:scale-105"
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 dark:opacity-60"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full 
                                   bg-gradient-to-r from-purple-500/20 to-blue-500/20
                                   text-purple-700 dark:text-purple-300 border border-purple-500/30
                                   group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-500 text-sm">
                    {t("Year")}: {project.year}
                  </p>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 blur-2xl opacity-25"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}