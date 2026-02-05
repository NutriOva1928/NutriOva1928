<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  profile: 'pcos' | 'no-pcos'
}>()

// Estado de la vista: Priorizar vs Limitar
const viewMode = ref<'prioritize' | 'limit'>('prioritize')

// Estado del modal
const isModalOpen = ref(false)
const selectedCategory = ref<NutritionCategory | null>(null)

interface NutrientItem {
  name: string
  description: string
}

interface NutritionCategory {
  id: string
  title: string
  subtitle: string
  reason: string
  icon: string
  color: 'mint' | 'pink' | 'sky' | 'lilac' | 'blue'
  items: NutrientItem[]
}

// 1. Datos para PRIORIZAR (Sin SOP)
const prioritizeCategories: NutritionCategory[] = [
  {
    id: 'variedad',
    title: 'Variedad de Vegetales',
    subtitle: 'El arcoíris en tu plato',
    reason: 'Consumir vegetales de todos los colores asegura obtener vitaminas y fitoquímicos esenciales para la salud celular y el equilibrio hormonal.',
    icon: 'broccoli',
    color: 'mint',
    items: [
      { name: 'Hoja Verde', description: 'Espinacas, acelgas - Ricos en antioxidantes y folato.' },
      { name: 'Crucíferas', description: 'Brócoli, coliflor - Apoyan la desintoxicación natural del cuerpo.' }
    ]
  },
  {
    id: 'proteinas',
    title: 'Proteínas de Calidad',
    subtitle: 'Reparación y base hormonal',
    reason: 'Las proteínas son los "ladrillos" del cuerpo, esenciales para reparar tejidos y producir hormonas clave.',
    icon: 'fish',
    color: 'mint',
    items: [
      { name: 'Animales Magras', description: 'Pescados, huevos, aves - Alta biodisponibilidad.' },
      { name: 'Vegetales', description: 'Legumbres,豆腐, semillas - Aportan fibra y proteína límpia.' }
    ]
  },
  {
    id: 'fermentados',
    title: 'Alimentos Fermentados',
    subtitle: 'Salud intestinal (Microbiota)',
    reason: 'Fortalecen la microbiota, mejoran la digestión y refuerzan el sistema inmune a través del eje intestino-cerebro.',
    icon: 'jar',
    color: 'mint',
    items: [
      { name: 'Probióticos', description: 'Kéfir, yogur natural sin azúcar, kombucha.' },
      { name: 'Vegetales Fermentados', description: 'Kimchi, chucrut natural.' }
    ]
  },
  {
    id: 'frutas',
    title: 'Frutas Frescas',
    subtitle: 'Antioxidantes y energía',
    reason: 'Protegen contra el daño oxidativo y proporcionan energía de liberación controlada.',
    icon: 'orange',
    color: 'mint',
    items: [
      { name: 'Cítricos', description: 'Naranja, kiwi, limón - Vitamina C pura.' },
      { name: 'Bayas', description: 'Arándanos, fresas - Poder antioxidante máximo.' }
    ]
  },
  {
    id: 'grasas',
    title: 'Grasas Esenciales',
    subtitle: 'Cerebro y hormonas',
    reason: 'Fundamentales para absorber vitaminas liposolubles y mantener la salud de las membranas celulares.',
    icon: 'nut',
    color: 'mint',
    items: [
      { name: 'Fuentes', description: 'Nueces, semillas, aguacate, aceite de oliva virgen extra.' }
    ]
  }
]

