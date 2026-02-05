<script setup lang="ts">
import { ref, computed } from 'vue'

// Props para el perfil
const props = defineProps<{
  profile: 'pcos' | 'no-pcos'
}>()

// Estado del modal
const isModalOpen = ref(false)
const selectedHabit = ref<string | null>(null)

// Interfaces
interface HabitDetail {
  title: string
  description: string
  icon: string
  color: 'mint' | 'sky' | 'teal' | 'slate'
  modalContent: {
    pcos: ModalContent
    noPcos: ModalContent
  }
}

interface ModalContent {
  intro: string
  benefits: string[]
  tips?: string[]
  categories?: {
    title: string
    items: string[]
  }[]
}

// Datos de los 4 hábitos principales
const habits: HabitDetail[] = [
  {
    title: 'Hidratación Consciente',
    description: '2 litros de agua al día',
    icon: 'droplet',
    color: 'mint',
    modalContent: {
      pcos: {
        intro: 'La hidratación adecuada es fundamental para mujeres con SOP, ya que impacta directamente en la función metabólica y hormonal.',
        benefits: [
          'Mejora la función metabólica y ayuda a regular los niveles de insulina',
          'Favorece la eliminación de toxinas y productos de desecho hormonal',
          'Combate la inflamación sistémica asociada al SOP',
          'Reduce la retención de líquidos, síntoma común en el síndrome',
          'Optimiza el transporte de nutrientes esenciales para el equilibrio hormonal'
        ],
        tips: [
          'Comienza el día con un vaso de agua tibia con limón',
          'Usa una botella reutilizable marcada con horarios',
          'Incluye infusiones de hierbas antiinflamatorias (jengibre, cúrcuma)'
        ]
      },
      noPcos: {
        intro: 'Mantener una hidratación óptima es esencial para la salud general y la prevención de desequilibrios metabólicos.',
        benefits: [
          'Mantiene el metabolismo activo y eficiente',
          'Apoya la función renal en la eliminación de toxinas',
          'Mejora la elasticidad de la piel y apariencia general',
          'Previene la fatiga y mejora la concentración',
          'Facilita la digestión y absorción de nutrientes'
        ],
        tips: [
          'Establece recordatorios cada 2 horas para beber agua',
          'Consume frutas y vegetales con alto contenido de agua',
          'Reduce el consumo de bebidas procesadas y azucaradas'
        ]
      }
    }
  },
  {
    title: 'Movimiento Diario',
    description: '30 minutos de actividad moderada',
    icon: 'activity',
    color: 'sky',
    modalContent: {
      pcos: {
        intro: 'El ejercicio regular es una herramienta terapéutica clave para el manejo del SOP, mejorando la sensibilidad a la insulina y reduciendo síntomas.',
        benefits: [
          'Aumenta significativamente la sensibilidad a la insulina',
          'Libera endorfinas que mejoran el estado de ánimo y reducen estrés',
          'Ayuda en la regulación del peso corporal y distribución de grasa',
          'Reduce los niveles de andrógenos circulantes',
          'Mejora la ovulación y regularidad del ciclo menstrual'
        ],
        tips: [
          'Ejercicios aeróbicos: caminar rápido, trote suave, natación, baile (3-5 veces/semana)',
          'Entrenamiento de fuerza: pesas o bandas elásticas (2-3 veces/semana)',
          'Yoga o pilates para flexibilidad y manejo del estrés',
          'HIIT moderado puede ser especialmente efectivo para la resistencia a insulina'
        ]
      },
      noPcos: {
        intro: 'La actividad física regular es fundamental para prevenir enfermedades crónicas y mantener un bienestar integral.',
        benefits: [
          'Fortalece el sistema cardiovascular',
          'Mejora la calidad del sueño y niveles de energía',
          'Reduce el riesgo de diabetes tipo 2 y obesidad',
          'Fortalece huesos y músculos',
          'Mejora el estado de ánimo y reduce ansiedad'
        ],
        tips: [
          'Encuentra una actividad que disfrutes (baile, deportes, caminatas)',
          'Combina cardio con ejercicios de fuerza',
          'Incluye estiramientos post-ejercicio',
          'Busca un compañero de ejercicio para mayor motivación'
        ]
      }
    }
  },
  {
    title: 'Conciencia Alimentaria',
    description: 'Comer sin distracciones, escuchando al cuerpo',
    icon: 'mindful',
    color: 'teal',
    modalContent: {
      pcos: {
        intro: 'El Mindful Eating ayuda a regular la ingesta de alimentos y mejora la respuesta glucémica, especialmente importante para quienes tienen resistencia a la insulina.',
        benefits: [
          'Mejora la respuesta glucémica al comer más despacio',
          'Reduce los atracones y la alimentación emocional',
          'Aumenta la conciencia de las señales de hambre y saciedad',
          'Disminuye el estrés relacionado con la comida',
          'Favorece una digestión óptima'
        ],
        tips: [
          'Come sin televisión ni celular - enfócate en tu comida',
          'Mastica despacio: 20-30 veces cada bocado',
          'Diferencia el hambre física (gradual) del hambre emocional (repentina)',
          'Usa todos tus 5 sentidos: observa colores, huele aromas, siente texturas',
          'Sirve porciones moderadas en platos más pequeños',
          'Haz pausas durante la comida para evaluar tu saciedad'
        ]
      },
      noPcos: {
        intro: 'La alimentación consciente promueve una relación saludable con la comida y previene hábitos alimentarios desordenados.',
        benefits: [
          'Previene el sobrepeso al regular naturalmente las porciones',
          'Reduce el estrés y la ansiedad asociados con la comida',
          'Mejora la digestión y absorción de nutrientes',
          'Aumenta el disfrute y satisfacción con las comidas',
          'Desarrolla hábitos alimentarios sostenibles'
        ],
        tips: [
          'Come sin pantallas ni distracciones',
          'Mastica lentamente para mejor digestión',
          'Pregúntate: ¿Tengo hambre física o emocional?',
          'Aprecia los colores, olores y sabores de tu comida',
          'Come sentado/a en un lugar tranquilo'
        ]
      }
    }
  },
  {
    title: 'Protección Hormonal',
    description: 'Minimizar plásticos y disruptores endocrinos',
    icon: 'shield',
    color: 'slate',
    modalContent: {
      pcos: {
        intro: 'Los disruptores endocrinos pueden empeorar los síntomas del SOP al interferir con el sistema hormonal. Reducir la exposición es crucial.',
        benefits: [
          'Reduce la carga tóxica sobre el sistema hormonal ya afectado',
          'Evita la exacerbación de síntomas como irregularidad menstrual',
          'Protege la fertilidad a largo plazo',
          'Disminuye la inflamación sistémica',
          'Apoya la función tiroidea, frecuentemente comprometida en SOP'
        ],
        categories: [
          {
            title: '🍳 Cocina',
            items: [
              'No calentar alimentos en recipientes de plástico (libera BPA/ftalatos)',
              'Preferir recipientes de vidrio, acero inoxidable o cerámica',
              'Evitar enlatados (revestimiento con BPA) - elegir opciones en vidrio',
              'Usar utensilios de madera, silicona o acero inoxidable',
              'Filtrar el agua del grifo para eliminar residuos hormonales'
            ]
          },
          {
            title: '🧴 Higiene Personal',
            items: [
              'Elegir productos etiquetados "sin parabenos" y "sin ftalatos"',
              'Evitar pasta de dientes con triclosán (usar alternativas naturales)',
              'Revisar ingredientes de cosméticos: evitar fragancia/perfume sintético',
              'Usar desodorantes sin aluminio',
              'Preferir productos de cuidado menstrual orgánicos'
            ]
          },
          {
            title: '🏠 Hogar',
            items: [
              'Ventilar diariamente los espacios (mínimo 10-15 minutos)',
              'Limpiar el polvo frecuentemente (contiene retardantes de llama)',
              'Evitar ambientadores sintéticos - usar alternativas naturales',
              'Elegir muebles y textiles libres de tratamientos químicos',
              'Usar productos de limpieza ecológicos o caseros'
            ]
          }
        ]
      },
      noPcos: {
        intro: 'Reducir la exposición a disruptores endocrinos es una medida preventiva importante para mantener la salud hormonal a largo plazo.',
        benefits: [
          'Previene alteraciones en el equilibrio hormonal natural',
          'Protege la salud reproductiva',
          'Reduce el riesgo de enfermedades relacionadas con hormonas',
          'Mejora la calidad del ambiente doméstico',
          'Contribuye a la salud general y bienestar'
        ],
        categories: [
          {
            title: '🍳 Cocina',
            items: [
              'Evitar calentar plásticos - usar vidrio o cerámica',
              'Preferir alimentos frescos sobre enlatados',
              'Usar botellas de agua reutilizables de acero o vidrio'
            ]
          },
          {
            title: '🧴 Higiene Personal',
            items: [
              'Optar por cosméticos naturales u orgánicos',
              'Leer etiquetas: evitar parabenos, ftalatos y fragancias sintéticas',
              'Considerar marcas eco-friendly certificadas'
            ]
          },
          {
            title: '🏠 Hogar',
            items: [
              'Ventilar los espacios diariamente',
              'Reducir el uso de productos de limpieza agresivos',
              'Preferir plantas purificadoras de aire'
            ]
          }
        ]
      }
    }
  }
]

