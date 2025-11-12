"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useTranslation } from "@/lib/useTranslation";

export default function About() {
  const { t } = useTranslation();

  const team = [
    {
      name: "Mohcine Ezzirari",
      role: t("Lead Developer"),
      bio: t("Expert in full-stack development and system architecture"),
      image: "/images/mohsiinphoto.png",
    },
    {
      name: "Youssef Boumalik",
      role: t("AI Specialist"),
      bio: t("Specialized in machine learning and AI solutions"),
      image: "/images/yyyoooo.png",
    },
    {
      name: "Elhoussin Razouki",
      role: t("DevOps Engineer"),
      bio: t("Cloud infrastructure and automation expert"),
      image:"hossinphoto.png",
    },
  ];

  return (
    <>
      <Navigation />

      <section className="min-h-screen bg-white text-gray-900 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-4">
            {t("About AlphaTrio Tech")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            {t("Building innovative technology solutions since 2020")}
          </p>

          {/* Company Story */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg border border-slate-200 dark:border-slate-700 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              {t("Our Story")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t("company.story.paragraph1")}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {t("company.story.paragraph2")}
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: t("Results-Focused"),
                desc: t("We measure success by your business outcomes"),
              },
              {
                title: t("Innovation"),
                desc: t("Always exploring new technologies and approaches"),
              },
              {
                title: t("Collaboration"),
                desc: t("Working closely with you every step of the way"),
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl shadow-gray-700/50 dark:shadow-black/60 hover:shadow-2xl hover:shadow-purple-500/30 ring-1 ring-white/50 dark:ring-slate-600/30 transition-all duration-400 hover:-translate-y-2 hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>

          {/* Our Team */}
          <div>
            <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              {t("Our Team")}
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="relative group rounded-2xl border border-slate-300 dark:border-slate-700
                             bg-white dark:bg-slate-800 backdrop-blur-xl p-6 shadow-lg transition-all duration-500
                             hover:scale-[1.03] hover:shadow-purple-500/30 hover:border-purple-400/50"
                >
                  {/* صورة العضو */}
                  <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-2 border-purple-500/50 shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* المعلومات */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-purple-400 transition">
                    {member.name}
                  </h3>
                  <p className="text-purple-500 dark:text-purple-400 text-sm mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 text-sm">
                    {member.bio}
                  </p>

                  {/* تأثير الضوء */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 blur-2xl opacity-25"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