// 2. Datos para LIMITAR (Sin SOP)
const limitCategories: NutritionCategory[] = [
  {
    id: 'sodio',
    title: 'Exceso de Sodio',
    subtitle: 'Presión y retención',
    reason: 'El exceso de sal aumenta la retención de líquidos y puede elevar la presión arterial, afectando la salud cardiovascular a largo plazo.',
    icon: 'salt',
    color: 'pink',
    items: [
      { name: 'Limitar', description: 'Enlatados con mucho sodio, sopas instantáneas, cubitos de caldo, embutidos.' },
      { name: 'Sugerencia', description: 'Condimentar con hierbas naturales, limón y especias.' }
    ]
  },
  {
    id: 'trans',
    title: 'Grasas Trans',
    subtitle: 'Inflamación silente',
    reason: 'Son grasas artificiales que aumentan el colesterol LDL ("malo") y promueven la inflamación en las arterias.',
    icon: 'fries',
    color: 'pink',
    items: [
      { name: 'Evitar', description: 'Margarinas, frituras comerciales, snacks de bolsa, pastelería industrial.' }
    ]
  },
  {
    id: 'azucares',
    title: 'Azúcares Añadidos',
    subtitle: 'Energía vacía',
    reason: 'Los azúcares industriales no aportan nutrientes y generan picos de energía seguidos de cansancio y fatiga metabólica.',
    icon: 'sugar',
    color: 'pink',
    items: [
      { name: 'Reducir', description: 'Refrescos, jugos industriales, cereales azucarados, yogures de sabores.' }
    ]
  }
]

const currentList = computed(() => viewMode.value === 'prioritize' ? prioritizeCategories : limitCategories)

const openModal = (category: NutritionCategory) => {
  selectedCategory.value = category
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  selectedCategory.value = null
  document.body.style.overflow = ''
}
</script>

