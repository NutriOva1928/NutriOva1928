<script setup lang="ts">
import { ref, computed } from 'vue'

// Estado del modal
const isModalOpen = ref(false)
const selectedHabit = ref<string | null>(null)

// Interfaces
interface HabitPoint {
  title?: string
  content: string
}

interface HabitCategory {
  title: string
  items: string[]
}

interface HabitDetail {
  id: string
  title: string
  summary: string
  icon: string
  category: 'sleep' | 'nutrition' | 'habits' | 'stress' | 'protection'
  details: {
    intro: string
    sopFocus?: string
    points?: HabitPoint[]
    categories?: HabitCategory[]
  }
}

// 8 Hábitos de Bienestar para SOP - Enfoque en Acompañamiento y Manejo
const habits: HabitDetail[] = [
  {
    id: 'hidratacion',
    title: 'Hidratación Consciente',
    summary: 'Mejora la función renal y hepática para regular hormonas',
    icon: 'droplet',
    category: 'nutrition',
    details: {
      intro: 'Beber al menos 2 litros de agua al día (8 a 10 vasos). La hidratación adecuada mejora función metabólica y ayuda a eliminar toxinas.',
      sopFocus: 'En el SOP, una buena hidratación ayuda a los órganos encargados de metabolizar y eliminar el exceso de hormonas, como andrógenos.',
      points: [
        { title: 'Función Renal y Hepática', content: 'Mejora la capacidad del cuerpo para eliminar toxinas y exceso de hormonas.' },
        { title: 'Reduce la Inflamación', content: 'Combate la inflamación crónica asociada al SOP.' },
        { title: 'Control del Apetito', content: 'La sed a veces se confunde con hambre, beber agua regula mejor las señales.' },
        { title: 'Combate la Fatiga', content: 'La deshidratación leve puede contribuir al cansancio característico del SOP.' }
      ]
    }
  },
  {
    id: 'horarios',
    title: 'Horarios Regulares de Comida',
    summary: 'Estabiliza glucosa e insulina, clave para el SOP',
    icon: 'clock',
    category: 'nutrition',
    details: {
      intro: 'Comer a horarios similares cada día estabiliza glucosa e insulina, reduciendo antojos y mejorando energía.',
      sopFocus: 'Dado que la resistencia a la insulina es central en muchos casos de SOP, mantener horarios regulares es una estrategia fundamental.',
      points: [
        { title: 'Frecuencia', content: 'Evitar ayunos prolongados que disparen cortisol y desregulen la insulina. Idealmente 3 comidas principales y 1-2 snacks si es necesario.' },
        { title: 'Equilibrio', content: 'Cada comida debe incluir proteína, fibra y grasa saludable para evitar picos de azúcar.' },
        { title: 'Calorías Temprano', content: 'Priorizar comidas más abundantes en las primeras horas del día y cenas ligeras.' },
        { title: 'Consistencia', content: 'Mantener horarios similares incluso en fines de semana para reforzar el hábito.' }
      ]
    }
  },
  {
    id: 'sueno',
    title: 'Sueño Reparador (7-9h)',
    summary: 'Baja cortisol para mejorar ovulación e insulina',
    icon: 'moon',
    category: 'sleep',
    details: {
      intro: 'El sueño de calidad regula cortisol, leptina y grelina (hormonas del estrés y apetito), clave para equilibrio hormonal.',
      sopFocus: 'En el SOP, el sueño de calidad ayuda a bajar el cortisol, mejorando la ovulación y reduciendo la resistencia a la insulina.',
      points: [
        { title: 'Grelina y Leptina', content: 'Dormir mal aumenta la grelina (hormona del hambre) y disminuye leptina (saciedad), complicando el control de peso.' },
        { title: 'Cortisol', content: 'Un sueño deficiente eleva el cortisol, lo que empeora la resistencia a la insulina y puede interferir con la ovulación.' },
        { title: 'Insulina', content: 'Estudios muestran que la privación de sueño reduce la sensibilidad a la insulina significativamente.' },
        { title: 'Ciclo Vicioso', content: 'El SOP puede causar apnea del sueño, la cual a su vez empeora la resistencia a la insulina, creando un círculo negativo.' }
      ]
    }
  },
  {
    id: 'movimiento',
    title: 'Movimiento Diario',
    summary: 'Entrenamiento de fuerza mejora captación de glucosa',
    icon: 'activity',
    category: 'habits',
    details: {
      intro: 'Al menos 30 minutos de actividad física moderada mejora sensibilidad a insulina y libera endorfinas.',
      sopFocus: 'El entrenamiento de fuerza es especialmente importante en el SOP porque aumenta la masa muscular, mejorando la captación de glucosa y reduciendo la resistencia a la insulina.',
      points: [
        { title: 'Caminar', content: 'Actividad de bajo impacto que mejora la circulación y ayuda a regular el azúcar post-comida.' },
        { title: 'Cardio Moderado', content: 'Correr, nadar, bicicleta - quema de calorías y mejora de salud cardiovascular.' },
        { title: 'Entrenamiento de Fuerza', content: 'Pesas, bandas de resistencia o peso corporal. Fundamental para SOP porque el músculo es el principal consumidor de glucosa.' }
      ]
    }
  },
  {
    id: 'estres',
    title: 'Gestión del Estrés',
    summary: 'Reduce cortisol que afecta ovulación y andrógenos',
    icon: 'heart',
    category: 'stress',
    details: {
      intro: 'Practicar técnicas de relajación (respiración, meditación, yoga) reduce cortisol elevado que afecta otros ejes hormonales.',
      sopFocus: 'En el SOP, el estrés crónico eleva el cortisol, lo cual puede aumentar los andrógenos y empeorar los síntomas del síndrome.',
      points: [
        { title: 'Respiración Profunda', content: 'Al inhalar lento y profundo, el cuerpo envía señales al cerebro para calmarse, disminuyendo frecuencia cardíaca y presión.' },
        { title: 'Meditación y Mindfulness', content: 'Ayudan a despejar la sobrecarga mental y reducir emociones negativas. Efectivas para bajar cortisol con práctica regular.' },
        { title: 'Yoga', content: 'Combina ejercicio físico y mental, aliviando la ansiedad y promoviendo relajación profunda, ideal para mujeres con SOP.' }
      ]
    }
  },
  {
    id: 'alimentacion',
    title: 'Consciencia Alimentaria',
    summary: 'Bajo índice glucémico y fibra para regular insulina',
    icon: 'eye',
    category: 'nutrition',
    details: {
      intro: 'Comer sin distracciones, masticando bien y reconociendo señales de hambre y saciedad mejora digestión y relación con la comida.',
      sopFocus: 'Para el SOP es crucial priorizar alimentos de bajo índice glucémico para evitar picos de azúcar que empeoran la resistencia a la insulina.',
      points: [
        { title: 'Sin Distracciones', content: 'Comer sin pantallas permite reconocer mejor las señales de saciedad.' },
        { title: 'Carbohidratos Complejos', content: 'Elegir granos enteros, legumbres y vegetales en lugar de carbohidratos refinados.' },
        { title: 'Combinar con Fibra y Proteína', content: 'Cada comida debe incluir estos macros para reducir el impacto glucémico.' },
        { title: 'Masticar Bien', content: 'Facilita la digestión y permite que las hormonas de saciedad tengan tiempo de actuar.' }
      ]
    }
  },
  {
    id: 'disruptores',
    title: 'Reducir Disruptores Endocrinos',
    summary: 'Protege tu sistema hormonal ya sensibilizado',
    icon: 'shield',
    category: 'protection',
    details: {
      intro: 'Minimizar plásticos, cosméticos con parabenos y alimentos con pesticidas protege tu sistema hormonal.',
      sopFocus: 'Las mujeres con SOP ya tienen un sistema endocrino sensibilizado; exponerse a disruptores puede empeorar el desequilibrio hormonal existente.',
      categories: [
        {
          title: '🍎 Alimentación',
          items: [
            'Elige alimentos orgánicos para reducir la ingesta de pesticidas.',
            'Evita calentar comida en recipientes de plástico; usa vidrio o cerámica.',
            'Limita alimentos enlatados; prefiere opciones frescas o en vidrio.',
            'Evita verduras o frutas envueltas en plásticos.'
          ]
        },
        {
          title: '🧴 Cuidado Personal',
          items: [
            'Revisa etiquetas y evita productos con parabenos, ftalatos o fragancias artificiales.',
            'Opta por marcas naturales y ecológicas.',
            'Reduce el uso de perfumes sintéticos.'
          ]
        },
        {
          title: '🏠 Hogar',
          items: [
            'Usa productos de limpieza naturales como vinagre, bicarbonato y jabón neutro.',
            'Aspira y limpia con regularidad para eliminar polvo.',
            'Cambia utensilios antiadherentes por acero inoxidable, hierro fundido o cerámica.'
          ]
        },
        {
          title: '💧 Agua',
          items: [
            'Filtra el agua de consumo para eliminar metales pesados.',
            'Usa botellas de vidrio o acero inoxidable.'
          ]
        },
        {
          title: '👕 Ropa',
          items: [
            'Lava ropa nueva antes de usarla para eliminar residuos químicos.',
            'Prefiere telas naturales como algodón o lino.'
          ]
        },
        {
          title: '♻️ Residuos',
          items: [
            'Evita quemar basura, especialmente plásticos.',
            'Minimiza exposición a pinturas y disolventes.'
          ]
        }
      ]
    }
  },
  {
    id: 'revisiones',
    title: 'Revisiones Médicas Periódicas',
    summary: 'Monitorea ovulación, insulina y andrógenos',
    icon: 'clipboard',
    category: 'habits',
    details: {
      intro: 'Chequeos anuales con análisis hormonales permiten detectar desequilibrios tempranos y ajustar hábitos a tiempo.',
      sopFocus: 'El seguimiento médico regular es esencial para mujeres con SOP, permitiendo ajustar tratamientos y monitorear complicaciones.',
      points: [
        { title: 'Diagnóstico Temprano', content: 'Actuar antes de que la prediabetes se vuelva diabetes tipo 2.' },
        { title: 'Manejo del SOP', content: 'Ajustar anticonceptivos, metformina u otros tratamientos según evolución.' },
        { title: 'Fertilidad', content: 'Monitorear ovulación si se busca embarazo, con apoyo especializado.' },
        { title: 'Calidad de Vida', content: 'Control de síntomas como acné, hirsutismo y manejo del peso.' }
      ]
    }
  }
]

