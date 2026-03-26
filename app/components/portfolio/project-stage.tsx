"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { PortfolioLocale } from "./content";

type ProjectStageProps = {
  projects: PortfolioLocale["projects"];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function ProjectStage({ projects }: ProjectStageProps) {
  return (
    <section id="projects" className="portfolio-section space-y-7">
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="portfolio-section-title">{projects.title}</h2>
        <p className="portfolio-section-subtitle">{projects.subtitle}</p>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {projects.items.map((project) => (
          <motion.a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="project-stage-card group"
            variants={itemVariants}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            data-cursor="interactive"
          >
            <div className="project-stage-preview bg-slate-900">
              <motion.div className="project-stage-preview-overlay" />
              <motion.div
                className="project-stage-scanline"
                animate={{ y: ["-105%", "105%"] }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="project-stage-preview-image-wrap"
                whileHover={{ scale: 1.08, rotate: -1.2 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  width={640}
                  height={420}
                  unoptimized
                  className="h-full w-full object-cover object-top"
                />
              </motion.div>

              <div className="project-stage-status-row">
                <span>{project.year}</span>
                <span>{project.status}</span>
              </div>
              <span className="project-stage-hover-pill">{projects.hoverLabel}</span>
            </div>

            <div className="space-y-4 p-5">
              <h3 className="project-stage-title">{project.title}</h3>
              <p className="project-stage-description">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={`${project.title}-${tag}`} className="project-stage-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="project-stage-open-link">{projects.openLabel}</span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