<template>
  <div class="space-y-10">
    <!-- Vista Toggle (Tabs) -->
    <div class="flex justify-center">
      <div class="inline-flex p-1.5 bg-gray-100 rounded-[2rem] shadow-inner">
        <button 
          @click="viewMode = 'prioritize'"
          :class="[
            'px-8 py-3 rounded-[1.8rem] text-sm font-bold transition-all duration-300 flex items-center gap-2',
            viewMode === 'prioritize' 
              ? 'bg-pastel-mint-400 text-white shadow-md scale-105' 
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          RECOMENDADOS
        </button>
        <button 
          @click="viewMode = 'limit'"
          :class="[
            'px-8 py-3 rounded-[1.8rem] text-sm font-bold transition-all duration-300 flex items-center gap-2',
            viewMode === 'limit' 
              ? 'bg-pastel-pink-400 text-white shadow-md scale-105' 
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          A LIMITAR
        </button>
      </div>
    </div>

    <!-- Intro Text -->
    <div class="text-center max-w-2xl mx-auto">
      <h3 class="text-3xl font-bold text-gray-700 mb-4 transition-all duration-300">
        {{ viewMode === 'prioritize' ? 'Nutrición para el Bienestar' : 'Guía de Moderación' }}
      </h3>
      <p class="text-gray-500 leading-relaxed italic">
        {{ viewMode === 'prioritize' 
          ? 'Descubre los alimentos que potencian tu vitalidad y mantienen tu sistema hormonal en perfecto equilibrio.' 
          : 'Mantener estos alimentos bajo consumo ocasional es una de las mejores formas de prevenir desequilibrios futuros.'
        }}
      </p>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
      <div 
        v-for="cat in currentList" 
        :key="cat.id"
        @click="openModal(cat)"
        class="group card rounded-3xl p-8 border-2 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-soft-lg hover:scale-105"
        :class="[
          cat.color === 'mint' ? 'bg-pastel-mint-100/60 border-pastel-mint-200' : 'bg-pastel-pink-100/60 border-pastel-pink-200'
        ]"
      >
        <div class="flex flex-col h-full">
          <div class="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 transition-transform group-hover:rotate-6">
            <!-- Iconos Semánticos SVG para Prevención -->
             <svg v-if="cat.icon === 'broccoli'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M7 11.2V7a5 5 0 0 1 10 0v4.2M12 21a6 6 0 0 0 6-6c0-1.2-.5-2.2-1.2-3M6.2 12A6 6 0 0 0 12 21M9 13.5a2.5 2.5 0 0 1 5 0" />
             </svg>
             <svg v-else-if="cat.icon === 'fish'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M2 12s3-4 8-4c2.5 0 4.5 1 6 2l4-2v8l-4-2c-1.5 1-3.5 2-6 2-5 0-8-4-8-4z" />
             </svg>
             <svg v-else-if="cat.icon === 'jar'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
               <rect x="6" y="8" width="12" height="12" rx="2" /><path d="M9 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3M8 12h8" />
             </svg>
             <svg v-else-if="cat.icon === 'orange'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
               <circle cx="12" cy="12" r="9" /><path d="M12 12l3-3M12 12l3 3M12 12l-3 3M12 12l-3-3" />
             </svg>
             <svg v-else-if="cat.icon === 'nut'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M12 21c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8z" /><path d="M9 12h6" />
             </svg>
             <!-- Iconos para LIMITAR (Prevención) -->
             <svg v-else-if="cat.icon === 'salt'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M8 21h8V7l-4-3-4 3v14z" /><path d="M9 13h6M9 17h6" />
             </svg>
             <svg v-else-if="cat.icon === 'fries'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M5 21h14M8 17l1-12m6 12l-1-12M12 17V5M10 5l4 0" />
             </svg>
             <svg v-else-if="cat.icon === 'sugar'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
               <rect x="7" y="7" width="10" height="10" rx="1" /><path d="M7 7l10 10M17 7L7 10" />
             </svg>
          </div>

          <h4 class="text-xl font-black text-gray-700 mb-2 leading-tight">{{ cat.title }}</h4>
          <p class="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
            {{ cat.subtitle }}
          </p>

          <div class="flex items-center gap-3 pt-4 border-t border-black/5">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold', viewMode === 'prioritize' ? 'bg-pastel-mint-400' : 'bg-pastel-pink-400']">
              <svg v-if="viewMode === 'prioritize'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01" />
              </svg>
            </div>
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Ver guía completa</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Detallado -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isModalOpen && selectedCategory" class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/30 backdrop-blur-md" @click.self="closeModal">
          <div 
            class="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border-8 overflow-hidden animate-pop-up"
            :class="selectedCategory.color === 'mint' ? 'border-pastel-mint-100' : 'border-pastel-pink-100'"
          >
            <div class="p-10 relative">
              <div class="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
                <div class="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-700 shadow-sm border border-gray-100 text-3xl">
                   <!-- Icono modal -->
                   <svg v-if="selectedCategory.icon === 'broccoli'" viewBox="0 0 24 24" class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M7 11.2V7a5 5 0 0 1 10 0v4.2M12 21a6 6 0 0 0 6-6c0-1.2-.5-2.2-1.2-3M6.2 12A6 6 0 0 0 12 21M9 13.5a2.5 2.5 0 0 1 5 0" />
                   </svg>
                   <span v-else>🥗</span>
                </div>
                <div>
                  <h3 class="text-3xl font-black text-gray-700 leading-tight">{{ selectedCategory.title }}</h3>
                  <div :class="['h-2 w-16 rounded-full mt-2', selectedCategory.color === 'mint' ? 'bg-pastel-mint-300' : 'bg-pastel-pink-300']"></div>
                </div>
              </div>

              <div class="bg-gray-50 rounded-3xl p-8 mb-8">
                <h5 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Enfoque Preventivo</h5>
                <p class="text-gray-700 text-lg leading-relaxed">
                  {{ selectedCategory.reason }}
                </p>
              </div>

              <div class="space-y-4">
                <h5 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Ejemplos y Guía:</h5>
                <div v-for="item in selectedCategory.items" :key="item.name" class="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <div :class="['w-3 h-3 rounded-full mt-1.5 flex-shrink-0', selectedCategory.color === 'mint' ? 'bg-pastel-mint-400' : 'bg-pastel-pink-400']"></div>
                  <div>
                    <span class="font-bold text-gray-700">{{ item.name }}</span>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ item.description }}</p>
                  </div>
                </div>
              </div>

              <button @click="closeModal" class="mt-10 w-full py-5 bg-gray-700 text-white rounded-[2rem] font-black shadow-lg hover:bg-gray-800 transition-all uppercase tracking-widest text-sm translate-y-0 active:scale-95">
                Cerrar guía
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.animate-pop-up {
  animation: popUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes popUp {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
