"use client"

import { ProjectGrid } from "@/components/ProjectGrid"
import { motion } from "framer-motion"
import { LayoutGrid, Sparkles } from "lucide-react"

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground overflow-hidden pb-24">
            {/* Background Accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 container px-4 md:px-6 py-12 md:py-24">
                <div className="flex flex-col items-center text-center space-y-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-primary border border-white/10 backdrop-blur-md"
                    >
                        <LayoutGrid className="w-4 h-4" />
                        <span>Portafolio Técnico</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase italic">
                        Mis <span className="text-gradient">Proyectos</span> Destacados.
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-[850px] text-muted-foreground md:text-xl font-light leading-relaxed italic"
                    >
                        "Una selección de sistemas y herramientas desarrolladas con un enfoque en la arquitectura limpia, la escalabilidad y el impacto tecnológico real."
                    </motion.p>
                </div>

                <ProjectGrid />
            </div>
        </main>
    )
}
