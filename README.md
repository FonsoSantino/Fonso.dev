# Fonso.dev – Aplicación Full‑Stack

Este repositorio contiene la implementación de una plataforma web construida con un **backend en Python/FastAPI** y un **frontend en Next.js/TypeScript**.  
El objetivo del proyecto es servir como portafolio técnico y demostrar conocimientos en:

- Diseño y migraciones de bases de datos (PostgreSQL + SQLAlchemy/Alembic).
- API REST con autenticación JWT y gestión de usuarios.
- Integración con servicios de IA (OpenAI) a través de un asistente conversacional.
- Frontend moderno con Next.js, TailwindCSS y hooks personalizados.
- Despliegue en la nube (Railway, Vercel, etc.) con configuración de variables de entorno.

---

## 🧩 Estructura principal

- **`backend/`** – Código del servidor FastAPI.
- **`frontend/`** – Aplicación Next.js para la interfaz de usuario.
- **`Fonso.dev/`** – Contiene configuraciones específicas del frontend (tipos, utilidades, etc.).
- **`DEPLOY.md`** – Guía de despliegue (ver más abajo).

> 💡 Se trata de un repositorio vivo; la idea es mantenerlo como referencia para reclutadores o equipos técnicos interesados en mi trabajo.

---

## 🚀 Proyectos destacados

### Cognisys Orbit

Cognisys Orbit es una plataforma de inteligencia empresarial distribuida construida con una arquitectura de microservicios de alto rendimiento. En términos simples: es un sistema de monitoreo y coordinación de agentes de IA en tiempo real.

**Componentes principales**  
| Componente | Descripción | Tecnologías |
|------------|-------------|-------------|
| Orbit Gateway | API Gateway de alta seguridad con rate-limiting, auth JWT, auditoría y CORS | Rust |
| Agent Swarm | Enjambre de agentes de IA con arquitectura de Blackboard para toma de decisiones distribuida | Rust |
| Command Center | Dashboard táctico en tiempo real para monitorear todos los agentes y el sistema | React + TypeScript + Vite |

**Aspectos que atraen a un reclutador**
- 🦀 Backend en Rust — lenguaje de sistemas de alto rendimiento, muy valorado en la industria.
- 🤖 Arquitectura de Agent Swarm — implementa patrones avanzados de IA distribuida (Blackboard Pattern).
- 🔐 Seguridad de nivel producción — JWT, rate limiting, audit logging ([OBSIDIAN_RESILIENCE]).
- 🎨 UI táctica premium — interfaz HUD estilo "mission control" con glassmorphism y animaciones.
- 🏗️ Arquitectura de microservicios real — múltiples servicios comunicándose, no un monolito básico.

> “Diseñé y desarrollé Cognisys Orbit, una plataforma empresarial de coordinación de agentes de IA. El backend está escrito en Rust con un gateway de seguridad propio (auth JWT, rate limiting, audit trail), y el frontend es un dashboard en tiempo real construido con React y TypeScript. El sistema implementa el Blackboard Pattern para comunicación entre agentes autónomos.”

Este proyecto demuestra dominio de sistemas distribuidos, seguridad, Rust, React y arquitectura de software — todo junto. Eso es raro para alguien de 18 años y va a destacar.

---

## 📄 Licencia / Contacto

Incluye aquí cualquier información de contacto o la licencia que desees (MIT, GPL, etc.).
