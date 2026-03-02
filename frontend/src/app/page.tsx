"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Code2, Cpu, Globe, Sparkles } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function Home() {
    const [mounted, setMounted] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

    if (!mounted) return null

    return (
        <main ref={containerRef} className="relative flex min-h-screen flex-col items-center bg-background text-foreground overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[25%] -left-[10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#020617] to-transparent z-10" />
            </div>

            {/* Hero Section */}
            <motion.section
                style={{ opacity, scale }}
                className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center px-4 pt-20"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center space-y-10 max-w-5xl"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/5 border border-primary/10 backdrop-blur-xl mb-4">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold tracking-widest text-primary uppercase">Disponible para proyectos estratégicos</span>
                    </div>

                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
                        Santino <br />
                        <span className="text-gradient">Fonso</span>.
                    </h1>

                    <p className="mx-auto max-w-[850px] text-muted-foreground text-xl md:text-3xl font-light leading-tight tracking-tight">
                        Ingeniero de Software <span className="text-foreground font-bold underline decoration-primary decoration-4 underline-offset-8">Autodidacta</span>. <br />
                        Desarrollando sistemas digitales de alto impacto.
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex flex-wrap justify-center gap-6 pt-10"
                    >
                        <Link href="/projects">
                            <Button size="lg" className="h-16 rounded-2xl px-12 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xl shadow-lg transition-all hover:scale-105 active:scale-95 group">
                                VER PROYECTOS <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/experience">
                            <Button variant="outline" size="lg" className="h-16 rounded-2xl px-12 border-border/50 bg-card/50 hover:bg-card/80 backdrop-blur-2xl font-black text-xl transition-all hover:scale-105 active:scale-95">
                                EXPERIENCIA
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Floating Tech Stack Micro-Cards */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-4xl w-full">
                    {[
                        { icon: Globe, label: "Aplicaciones Web", desc: "Next.js & React" },
                        { icon: Cpu, label: "Core de IA", desc: "Orquestación de LLMs" },
                        { icon: Code2, label: "Microservicios", desc: "FastAPI & Go" },
                        { icon: Sparkles, label: "Diseño & UX", desc: "Interfaces Modernas" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + (i * 0.1) }}
                            className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-xl hover:border-primary/30 transition-colors"
                        >
                            <item.icon className="w-8 h-8 text-primary mb-3" />
                            <h3 className="font-bold text-slate-200">{item.label}</h3>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Feature Section with Parallax */}
            <section className="relative z-20 w-full py-24 md:py-48 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                                Ingeniería <br />
                                <span className="text-gradient">de Alto Nivel</span>.
                            </h2>
                            <p className="text-muted-foreground text-xl md:text-2xl font-light leading-relaxed">
                                "Soluciones técnicas pensadas para resolver problemas complejos a través de arquitecturas limpias y diseño centrado en el usuario."
                            </p>
                            <div className="space-y-6 pt-4">
                                {[
                                    { text: "Integridad Arquitectónica", icon: Code2 },
                                    { text: "Sistemas con Inteligencia Artificial", icon: Sparkles },
                                    { text: "Orquestación de Alta Velocidad", icon: Cpu },
                                    { text: "Despliegue y Escalabilidad Global", icon: Globe }
                                ].map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-4 group cursor-default"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                                            <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-foreground text-xl font-bold italic tracking-tight group-hover:translate-x-2 transition-transform duration-300">{feature.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square rounded-[4rem] overflow-hidden group shadow-[0_0_100px_rgba(99,102,241,0.1)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-purple-500/10 to-transparent z-10" />
                            <div className="absolute inset-0 border border-border/50 rounded-[4rem] z-20 group-hover:border-primary/50 transition-colors duration-700" />

                            <div className="w-full h-full bg-card flex items-center justify-center relative">
                                <motion.div
                                    animate={{
                                        rotate: [0, 90, 180, 270, 360],
                                        scale: [1, 1.1, 1, 1.1, 1],
                                        borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%", "30% 70% 70% 30% / 30% 30% 70% 70%"]
                                    }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="w-[85%] h-[85%] bg-gradient-to-br from-primary to-purple-600 blur-[100px] opacity-50"
                                />
                                <div className="absolute z-30 flex flex-col items-center">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    >
                                        <h3 className="text-[12rem] font-black text-white/10 select-none tracking-tighter">SF</h3>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            {/* Genesis / History Section */}
            <section className="relative z-20 w-full py-24 md:py-48 px-4 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-black italic uppercase italic tracking-tighter"
                        >
                            Mi <span className="text-gradient">Trayectoria</span>.
                        </motion.h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { year: "14", title: "El Comienzo", desc: "Primeras líneas de código. Transición de la curiosidad a la pasión por la lógica de bajo nivel y el diseño de sistemas." },
                            { year: "16", title: "Especialización", desc: "Dominio de ecosistemas full-stack. Desarrollo de herramientas autónomas y experimentación con arquitecturas de software." },
                            { year: "18", title: "Consolidación", desc: "Liderando una nueva mentalidad de ingeniería autodidacta. Esta plataforma es el reflejo de años de dedicación técnica." }
                        ].map((milestone, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="p-10 rounded-[3rem] bg-card border border-border group hover:border-primary/50 transition-all duration-500"
                            >
                                <span className="text-6xl font-black text-primary/10 group-hover:text-primary/20 transition-colors italic">0{milestone.year}</span>
                                <h3 className="text-2xl font-bold mt-4 italic uppercase">{milestone.title}</h3>
                                <p className="text-muted-foreground mt-4 leading-relaxed">{milestone.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-32 text-center"
                    >
                        <p className="text-3xl md:text-5xl font-bold italic text-foreground/80 max-w-4xl mx-auto">
                            "No solo desarrollo software. Construyo <span className="text-primary underline decoration-2 underline-offset-8">soluciones</span> robustas."
                        </p>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