// Funciones del modal
const openModal = (habitTitle: string) => {
  selectedHabit.value = habitTitle
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
  return habits.find(h => h.title === selectedHabit.value)
})

// Contenido del modal según perfil
const currentModalContent = computed(() => {
  if (!currentHabit.value) return null
  return props.profile === 'pcos' 
    ? currentHabit.value.modalContent.pcos 
    : currentHabit.value.modalContent.noPcos
})

// Cerrar con Escape
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

// Colores por tipo
const getColorClasses = (color: string, type: 'bg' | 'border' | 'text' | 'gradient' | 'light') => {
  const colors: Record<string, Record<string, string>> = {
    mint: {
      bg: 'bg-emerald-500',
      border: 'border-emerald-200 hover:border-emerald-400',
      text: 'text-emerald-700',
      gradient: 'from-emerald-400 to-teal-500',
      light: 'bg-emerald-50'
    },
    sky: {
      bg: 'bg-sky-500',
      border: 'border-sky-200 hover:border-sky-400',
      text: 'text-sky-700',
      gradient: 'from-sky-400 to-blue-500',
      light: 'bg-sky-50'
    },
    teal: {
      bg: 'bg-teal-500',
      border: 'border-teal-200 hover:border-teal-400',
      text: 'text-teal-700',
      gradient: 'from-teal-400 to-cyan-500',
      light: 'bg-teal-50'
    },
    slate: {
      bg: 'bg-slate-500',
      border: 'border-slate-200 hover:border-slate-400',
      text: 'text-slate-700',
      gradient: 'from-slate-400 to-gray-600',
      light: 'bg-slate-50'
    }
  }
  return colors[color]?.[type] || ''
}
</script>

