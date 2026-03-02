"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Instagram, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background text-foreground overflow-hidden pb-24">
            {/* Background Accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 container px-4 md:px-6 py-12 md:py-24">
                <div className="flex flex-col items-center text-center space-y-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-bold text-primary border border-primary/20 backdrop-blur-xl"
                    >
                        <Mail className="w-4 h-4" />
                        <span className="uppercase tracking-widest">Contacto Profesional</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic">
                        Hablemos de <span className="text-gradient">Proyectos</span>.
                    </h1>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl font-light italic">
                        "Disponible para colaboraciones estratégicas y roles de ingeniería full-stack de alto nivel."
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="p-8 md:p-12 rounded-[3rem] bg-card border border-border/50 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.2)]"
                    >
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black uppercase tracking-widest ml-1 italic">Nombre</label>
                                <Input
                                    placeholder="TU NOMBRE"
                                    className="h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all font-bold placeholder:opacity-30"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black uppercase tracking-widest ml-1 italic">Email</label>
                                <Input
                                    type="email"
                                    placeholder="TU CORREO ELECTRÓNICO"
                                    className="h-14 rounded-2xl bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all font-bold placeholder:opacity-30"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-black uppercase tracking-widest ml-1 italic">Mensaje</label>
                                <Textarea
                                    placeholder="DETALLES DEL PROYECTO O CONSULTA..."
                                    className="min-h-[150px] rounded-[2rem] bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all font-bold placeholder:opacity-30"
                                />
                            </div>
                            <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all hover:scale-[1.02] active:scale-95 group">
                                ENVIAR MENSAJE
                                <Send className="ml-2 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </form>
                    </motion.div>

                    {/* Contact Info & Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter">Canales Directos</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-all duration-500">
                                        <Mail className="w-6 h-6 text-primary group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-primary uppercase tracking-widest">Email</p>
                                        <p className="text-xl font-bold italic">fonsolinkedin@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-all duration-500">
                                        <Send className="w-6 h-6 text-primary group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-primary uppercase tracking-widest">Teléfono</p>
                                        <p className="text-xl font-bold italic">+54 3751 336381</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter">Redes Profesionales</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: Github, label: "GitHub", link: "https://github.com/santinofonso" },
                                    { icon: Linkedin, label: "LinkedIn", link: "https://linkedin.com/in/santinofonso" },
                                    { icon: Instagram, label: "Instagram", link: "https://instagram.com/fonsosantino" },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-6 rounded-3xl bg-card border border-border/50 flex flex-col items-center gap-3 hover:border-primary transition-all hover:scale-105 group"
                                    >
                                        <social.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                        <span className="text-xs font-black uppercase tracking-widest opacity-50 group-hover:opacity-100">{social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10">
                            <p className="text-lg font-bold italic text-foreground/80 leading-relaxed">
                                "Enfoque en la resolución de problemas empresariales mediante tecnología de vanguardia y arquitectura de software sólida."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
