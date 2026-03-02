"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building2, Briefcase, Sparkles, ChevronRight } from "lucide-react"

const experiences = [
    {
        company: "Proyectos Independientes / Autónomo",
        position: "Ingeniero Full Stack",
        period: "2020 - Presente",
        description: "Inicié mi trayectoria como desarrollador autodidacta centrado en la arquitectura de sistemas. He diseñado y desarrollado este portafolio íntegramente, demostrando la capacidad de construir aplicaciones complejas con Next.js y FastAPI. Mi enfoque se centra en crear soluciones de alto rendimiento que integren ingeniería de software con inteligencia artificial.",
        skills: ["Next.js", "FastAPI", "Python", "Arquitectura de Sistemas", "OpenAI API"]
    },
    {
        company: "Iniciativa Fonso-Dev",
        position: "Fundador & Desarrollador",
        period: "2022 - 2024",
        description: "Desarrollo y mantenimiento de aplicaciones full-stack, especializándome en código limpio y arquitecturas optimizadas. Este sitio representa años de dedicación técnica y aprendizaje autónomo aplicado a soluciones reales.",
        skills: ["TypeScript", "Tailwind CSS", "PostgreSQL", "React", "Docker"]
    },
    {
        company: "Trayectoria de Aprendizaje",
        position: "Fundamentos",
        period: "2020 - 2022",
        description: "Comencé a profundizar en la programación a temprana edad, dominando los fundamentos de la lógica y la ingeniería de software mediante el estudio riguroso y la construcción de herramientas técnicas.",
        skills: ["Algoritmos", "Estructuras de Datos", "Bases de la Web", "Python"]
    }
]

export default function ExperiencePage() {
    return (
        <main className="min-h-screen bg-background text-foreground overflow-hidden pb-24">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 md:pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 mb-24"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-primary border border-white/10 backdrop-blur-md">
                        <Briefcase className="w-4 h-4" />
                        <span>Historial Profesional</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase italic">
                        Santino <span className="text-gradient">Fonso</span>.
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl mx-auto italic">
                        "Desarrollador autodidacta con un historial de construcción de sistemas autónomos y soluciones full-stack de alta disponibilidad."
                    </p>
                </motion.div>

                <div className="relative space-y-20 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                        >
                            {/* Dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background text-primary shadow-xl z-10 absolute left-0 md:left-1/2 md:-ml-5 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300">
                                <Sparkles className="w-5 h-5" />
                            </div>

                            {/* Card Content */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-[2rem] bg-card/50 border border-border backdrop-blur-xl hover:border-primary/20 hover:bg-card/80 transition-all duration-500 shadow-2xl">
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary font-bold tracking-widest text-[10px] uppercase">
                                                {exp.period}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-foreground italic uppercase tracking-tight">
                                            {exp.position}
                                        </h3>
                                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                            <Building2 className="w-4 h-4" />
                                            <span className="font-medium">{exp.company}</span>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {exp.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {exp.skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="secondary"
                                                className="bg-white/5 text-slate-300 border-white/5 text-[10px] tracking-tight"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    )
}
