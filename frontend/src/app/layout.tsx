import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from "@/components/theme-toggle"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
    title: "Santino Fonso - Desarrollador Full Stack",
    description: "Portfolio profesional de Santino Fonso, Ingeniero Full Stack especializado en Next.js, Python y soluciones de IA empresarial.",
    openGraph: {
        type: "website",
        locale: "es_AR",
        url: "https://fonso.dev",
        title: "Santino Fonso - Desarrollador Full Stack",
        description: "Desarrollo de sistemas digitales de alto impacto con tecnologías modernas.",
        siteName: "Fonso Dev",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={cn(outfit.variable, inter.variable, "min-h-screen bg-background font-outfit antialiased selection:bg-primary/20")}>
                <Providers>
                    <div className="relative flex min-h-screen flex-col">

                        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                            <div className="container flex h-14 items-center justify-between">
                                <div className="mr-4 flex">
                                    <Link href="/" className="mr-10 flex items-center space-x-2 group">
                                        <span className="font-black text-2xl tracking-tighter uppercase italic text-gradient group-hover:scale-105 transition-transform duration-300">
                                            Fonso <span className="text-foreground">Dev</span>
                                        </span>
                                    </Link>
                                    <nav className="flex items-center space-x-10 text-sm font-black uppercase tracking-[0.2em] italic">
                                        <Link href="/projects" className="transition-all hover:text-primary text-foreground/60 hover:-translate-y-0.5">Proyectos</Link>
                                        <Link href="/experience" className="transition-all hover:text-primary text-foreground/60 hover:-translate-y-0.5">Experiencia</Link>
                                        <Link href="/contact" className="transition-all hover:text-primary text-foreground/60 hover:-translate-y-0.5">Contacto</Link>
                                    </nav>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <ThemeToggle />
                                </div>
                            </div>
                        </header>
                        <main className="flex-1">{children}</main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