// Funciones del modal
const openModal = (habitId: string) => {
  selectedHabit.value = habitId
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  selectedHabit.value = null
  document.body.style.overflow = ''
}

// Obtener hábito seleccionado
const currentHabit = computed(() => {
  return habits.find(h => h.id === selectedHabit.value)
})

// Cerrar con Escape
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

// Clases de colores por categoría (Paleta Soft Pastel)
const getCategoryClasses = (category: string) => {
  const categories: Record<string, { bg: string; border: string; text: string; light: string; gradient: string }> = {
    sleep: {
      bg: 'bg-sleep-300',
      border: 'border-sleep-200 hover:border-sleep-400',
      text: 'text-sleep-600',
      light: 'bg-sleep-50',
      gradient: 'from-sleep-300 to-sleep-400'
    },
    nutrition: {
      bg: 'bg-nutrition-300',
      border: 'border-nutrition-200 hover:border-nutrition-400',
      text: 'text-nutrition-600',
      light: 'bg-nutrition-50',
      gradient: 'from-nutrition-300 to-nutrition-400'
    },
    habits: {
      bg: 'bg-habits-300',
      border: 'border-habits-200 hover:border-habits-400',
      text: 'text-habits-600',
      light: 'bg-habits-50',
      gradient: 'from-habits-300 to-habits-400'
    },
    stress: {
      bg: 'bg-stress-300',
      border: 'border-stress-200 hover:border-stress-400',
      text: 'text-stress-600',
      light: 'bg-stress-50',
      gradient: 'from-stress-300 to-stress-400'
    },
    protection: {
      bg: 'bg-protection-300',
      border: 'border-protection-200 hover:border-protection-400',
      text: 'text-protection-600',
      light: 'bg-protection-50',
      gradient: 'from-protection-300 to-protection-400'
    }
  }
  return categories[category] || categories.habits!
}