<template>
  <div class="space-y-8" @keydown="handleKeydown">
    <!-- Header -->
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl mb-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-2">
        Hábitos de Bienestar
      </h3>
      <p class="text-gray-600 max-w-2xl mx-auto">
        {{ profile === 'pcos' 
          ? 'Hábitos diseñados para apoyar tu equilibrio hormonal y mejorar los síntomas del SOP.' 
          : 'Hábitos fundamentales para mantener tu bienestar y prevenir desequilibrios.' 
        }}
      </p>
      <!-- Badge de perfil -->
      <div class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
        :class="profile === 'pcos' 
          ? 'bg-lavender-100 text-lavender-700' 
          : 'bg-sage-100 text-sage-700'">
        <span class="w-2 h-2 rounded-full" :class="profile === 'pcos' ? 'bg-lavender-500' : 'bg-sage-500'"></span>
        {{ profile === 'pcos' ? 'Enfoque Metabólico y Hormonal' : 'Enfoque Preventivo y General' }}
      </div>
    </div>

    <!-- Grid de 4 tarjetas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="habit in habits"
        :key="habit.title"
        @click="openModal(habit.title)"
        :class="[
          'group relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300',
          'bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl hover:scale-105',
          getColorClasses(habit.color, 'border')
        ]"
        role="button"
        tabindex="0"
        :aria-label="`Ver detalles de ${habit.title}`"
        @keydown.enter="openModal(habit.title)"
      >
        <!-- Icono -->
        <div :class="[
          'w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300',
          'bg-gradient-to-br shadow-md group-hover:shadow-lg group-hover:scale-110',
          getColorClasses(habit.color, 'gradient')
        ]">
          <!-- Iconos SVG -->
          <svg v-if="habit.icon === 'droplet'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21c-4.97 0-9-4.03-9-9 0-3.866 5.145-9.29 7.757-11.68a1.7 1.7 0 012.486 0C15.855 2.71 21 8.134 21 12c0 4.97-4.03 9-9 9z" />
          </svg>
          <svg v-else-if="habit.icon === 'activity'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <svg v-else-if="habit.icon === 'mindful'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else-if="habit.icon === 'shield'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <!-- Título y descripción -->
        <h4 :class="['font-bold text-center mb-2', getColorClasses(habit.color, 'text')]">
          {{ habit.title }}
        </h4>
        <p class="text-gray-500 text-sm text-center leading-relaxed mb-4">
          {{ habit.description }}
        </p>

        <!-- Botón ver más -->
        <button :class="[
          'w-full px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
          'bg-gradient-to-r text-white shadow-sm group-hover:shadow-md',
          getColorClasses(habit.color, 'gradient')
        ]">
          <span class="flex items-center justify-center gap-2">
            Ver detalles
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>

    <!-- Nota informativa -->
    <div class="card bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
      <div class="flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <p class="text-sm text-gray-700 leading-relaxed">
          <span class="font-semibold">Recuerda:</span> No necesitas implementar todos los hábitos a la vez. 
          Elige 1-2 para comenzar y ve incorporando más gradualmente. El cambio sostenible es progresivo y cada pequeño paso cuenta.
        </p>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="isModalOpen && currentHabit && currentModalContent" 
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          
          <!-- Contenido del Modal -->
          <div 
            class="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300"
            role="dialog"
            aria-modal="true"
          >
            <!-- Header con gradiente -->
            <div :class="[
              'relative px-6 py-8 bg-gradient-to-r text-white',
              getColorClasses(currentHabit.color, 'gradient')
            ]">
              <!-- Patrón decorativo -->
              <div class="absolute inset-0 opacity-10">
                <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="habit-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="white"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#habit-dots)"/>
                </svg>
              </div>
              
              <!-- Botón cerrar -->
              <button 
                @click="closeModal"
                class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Cerrar modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- Icono y título -->
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <svg v-if="currentHabit.icon === 'droplet'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21c-4.97 0-9-4.03-9-9 0-3.866 5.145-9.29 7.757-11.68a1.7 1.7 0 012.486 0C15.855 2.71 21 8.134 21 12c0 4.97-4.03 9-9 9z" />
                  </svg>
                  <svg v-else-if="currentHabit.icon === 'activity'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <svg v-else-if="currentHabit.icon === 'mindful'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else-if="currentHabit.icon === 'shield'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-bold">{{ currentHabit.title }}</h3>
                  <p class="text-white/80 text-sm mt-1">{{ currentHabit.description }}</p>
                </div>
              </div>
            </div>

            <!-- Contenido scrolleable -->
            <div class="px-6 py-6 overflow-y-auto max-h-[55vh]">
              <!-- Introducción -->
              <p class="text-gray-700 leading-relaxed mb-6 p-4 bg-gray-50 rounded-xl">
                {{ currentModalContent.intro }}
              </p>

              <!-- Beneficios -->
              <div class="mb-6">
                <h4 :class="['font-bold mb-4 flex items-center gap-2', getColorClasses(currentHabit.color, 'text')]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Beneficios {{ profile === 'pcos' ? 'para el SOP' : 'para tu Salud' }}
                </h4>
                <ul class="space-y-3">
                  <li 
                    v-for="(benefit, index) in currentModalContent.benefits" 
                    :key="index"
                    class="flex items-start gap-3"
                  >
                    <span :class="[
                      'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium bg-gradient-to-br',
                      getColorClasses(currentHabit.color, 'gradient')
                    ]">
                      {{ index + 1 }}
                    </span>
                    <span class="text-gray-600 text-sm leading-relaxed">{{ benefit }}</span>
                  </li>
                </ul>
              </div>

              <!-- Tips (si existen) -->
              <div v-if="currentModalContent.tips" class="mb-6">
                <h4 :class="['font-bold mb-4 flex items-center gap-2', getColorClasses(currentHabit.color, 'text')]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Consejos Prácticos
                </h4>
                <ul class="space-y-2">
                  <li 
                    v-for="(tip, index) in currentModalContent.tips" 
                    :key="index"
                    class="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <span class="text-lg">💡</span>
                    <span class="text-gray-600 text-sm leading-relaxed">{{ tip }}</span>
                  </li>
                </ul>
              </div>

              <!-- Categorías (para Disruptores Endocrinos) -->
              <div v-if="currentModalContent.categories" class="space-y-4">
                <div 
                  v-for="(category, catIndex) in currentModalContent.categories" 
                  :key="catIndex"
                  :class="['p-4 rounded-xl', getColorClasses(currentHabit.color, 'light')]"
                >
                  <h5 class="font-semibold mb-3 text-gray-800">{{ category.title }}</h5>
                  <ul class="space-y-2">
                    <li 
                      v-for="(item, itemIndex) in category.items" 
                      :key="itemIndex"
                      class="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" :class="['h-4 w-4 flex-shrink-0 mt-0.5', getColorClasses(currentHabit.color, 'text')]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button 
                @click="closeModal"
                class="w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
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
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

/* Scrollbar personalizado */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
