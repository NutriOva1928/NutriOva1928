<script setup lang="ts">
import { ref, computed } from 'vue'

// Estado del modal
const isModalOpen = ref(false)
const selectedCategory = ref<string | null>(null)

// Definición de categorías nutricionales para SOP
interface NutrientItem {
  name: string
  description: string
}

interface NutritionCategory {
  id: string
  title: string
  subtitle: string
  icon: string
  color: 'sage' | 'lavender' | 'mint' | 'rose' | 'amber' | 'sky'
  items: NutrientItem[]
}

const nutritionCategories: NutritionCategory[] = [
  {
    id: 'proteinas',
    title: 'Proteínas Magras',
    subtitle: 'Ayudan a estabilizar glucosa y aumentan saciedad',
    icon: 'protein',
    color: 'sage',
    items: [
      { 
        name: 'Animales', 
        description: 'Pechuga de pollo, pavo, pescado (salmón, atún, bacalao), claras de huevo, productos lácteos bajos en grasa.' 
      },
      { 
        name: 'Vegetales', 
        description: 'Tofu, lentejas, frijoles' 
      }
    ]
  },
  {
    id: 'vegetales',
    title: 'Vegetales de Hoja Verde',
    subtitle: 'Ricos en magnesio y antioxidantes antiinflamatorios',
    icon: 'leaf',
    color: 'mint',
    items: [
      { name: 'Espinacas', description: 'Altas en magnesio, ácido fólico y hierro.' },
      { name: 'Acelgas', description: 'Ricas en magnesio y potasio.' },
      { name: 'Kale (Col rizada)', description: 'Destaca por su alto poder antiinflamatorio y antioxidante.' },
      { name: 'Rúcula', description: 'Aporta magnesio y compuestos como glucosinolatos.' },
      { name: 'Berza/Col', description: 'Excelente para desinflamar y rica en antioxidantes.' },
      { name: 'Hierbas Aromáticas (Perejil, Albahaca)', description: 'Ricas en apigenina, un potente antioxidante y antiinflamatorio.' }
    ]
  },
  {
    id: 'grasas',
    title: 'Grasas Saludables',
    subtitle: 'Omega-3 de pescado, aguacate, nueces reducen inflamación',
    icon: 'droplet',
    color: 'amber',
    items: [
      { name: 'Pescado Azul (Omega-3)', description: 'Salmón, caballa, sardinas, atún.' },
      { name: 'Frutos Secos y Semillas', description: 'Nueces, chía, lino.' },
      { name: 'Frutas y Aceites', description: 'Aguacate, aceite de oliva virgen extra.' }
    ]
  },
  {
    id: 'granos',
    title: 'Granos Integrales',
    subtitle: 'Bajo índice glucémico, mejoran sensibilidad a insulina',
    icon: 'grain',
    color: 'rose',
    items: [
      { name: 'Avena', description: 'Rica en fibra soluble, ralentiza la digestión.' },
      { name: 'Quinoa', description: 'Proporciona energía sostenida y proteínas.' },
      { name: 'Cebada', description: 'Efectiva para la regulación de la glucosa en sangre.' },
      { name: 'Trigo sarraceno (alforfón) y Centeno', description: 'Opciones densas en nutrientes.' },
      { name: 'Arroz integral', description: 'Alternativa superior al arroz blanco.' }
    ]
  },
  {
    id: 'frutas',
    title: 'Frutas de Bajo IG',
    subtitle: 'Berries, manzana verde, pera - antioxidantes sin picos de azúcar',
    icon: 'fruit',
    color: 'lavender',
    items: [
      { name: 'Berries (Frutos del bosque)', description: 'Fresas, arándanos, frambuesas y moras son excelentes por su bajo contenido en azúcar y alto en antioxidantes.' },
      { name: 'Manzana verde', description: 'Rica en fibra soluble (pectina), lo que ralentiza la absorción de azúcar.' },
      { name: 'Pera', description: 'Aporta gran cantidad de fibra soluble, ideal para la saciedad y la estabilidad glucémica.' },
      { name: 'Cerezas', description: 'Tienen uno de los IG más bajos además de compuestos antiinflamatorios.' },
      { name: 'Aguacate (Palta)', description: 'Prácticamente sin azúcar, rico en grasas saludables y fibra.' },
      { name: 'Cítricos', description: 'Limón, lima y toronja (pomelo) son ricos en vitamina C y tienen bajo IG.' },
      { name: 'Otras', description: 'Kiwi (bajo IG), melocotón/durazno y guayaba.' }
    ]
  },
  {
    id: 'legumbres',
    title: 'Legumbres',
    subtitle: 'Fibra y proteína vegetal para control de peso y glucosa',
    icon: 'legume',
    color: 'sky',
    items: [
      { name: 'Lentejas', description: 'Excelente fuente de proteína vegetal y fibra.' },
      { name: 'Garbanzos', description: 'Ricos en proteínas, fibra y bajo índice glucémico.' },
      { name: 'Frijoles negros', description: 'Alto contenido de antioxidantes y fibra.' },
      { name: 'Judías/Alubias', description: 'Ideales para control de glucosa y saciedad.' }
    ]
  }
]

