"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectCard } from "./ProjectCard"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search, Filter } from "lucide-react"

const STATIC_PROJECTS = [
    {
        id: "cognisys-orbit",
        title: "Cognisys Orbit",
        description: "Plataforma empresarial de gestión de agentes de IA con arquitectura multi-tenant. Desarrollada con Rust y React, implementa seguridad avanzada, RBAC y comunicación en tiempo real mediante WebSockets.",
        tags: ["Rust", "React", "WebSockets", "Multi-tenant", "RBAC"],
        priority: 1,
        link: "#",
        metadata_json: { github: "#" }
    },
    {
        id: "port-scanner",
        title: "Escáner de Puertos",
        description: "Herramienta de análisis técnico para auditoría de redes. Permite identificar servicios activos y posibles vulnerabilidades de forma rápida y eficiente.",
        tags: ["Python", "Networking", "Security", "CLI"],
        priority: 0,
        link: "#",
        metadata_json: { github: "#" }
    },
    {
        id: "pyme-web",
        title: "Sitios Web para PYMES",
        description: "Desarrollo de soluciones web funcionales y optimizadas para pequeñas empresas. Enfoque en presencia digital clara, identidad visual y rendimiento.",
        tags: ["Next.js", "Tailwind CSS", "SEO", "Responsive"],
        priority: 0,
        link: "#",
        metadata_json: { github: "#" }
    }
]

export function ProjectGrid() {
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("priority")

    const projects = STATIC_PROJECTS.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    ).sort((a, b) => {
        if (sortBy === "priority") return b.priority - a.priority
        return 0
    })

    return (
        <section className="w-full space-y-12 pb-20">
            {/* Control Bar */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-card/50 p-6 rounded-[2.5rem] backdrop-blur-2xl border border-border shadow-2xl">
                <div className="relative w-full md:max-w-lg group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                    <Input
                        placeholder="Buscar sistemas, aplicaciones o tecnologías..."
                        className="pl-12 h-14 bg-muted/50 border-border rounded-2xl focus-visible:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    <Filter className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                    {[
                        { id: "priority", label: "Destacados" },
                        { id: "all", label: "Todos" }
                    ].map((btn) => (
                        <Button
                            key={btn.id}
                            variant="ghost"
                            onClick={() => setSortBy(btn.id)}
                            className={`rounded-2xl px-6 h-11 text-sm font-bold transition-all ${sortBy === btn.id
                                ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                                : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                                }`}
                        >
                            {btn.label}
                        </Button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="popLayout">
                {projects.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <ProjectCard project={project} index={index} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-40 bg-card/50 rounded-[3rem] border border-dashed border-border"
                    >
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="text-primary w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-bold mb-3 italic uppercase">Sin resultados</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">No se encontraron proyectos que coincidan con tu búsqueda.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-20 text-center">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent w-full mb-8" />
                <p className="text-muted-foreground text-sm italic font-light">
                    Explorando nuevas fronteras tecnológicas...
                </p>
            </div>
        </section>
    )
}
