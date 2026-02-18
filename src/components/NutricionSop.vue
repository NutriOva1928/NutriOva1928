<script setup lang="ts">
import { ref, computed } from 'vue'



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

// 1. Datos para PRIORIZAR (Síndrome de Ovario Poliquístico)
const prioritizeCategories: NutritionCategory[] = [
  {
    id: 'proteinas',
    title: 'Proteínas Magras',
    subtitle: 'Estabilizan glucosa y saciedad',
    reason: 'Ayudan a controlar los picos de insulina y mantienen la masa muscular, fundamental para el metabolismo de glucosa.',
    icon: 'chicken',
    color: 'mint',
    items: [
      { name: 'Fuentes Animales', description: 'Pollo, pavo, pato, pescados, cerdo, claras de huevo.' },
      { name: 'Fuentes Vegetales', description: 'Chochos, lentejas, frejoles, garbanzos, habas y arvejas tiernas.' }
    ]
  },
  {
    id: 'hoja-verde',
    title: 'Vegetales de Hoja Verde',
    subtitle: 'Ricos en magnesio y antioxidantes',
    reason: 'El magnesio mejora la sensibilidad a la insulina y los antioxidantes reducen la inflamación crónica.',
    icon: 'leaf',
    color: 'mint',
    items: [
      { name: 'Ejemplos', description: 'Espinacas, acelgas, col rizada, rúcula, brócoli.' },
      { name: 'Beneficio', description: 'Aportan magnesio y fibra esenciales para equilibrar tus hormonas y expulsar el exceso de estrógenos de forma natural.' }
    ]
  },
  {
    id: 'grasas',
    title: 'Grasas Saludables',
    subtitle: 'Omega-3 para la inflamación',
    reason: 'Los ácidos grasos Omega-3 reducen los niveles de andrógenos y combaten la inflamación sistémica.',
    icon: 'avocado',
    color: 'mint',
    items: [
      { name: 'Frutos Secos y Semillas', description: 'Maní, sacha inchi (maní amazónico), semillas de zapallo, ajonjoli, nueces, almendras, linaza y chia.  .' },
      { name: 'Aceites', description: 'Aceite de oliva virgen extra, aguacate, coco.' }
    ]
  },
  {
    id: 'granos',
    title: 'Granos Integrales',
    subtitle: 'Bajo índice glucémico',
    reason: 'Evitan picos de insulina bruscos que estimulan la producción de testosterona en los ovarios.',
    icon: 'wheat',
    color: 'mint',
    items: [
      { name: 'Opciones', description: 'Avena integral, quinoa, arroz integral, cebada, amaranto.' },
      { name: 'Tip', description: 'Combinar siempre con proteína o grasa saludable.' }
    ]
  },
  {
    id: 'frutas',
    title: 'Frutas Bajo IG',
    subtitle: 'Energía con mucha fibra',
    reason: 'Aportan vitaminas sin elevar drásticamente el azúcar en sangre, clave para el Síndrome de Ovario Poliquístico.',
    icon: 'apple',
    color: 'mint',
    items: [
      { name: 'Frutos Rojos', description: 'Mora, frutillas, y frambuesas.' },
      { name: 'Cítricos', description: 'Limon, lima y toronja.' },
      { name: 'Verdes', description: 'Manzana verde, tomate de árbol, babaco, guayaba y pera.' }
    ]
  },
  {
    id: 'legumbres',
    title: 'Legumbres',
    subtitle: 'Proteína y fibra vegetal',
    reason: 'La fibra soluble mejora el control glucémico y la saciedad prolongada.',
    icon: 'beans',
    color: 'mint',
    items: [
      { name: 'Variedad', description: 'Vainitas, garbanzos,habitas tiernas.' }
    ]
  }
]