// Obtener categoría seleccionada
const currentCategory = computed(() => {
  return nutritionCategories.find(cat => cat.id === selectedCategory.value)
})

// Funciones para modal
const openModal = (categoryId: string) => {
  selectedCategory.value = categoryId
  isModalOpen.value = true
  // Prevenir scroll del body
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  selectedCategory.value = null
  // Restaurar scroll
  document.body.style.overflow = ''
}

// Cerrar modal con Escape
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

// Colores por categoría
const getColorClasses = (color: string, type: 'bg' | 'border' | 'text' | 'gradient') => {
  const colors: Record<string, Record<string, string>> = {
    sage: {
      bg: 'bg-sage-50',
      border: 'border-sage-200 hover:border-sage-400',
      text: 'text-sage-700',
      gradient: 'from-sage-400 to-sage-600'
    },
    mint: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200 hover:border-emerald-400',
      text: 'text-emerald-700',
      gradient: 'from-emerald-400 to-emerald-600'
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-200 hover:border-amber-400',
      text: 'text-amber-700',
      gradient: 'from-amber-400 to-amber-600'
    },
    rose: {
      bg: 'bg-rose-50',
      border: 'border-rose-200 hover:border-rose-400',
      text: 'text-rose-700',
      gradient: 'from-rose-400 to-rose-600'
    },
    lavender: {
      bg: 'bg-lavender-50',
      border: 'border-lavender-200 hover:border-lavender-400',
      text: 'text-lavender-700',
      gradient: 'from-lavender-400 to-lavender-600'
    },
    sky: {
      bg: 'bg-sky-50',
      border: 'border-sky-200 hover:border-sky-400',
      text: 'text-sky-700',
      gradient: 'from-sky-400 to-sky-600'
    }
  }
  return colors[color]?.[type] || ''
}
</script>

