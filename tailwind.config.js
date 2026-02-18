/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'sans-serif'],
      },
      colors: {
        // Paleta Soft Pastel
        pastel: {
          // Rosa bebé - Protección delicada (Disruptores)
          pink: {
            50: '#fef7f9',
            100: '#fdeef3',
            200: '#fbd5e3',
            300: '#f8b4ce',
            400: '#f38db3',
            500: '#e8679a',
            600: '#d44677',
            700: '#b3345f',
            800: '#952e50',
            900: '#7c2a45',
          },
          // Celeste bebé - Serenidad (Gestión de estrés)
          sky: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
          // Lila bajo - Calma y rutina (Hábitos)
          lilac: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7e22ce',
            800: '#6b21a8',
            900: '#581c87',
          },
          // Verde clarito - Salud natural (Nutrición)
          mint: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          // Azul claro - Descanso profundo (Sueño)
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
        },
        // Mantener colores existentes para compatibilidad
        lavender: {
          50: '#faf7fc',
          100: '#f3edf8',
          200: '#e9dcf2',
          300: '#d9bfe8',
          400: '#c299da',
          500: '#a86cc8',
          600: '#8f4ead',
          700: '#773d8f',
          800: '#633775',
          900: '#522e5f',
        },
        sage: {
          50: '#f6f8f6',
          100: '#e3ebe3',
          200: '#c7d8c8',
          300: '#a2bda4',
          400: '#7a9d7d',
          500: '#5b8260',
          600: '#46674c',
          700: '#39533e',
          800: '#2f4333',
          900: '#28382b',
        },
        // Alias para categorías
        nutrition: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
        },
        habits: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
        },
        sleep: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
        },
        stress: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        },
        protection: {
          50: '#fef7f9',
          100: '#fdeef3',
          200: '#fbd5e3',
          300: '#f8b4ce',
          400: '#f38db3',
          500: '#e8679a',
        },
        // Marca Nutriova
        nutriova: {
          earth: {
            50: '#fdfbf7',
            100: '#f7f1e6',
            200: '#efe2cd',
            300: '#e3cba8',
            400: '#d5af7e',
            500: '#c8955b', // Base
            600: '#bb7d4a',
            700: '#9c633e',
            800: '#805138',
            900: '#684330',
          },
          green: {
            50: '#f4f9f4',
            100: '#e4f1e5',
            200: '#cce2ce',
            300: '#a7caa9',
            400: '#7fae82',
            500: '#5c9160', // Natural Green Base
            600: '#46724a',
            700: '#3a5b3d',
            800: '#314833',
            900: '#293c2b',
          },
          terracotta: {
            50: '#fef5f2',
            100: '#fee8e1',
            200: '#fcd3c7',
            300: '#fab6a1',
            400: '#f68e6e',
            500: '#eb6642', // Terracotta Base
            600: '#d94a28',
            700: '#b53a1d',
            800: '#94331e',
            900: '#7a2e1d',
          },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