// 2. Datos para LIMITAR (Síndrome de Ovario Poliquístico)
const limitCategories: NutritionCategory[] = [
  {
    id: 'azucares',
    title: 'Azúcares Refinados',
    subtitle: 'Disparan la insulina',
    reason: 'Provocan picos glucémicos que empeoran la resistencia a la insulina y aumentan los andrógenos.',
    icon: 'soda',
    color: 'pink',
    items: [
      { name: 'Evitar', description: 'Bebidas azucaradas, refrescos, dulces comerciales, jarabes.' },
      { name: 'Impacto', description: 'Fomentan el almacenamiento de grasa abdominal y la inflamación.' }
    ]
  },
  {
    id: 'harinas',
    title: 'Harinas Blancas',
    subtitle: 'Baja densidad nutricional',
    reason: 'Su rápida absorción afecta directamente el balance hormonal y la energía diaria.',
    icon: 'croissant',
    color: 'pink',
    items: [
      { name: 'Limitar', description: 'Pan blanco, pastas no integrales, bollería, galletas.' },
      { name: 'Alternativa', description: 'Sustituir por versiones 100% integrales o de granos antiguos.' }
    ]
  },
  {
    id: 'procesados',
    title: 'Ultraprocesados',
    subtitle: 'Grasas trans e inflamación',
    reason: 'Contienen aditivos y grasas que estresan el sistema endocrino y aumentan la inflamación crónica.',
    icon: 'pizza',
    color: 'pink',
    items: [
      { name: 'Reducir', description: 'Embutidos, snacks fritos, comidas precocidas, margarinas.' }
    ]
  },
  {
    id: 'lacteos',
    title: 'Lácteos Altos en Grasa',
    subtitle: 'Posible impacto hormonal',
    reason: 'En exceso, pueden influir en los niveles de factores de crecimiento similares a la insulina (IGF-1), afectando andrógenos.',
    icon: 'milk',
    color: 'pink',
    items: [
      { name: 'Evaluar', description: 'Leche entera, quesos muy maduros, cremas densas.' },
      { name: 'Consejo', description: 'Priorizar opciones fermentadas (yogur natural/kéfir) o alternativas vegetales.' }
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
        {{ viewMode === 'prioritize' ? 'Nutrición Inteligente' : 'Alimentos Ocasionales' }}
      </h3>
      <p class="text-gray-500 leading-relaxed italic">
        {{ viewMode === 'prioritize' 
          ? 'Enfócate en alimentos de baja carga glucémica y alto poder antiinflamatorio para sanar desde adentro.' 
          : 'Reducir el consumo de estos alimentos ayudará a prevenir picos de insulina y controlar los síntomas del Síndrome de Ovario Poliquístico.'
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
          cat.color === 'mint' ? 'bg-pastel-mint-100/60 border-pastel-mint-200 hover:border-pastel-mint-400' : 'bg-pastel-pink-100/60 border-pastel-pink-200 hover:border-pastel-pink-400'
        ]"
      >
        <div class="flex flex-col h-full justify-between items-center text-center">
          <!-- Icon Contextual -->
          <div class="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 transition-transform group-hover:rotate-6">
            <!-- Iconos Semánticos SVG -->
            <svg v-if="cat.icon === 'chicken'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2a10 10 0 0 1 10 10v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a10 10 0 0 1 10-10z" />
              <path d="M12 18v2M12 6c-3 0-5 2-5 5" />
            </svg>
            <svg v-else-if="cat.icon === 'leaf'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.28 2 8 0 4.5-3.5 8.2-8 10zM11 20l2-5" />
            </svg>
            <svg v-else-if="cat.icon === 'avocado'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2C8 2 5 5 5 10c0 5 4 12 7 12s7-7 7-12c0-5-3-8-7-8z" /><circle cx="12" cy="14" r="3" />
            </svg>
            <svg v-else-if="cat.icon === 'wheat'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 20l10-10M10 21l2-2M15 11l2-2" />
            </svg>
            <svg v-else-if="cat.icon === 'apple'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="13" r="7" /><path d="M12 6V3m0 3a3 3 0 0 0-3-3" />
            </svg>
            <svg v-else-if="cat.icon === 'beans'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="8" cy="12" r="2" /><circle cx="16" cy="12" r="2" /><circle cx="12" cy="8" r="2" />
            </svg>
            <!-- Iconos para LIMITAR -->
            <svg v-else-if="cat.icon === 'soda'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 21h10V5H7v16zM12 5V3m0 5v13M10 8h4" />
            </svg>
            <svg v-else-if="cat.icon === 'croissant'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 12c-5 0-9 4-9 9h18c0-5-4-9-9-9zM3 21h18" />
            </svg>
            <svg v-else-if="cat.icon === 'pizza'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 11l-3 3m0 0l-3-3m3 3V4m-8 16c0-6 4-11 10-11s10 5 10 11H4z" />
            </svg>
            <svg v-else-if="cat.icon === 'milk'" viewBox="0 0 24 24" class="w-9 h-9 text-gray-700" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 21h8V7l-4-3-4 3v14z" /><path d="M10 13h4M10 17h4" />
            </svg>
          </div>

          <h4 class="text-xl font-black text-gray-700 mb-2 leading-tight">{{ cat.title }}</h4>
          <p class="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
            {{ cat.subtitle }}
          </p>

          <div class="flex items-center justify-between w-full pt-4 border-t border-black/5">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold', viewMode === 'prioritize' ? 'bg-pastel-mint-400' : 'bg-pastel-pink-400']">
              <svg v-if="viewMode === 'prioritize'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Ver recomendaciones</span>
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
              <!-- Header -->
              <div class="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
                <div class="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-700 shadow-sm border border-gray-100">
                   <!-- Repetir SVG del modal -->
                   <svg v-if="selectedCategory.icon === 'chicken'" viewBox="0 0 24 24" class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M12 2a10 10 0 0 1 10 10v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a10 10 0 0 1 10-10z" />
                   </svg>
                   <svg v-else-if="selectedCategory.icon === 'soda'" viewBox="0 0 24 24" class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M7 21h10V5H7v16zM12 5V3m0 5v13" />
                   </svg>
                   <!-- (... otros SVGs abreviados para brevedad ...) -->
                   <span v-else class="text-3xl">🥗</span>
                </div>
                <div>
                  <h3 class="text-3xl font-black text-gray-700 leading-tight">{{ selectedCategory.title }}</h3>
                  <div :class="['h-2 w-16 rounded-full mt-2', selectedCategory.color === 'mint' ? 'bg-pastel-mint-300' : 'bg-pastel-pink-300']"></div>
                </div>
              </div>

              <!-- Razón Clínica -->
              <div class="bg-gray-50 rounded-3xl p-8 mb-8">
                <h5 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">¿Por qué es importante?</h5>
                <p class="text-gray-700 text-lg leading-relaxed">
                  {{ selectedCategory.reason }}
                </p>
              </div>

              <!-- Lista de Ejemplos -->
              <div class="space-y-4">
                <h5 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Guía Práctica:</h5>
                <div v-for="item in selectedCategory.items" :key="item.name" class="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <div :class="['w-3 h-3 rounded-full mt-1.5 flex-shrink-0', selectedCategory.color === 'mint' ? 'bg-pastel-mint-400' : 'bg-pastel-pink-400']"></div>
                  <div>
                    <span class="font-bold text-gray-700">{{ item.name }}</span>
                    <p class="text-gray-500 text-sm leading-relaxed">{{ item.description }}</p>
                  </div>
                </div>
              </div>

              <button @click="closeModal" class="mt-10 w-full py-5 bg-gray-700 text-white rounded-[2rem] font-black shadow-lg hover:bg-gray-800 transition-all uppercase tracking-widest text-sm translate-y-0 active:scale-95">
                Volver a la guía
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