// Etiquetas de categoría
const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    sleep: 'Sueño',
    nutrition: 'Nutrición',
    habits: 'Hábitos',
    stress: 'Estrés',
    protection: 'Protección'
  }
  return labels[category] || ''
}
</script>

<template>
  <div class="space-y-8" @keydown="handleKeydown">
    <!-- Header -->
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-habits-200 via-protection-200 to-stress-200 rounded-3xl mb-6 shadow-soft">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-700 mb-3">
        Hábitos Clave para el Manejo del SOP
      </h3>
      <p class="text-gray-500 max-w-2xl mx-auto leading-relaxed">
        Estrategias enfocadas en mejorar la <span class="font-medium text-habits-500">sensibilidad a la insulina</span>, 
        reducir <span class="font-medium text-stress-500">el cortisol</span> y 
        controlar los <span class="font-medium text-protection-500">andrógenos</span>.
      </p>
    </div>

    <!-- Grid de 8 Tarjetas Flotantes -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div
        v-for="habit in habits"
        :key="habit.id"
        @click="openModal(habit.id)"
        :class="[
          'group relative cursor-pointer rounded-3xl border-4 p-6 bg-white shadow-soft transition-all duration-300',
          'hover:shadow-soft-lg hover:scale-[1.02]',
          getCategoryClasses(habit.category).border
        ]"
        role="button"
        tabindex="0"
        :aria-label="`Ver detalles de ${habit.title}`"
        @keydown.enter="openModal(habit.id)"
      >
        <!-- Badge de categoría -->
        <span :class="[
          'absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded-full',
          getCategoryClasses(habit.category).light,
          getCategoryClasses(habit.category).text
        ]">
          {{ getCategoryLabel(habit.category) }}
        </span>

        <!-- Icono con líneas finas -->
        <div :class="[
          'w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
          getCategoryClasses(habit.category).light
        ]">
          <svg v-if="habit.icon === 'droplet'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21c-4.97 0-9-4.03-9-9 0-3.866 5.145-9.29 7.757-11.68a1.7 1.7 0 012.486 0C15.855 2.71 21 8.134 21 12c0 4.97-4.03 9-9 9z" />
          </svg>
          <svg v-else-if="habit.icon === 'clock'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else-if="habit.icon === 'moon'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg v-else-if="habit.icon === 'activity'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <svg v-else-if="habit.icon === 'heart'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <svg v-else-if="habit.icon === 'eye'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else-if="habit.icon === 'shield'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <svg v-else-if="habit.icon === 'clipboard'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>

        <!-- Título -->
        <h4 class="font-semibold text-center text-gray-700 mb-2 leading-tight">
          {{ habit.title }}
        </h4>

        <!-- Resumen -->
        <p class="text-gray-400 text-sm text-center leading-relaxed mb-4 line-clamp-2">
          {{ habit.summary }}
        </p>

        <!-- Botón Ver más -->
        <button :class="[
          'w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
          getCategoryClasses(habit.category).light,
          getCategoryClasses(habit.category).text,
          'group-hover:shadow-sm'
        ]">
          Ver detalles
        </button>
      </div>
    </div>

    <!-- Modal con borde de color pastel -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="isModalOpen && currentHabit" 
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <!-- Overlay suave -->
          <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          
          <!-- Modal con borde de 4px del color de categoría -->
          <div 
            :class="[
              'relative bg-white rounded-3xl shadow-soft-lg max-w-2xl w-full max-h-[90vh] overflow-hidden border-4',
              getCategoryClasses(currentHabit.category).border.split(' ')[0]
            ]"
            role="dialog"
            aria-modal="true"
          >
            <!-- Header blanco con badge -->
            <div class="px-8 py-8 border-b border-gray-100">
              <!-- Botón cerrar -->
              <button 
                @click="closeModal"
                class="absolute top-6 right-6 w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200"
                aria-label="Cerrar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div class="flex items-center gap-5">
                <!-- Icono -->
                <div :class="[
                  'w-16 h-16 rounded-2xl flex items-center justify-center',
                  getCategoryClasses(currentHabit.category).light
                ]">
                  <svg v-if="currentHabit.icon === 'droplet'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21c-4.97 0-9-4.03-9-9 0-3.866 5.145-9.29 7.757-11.68a1.7 1.7 0 012.486 0C15.855 2.71 21 8.134 21 12c0 4.97-4.03 9-9 9z" />
                  </svg>
                  <svg v-else-if="currentHabit.icon === 'clock'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else-if="currentHabit.icon === 'moon'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <svg v-else-if="currentHabit.icon === 'activity'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <svg v-else-if="currentHabit.icon === 'heart'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <svg v-else-if="currentHabit.icon === 'eye'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else-if="currentHabit.icon === 'shield'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <svg v-else-if="currentHabit.icon === 'clipboard'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div class="flex-1">
                  <span :class="[
                    'text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block',
                    getCategoryClasses(currentHabit.category).light,
                    getCategoryClasses(currentHabit.category).text
                  ]">
                    {{ getCategoryLabel(currentHabit.category) }}
                  </span>
                  <h3 class="text-xl font-semibold text-gray-700">{{ currentHabit.title }}</h3>
                </div>
              </div>
            </div>

            <!-- Contenido scrolleable -->
            <div class="px-8 py-6 overflow-y-auto max-h-[55vh]">
              <!-- Introducción -->
              <div class="mb-6 p-4 bg-gray-50 rounded-2xl">
                <p class="text-gray-600 leading-relaxed">
                  {{ currentHabit.details.intro }}
                </p>
              </div>

              <!-- Enfoque SOP - Destacado -->
              <div v-if="currentHabit.details.sopFocus" :class="[
                'mb-6 p-4 rounded-2xl border-l-4',
                getCategoryClasses(currentHabit.category).light,
                getCategoryClasses(currentHabit.category).border.split(' ')[0]
              ]">
                <div class="flex items-start gap-3">
                  <span class="text-lg">💜</span>
                  <div>
                    <span class="font-medium text-gray-700 block mb-1">Enfoque SOP</span>
                    <p class="text-gray-600 text-sm leading-relaxed">{{ currentHabit.details.sopFocus }}</p>
                  </div>
                </div>
              </div>

              <!-- Puntos (si existen) -->
              <div v-if="currentHabit.details.points && currentHabit.details.points.length > 0" class="space-y-3">
                <div 
                  v-for="(point, index) in currentHabit.details.points" 
                  :key="index"
                  class="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <span :class="[
                    'flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-medium',
                    getCategoryClasses(currentHabit.category).bg
                  ]">
                    {{ index + 1 }}
                  </span>
                  <div class="flex-1">
                    <h5 v-if="point.title" class="font-medium text-gray-700 mb-1">
                      {{ point.title }}
                    </h5>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ point.content }}</p>
                  </div>
                </div>
              </div>

              <!-- Categorías (para Disruptores) -->
              <div v-if="currentHabit.details.categories" class="space-y-4">
                <div 
                  v-for="(category, catIndex) in currentHabit.details.categories" 
                  :key="catIndex"
                  class="p-4 rounded-2xl bg-gray-50"
                >
                  <h5 class="font-medium text-gray-700 mb-3">{{ category.title }}</h5>
                  <ul class="space-y-2">
                    <li 
                      v-for="(item, itemIndex) in category.items" 
                      :key="itemIndex"
                      class="flex items-start gap-2 text-sm text-gray-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" :class="['h-4 w-4 flex-shrink-0 mt-0.5', getCategoryClasses(currentHabit.category).text]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span class="leading-relaxed">{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-8 py-5 border-t border-gray-100 bg-gray-50/50">
              <button 
                @click="closeModal"
                class="w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:border-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* Animaciones del Modal */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}

/* Scrollbar suave */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Limitar líneas */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