<template>
  <div class="space-y-8" @keydown="handleKeydown">
    <!-- Header con descripción -->
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-lavender-400 to-sage-400 rounded-2xl mb-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-2xl font-bold title-gradient mb-2">Guía Nutricional para SOP</h3>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Descubre los alimentos que pueden ayudarte a manejar los síntomas del Síndrome de Ovario Poliquístico. 
        Haz clic en cada categoría para ver la lista detallada.
      </p>
    </div>

    <!-- Grid de tarjetas nutricionales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="category in nutritionCategories"
        :key="category.id"
        @click="openModal(category.id)"
        :class="[
          'group relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300',
          'bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl hover:scale-[1.03]',
          getColorClasses(category.color, 'border')
        ]"
        role="button"
        tabindex="0"
        :aria-label="`Ver detalles de ${category.title}`"
        @keydown.enter="openModal(category.id)"
      >
        <!-- Icono decorativo de fondo -->
        <div :class="[
          'absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
          'bg-gradient-to-br opacity-90 group-hover:opacity-100 group-hover:scale-110',
          getColorClasses(category.color, 'gradient')
        ]">
          <!-- Iconos SVG minimalistas -->
          <svg v-if="category.icon === 'protein'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
          </svg>
          <svg v-else-if="category.icon === 'leaf'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <svg v-else-if="category.icon === 'droplet'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21c-4.97 0-9-4.03-9-9 0-3.866 5.145-9.29 7.757-11.68a1.7 1.7 0 012.486 0C15.855 2.71 21 8.134 21 12c0 4.97-4.03 9-9 9z" />
          </svg>
          <svg v-else-if="category.icon === 'grain'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <svg v-else-if="category.icon === 'fruit'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <svg v-else-if="category.icon === 'legume'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        </div>

        <!-- Contenido de la tarjeta -->
        <div class="pr-14">
          <h4 :class="['font-bold text-lg mb-2', getColorClasses(category.color, 'text')]">
            {{ category.title }}
          </h4>
          <p class="text-gray-600 text-sm leading-relaxed mb-4">
            {{ category.subtitle }}
          </p>
        </div>

        <!-- Botón Ver detalles -->
        <button 
          :class="[
            'mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
            'bg-gradient-to-r text-white shadow-sm hover:shadow-md group-hover:scale-105',
            getColorClasses(category.color, 'gradient')
          ]"
        >
          <span>Ver detalles</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Indicador de items -->
        <div class="absolute bottom-4 right-4">
          <span :class="[
            'inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium',
            getColorClasses(category.color, 'bg'),
            getColorClasses(category.color, 'text')
          ]">
            {{ category.items.length }} items
          </span>
        </div>
      </div>
    </div>

    <!-- Nota educativa -->
    <div class="card bg-gradient-to-r from-lavender-50 to-sage-50 border-lavender-200 mt-8">
      <div class="flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-lavender-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm text-gray-700 leading-relaxed">
          <span class="font-semibold">Recuerda:</span> Esta es una guía educativa. Cada persona es única y las necesidades nutricionales varían. Consulta siempre con un profesional de la salud o nutricionista antes de realizar cambios significativos en tu alimentación.
        </p>
      </div>
    </div>

    <!-- Modal Flotante -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="isModalOpen && currentCategory" 
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          
          <!-- Contenido del Modal -->
          <div 
            class="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden transform transition-all duration-300"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="`modal-title-${currentCategory.id}`"
          >
            <!-- Header del Modal con gradiente -->
            <div :class="[
              'relative px-6 py-8 bg-gradient-to-r text-white',
              getColorClasses(currentCategory.color, 'gradient')
            ]">
              <!-- Patrón decorativo -->
              <div class="absolute inset-0 opacity-10">
                <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="white"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#dots)"/>
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
                <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <svg v-if="currentCategory.icon === 'protein'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                  </svg>
                  <svg v-else-if="currentCategory.icon === 'leaf'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <svg v-else-if="currentCategory.icon === 'droplet'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21c-4.97 0-9-4.03-9-9 0-3.866 5.145-9.29 7.757-11.68a1.7 1.7 0 012.486 0C15.855 2.71 21 8.134 21 12c0 4.97-4.03 9-9 9z" />
                  </svg>
                  <svg v-else-if="currentCategory.icon === 'grain'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <svg v-else-if="currentCategory.icon === 'fruit'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <svg v-else-if="currentCategory.icon === 'legume'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
                  </svg>
                </div>
                <div>
                  <h3 :id="`modal-title-${currentCategory.id}`" class="text-2xl font-bold">
                    {{ currentCategory.title }}
                  </h3>
                  <p class="text-white/80 text-sm mt-1">
                    {{ currentCategory.subtitle }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Lista de alimentos -->
            <div class="px-6 py-6 overflow-y-auto max-h-[50vh]">
              <ul class="space-y-4">
                <li 
                  v-for="(item, index) in currentCategory.items" 
                  :key="index"
                  class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <!-- Bullet point decorativo -->
                  <div :class="[
                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm bg-gradient-to-br',
                    getColorClasses(currentCategory.color, 'gradient')
                  ]">
                    {{ index + 1 }}
                  </div>
                  
                  <!-- Contenido -->
                  <div class="flex-1">
                    <h4 :class="['font-semibold mb-1', getColorClasses(currentCategory.color, 'text')]">
                      {{ item.name }}
                    </h4>
                    <p class="text-gray-600 text-sm leading-relaxed">
                      {{ item.description }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Footer del modal -->
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button 
                @click="closeModal"
                class="w-full btn-secondary"
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

/* Smooth scrollbar para el contenido del modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
