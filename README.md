# NutriHealth SOP - Guía Educativa de Salud Hormonal

![Version](https://img.shields.io/badge/version-1.0.0-lavender)
![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)

## 📋 Descripción

**NutriHealth SOP** es una Single Page Application (SPA) educativa desarrollada como parte de una tesis de grado en Nutrición y Salud. La plataforma ofrece información científicamente fundamentada sobre el **Síndrome de Ovario Poliquístico (SOP)** y salud hormonal femenina, con un enfoque especial en nutrición y hábitos de vida.

### 🎯 Objetivo

Democratizar el conocimiento sobre el SOP y empoderar a las mujeres con información de calidad para que puedan tomar decisiones informadas sobre su salud, siempre en conjunto con profesionales calificados.

## ✨ Características Principales

### 🎨 Diseño
- **Estética Minimalista y Empoderadora**: Interfaz limpia con paleta de colores lavanda y verde suave
- **Responsive**: Totalmente adaptable a dispositivos móviles, tablets y desktop
- **Animaciones Suaves**: Transiciones fluidas que mejoran la experiencia de usuario
- **Glassmorphism**: Efectos modernos de cristal esmerilado para un look premium

### 📚 Módulos Educativos

#### 1. **Landing/Selector de Perfil**
- Elección entre dos perfiles:
  - ✅ Tengo diagnóstico de SOP
  - ✅ No tengo diagnóstico de SOP (Salud Hormonal General)
- Contenido dinámicamente filtrado según el perfil seleccionado

#### 2. **Módulo 1: Información (¿Qué es el SOP?)**
- **Perfil SOP**: Explicación detallada del síndrome, causas, síntomas y características
- **Perfil No-SOP**: Educación sobre salud hormonal femenina y prevención
- Cards informativas con iconografía clara

#### 3. **Módulo 2: Nutrición Inteligente**
- Selector de categorías: "Alimentos a Priorizar" vs "Consumo Ocasional"
- Contenido diferenciado por perfil:
  - **SOP**: Énfasis en bajo índice glucémico, antiinflamatorios
  - **No-SOP**: Nutrición preventiva y equilibrada
- Tarjetas interactivas con beneficios/razones científicas

#### 4. **Módulo 3: Hábitos de Bienestar**
- ✅ **Checklist Interactivo** con 8 hábitos clave
- Barra de progreso dinámica
- Mensaje motivacional al completar todos los hábitos
- Hábitos incluidos:
  - Hidratación consciente
  - Horarios regulares de comida
  - Sueño reparador (7-9h)
  - Movimiento diario
  - Gestión del estrés
  - Consciencia alimentaria
  - Reducción de disruptores endocrinos
  - Revisiones médicas periódicas

#### 5. **Módulo 4: Aviso Legal**
- Disclaimer prominente destacando que es una herramienta **educativa**, no diagnóstica
- Listado claro de qué ofrece y qué NO ofrece la plataforma
- Contexto académico y llamado a consultar profesionales de salud

### 🧩 Componentes Vue 3

Los componentes están organizados modularmente:

```
src/
├── components/
│   ├── LandingSelector.vue    # Pantalla de selección de perfil
│   ├── ModuleInfo.vue          # Módulo 1 - Información SOP/Salud Hormonal
│   ├── ModuleNutrition.vue     # Módulo 2 - Nutrición diferenciada
│   ├── ModuleHabits.vue        # Módulo 3 - Checklist de hábitos
│   └── ModuleDisclaimer.vue    # Módulo 4 - Aviso legal
├── App.vue                      # Componente raíz con lógica de navegación
├── main.ts                      # Punto de entrada
└── style.css                    # Estilos globales con Tailwind
```

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Vue 3** | 3.5.24 | Framework principal (Composition API) |
| **TypeScript** | 5.9.3 | Tipado estático y mejor DX |
| **Tailwind CSS** | 4.1.18 | Estilos utility-first y design system |
| **Vite** | 5.4.11 | Build tool y dev server ultra-rápido |
| **PostCSS** | 8.5.6 | Procesamiento de CSS |
| **Autoprefixer** | 10.4.23 | Compatibilidad cross-browser |

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 20.1.0+ (incluido con Windows)
- npm 9.6.4+

### Instalación

```bash
# Clonar el repositorio (si aplica)
git clone <url-del-repo>

# Navegar al directorio
cd NutriHealth

# Instalar dependencias
npm install
```

### Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev
# ➜ Local: http://localhost:5173/

# Compilar para producción
npm run build

# Vista previa de build de producción
npm run preview
```

## 🎨 Paleta de Colores

La aplicación utiliza una paleta personalizada inspirada en bienestar y empoderamiento:

### Lavanda (Primary)
```css
lavender-50:  #faf7fc
lavender-500: #a86cc8
lavender-600: #8f4ead
```

### Sage (Secondary - Verde suave)
```css
sage-50:  #f6f8f6
sage-500: #5b8260
sage-600: #46674c
```

### Fuentes
- **Principal**: Inter (Sans Serif moderna)
- **Alternativa**: Montserrat

## 📱 Responsividad

La aplicación está optimizada para:
- 📱 Mobile: 320px - 640px
- 📲 Tablet: 641px - 1024px
- 💻 Desktop: 1025px+

Uso extensivo de clases `md:` y `lg:` de Tailwind para adaptación.

## 🔐 SEO y Accesibilidad

- ✅ Meta tags descriptivos
- ✅ Títulos semánticos (h1, h2, h3, h4)
- ✅ Estructura HTML5 semántica
- ✅ IDs únicos para elementos interactivos
- ✅ Navegación por teclado (checkboxes, botones)
- ✅ Descripciones alt en SVG icons (stroke para accesibilidad)

## ⚠️ Disclaimer Legal

Esta plataforma es una **herramienta educativa** desarrollada para fines académicos. **NO sustituye el diagnóstico médico profesional** ni la orientación nutricional individualizada. Siempre consulta con profesionales de salud calificados.

## 🔧 Solución de Problemas Comunes

### Error de PostCSS/Tailwind
Si encuentras errores relacionados con `module is not defined` o plugins de PostCSS:
1. Asegúrate de usar **Tailwind CSS 3.x** (`npm install -D tailwindcss@3 autoprefixer postcss`).
2. Verifica que `tailwind.config.js` y `postcss.config.js` usen `export default` en lugar de `module.exports`.

## 📚 Fundamentación Científica

El contenido de la aplicación se basa en:
- Guías clínicas de la International PCOS Society
- Investigaciones sobre resistencia a la insulina y SOP
- Evidencia nutricional de bajo índice glucémico
- Estudios sobre inflamación sistémica y hormonas
- Literatura sobre microbiota y salud hormonal

## 🎓 Contexto Académico

**Proyecto de Tesis de Grado**  
Área: Nutrición y Salud  
Enfoque: Educación nutricional para salud hormonal femenina  
Año: 2026

## 👨‍💻 Desarrollo

Desarrollado con ❤️ siguiendo principios de:
- **UX Empático**: Lenguaje inclusivo y empoderador
- **Ciencia Rigurosa**: Información basada en evidencia
- **Diseño Premium**: Estética profesional y moderna
- **Código Limpio**: Componentes reutilizables y tipados

## 📄 Licencia

Este proyecto es de uso educativo y académico. Todos los derechos reservados para fines de tesis.

---

**🌸 Con información y acompañamiento profesional, tu camino hacia el bienestar hormonal es posible.**
