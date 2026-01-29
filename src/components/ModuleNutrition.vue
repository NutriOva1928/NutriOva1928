<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  profile: 'pcos' | 'no-pcos'
}>()

const selectedCategory = ref<'priority' | 'occasional'>('priority')

const pcosNutrition = {
  priority: [
    { name: 'Vegetales de hoja verde', benefit: 'Ricos en magnesio y antioxidantes antiinflamatorios', icon: '🥬' },
    { name: 'Proteínas magras', benefit: 'Ayudan a estabilizar glucosa y aumentan saciedad', icon: '🐟' },
    { name: 'Grasas saludables', benefit: 'Omega-3 de pescado, aguacate, nueces reducen inflamación', icon: '🥑' },
    { name: 'Granos integrales', benefit: 'Bajo índice glucémico, mejoran sensibilidad a insulina', icon: '🌾' },
    { name: 'Frutas de bajo IG', benefit: 'Berries, manzana verde, pera - antioxidantes sin picos de azúcar', icon: '🫐' },
    { name: 'Legumbres', benefit: 'Fibra y proteína vegetal para control de peso y glucosa', icon: '🫘' },
  ],
  occasional: [
    { name: 'Azúcares refinados', reason: 'Provocan picos de insulina y empeoran resistencia', icon: '🍰' },
    { name: 'Procesados ultraprocesados', reason: 'Altos en grasas trans e inflamatorias', icon: '🍟' },
    { name: 'Lácteos enteros', reason: 'Algunos estudios sugieren moderación en SOP (individualizar)', icon: '🧀' },
    { name: 'Carbohidratos simples', reason: 'Pan blanco, pastas refinadas aumentan glucosa rápidamente', icon: '🍞' },
  ]
}

const noPcosNutrition = {
  priority: [
    { name: 'Variedad de vegetales', benefit: 'Vitaminas, minerales y fitoquímicos para salud celular', icon: '🥗' },
    { name: 'Proteínas de calidad', benefit: 'Animales y vegetales para reparación y función hormonal', icon: '🍳' },
    { name: 'Grasas esenciales', benefit: 'Omega-3 y 6 en equilibrio apoyan producción hormonal', icon: '🥜' },
    { name: 'Granos enteros', benefit: 'Energía sostenida y fibra para salud digestiva', icon: '🍚' },
    { name: 'Frutas frescas', benefit: 'Antioxidantes naturales y vitaminas hidrosolubles', icon: '🍎' },
    { name: 'Fermentados', benefit: 'Probióticos para microbiota intestinal y sistema inmune', icon: '🥛' },
  ],
  occasional: [
    { name: 'Alimentos ultraprocesados', reason: 'Bajos en nutrientes, altos en aditivos y sodio', icon: '🍕' },
    { name: 'Exceso de cafeína', reason: 'Puede alterar cortisol y afectar calidad del sueño', icon: '☕' },
    { name: 'Alcohol en exceso', reason: 'Interfiere con metabolismo hepático de hormonas', icon: '🍷' },
    { name: 'Azúcares añadidos', reason: 'Inflamación sistémica y carga metabólica innecesaria', icon: '🍬' },
  ]
}
</script>

<template>
  <div class="space-y-6">
    <!-- Category Selector -->
    <div class="flex justify-center gap-4 mb-8">
      <button
        @click="selectedCategory = 'priority'"
        :class="[
          'px-6 py-3 rounded-xl font-medium transition-all duration-300',
          selectedCategory === 'priority' 
            ? 'bg-gradient-to-r from-sage-500 to-sage-600 text-white shadow-md scale-105' 
            : 'bg-white text-sage-600 border-2 border-sage-300 hover:border-sage-400'
        ]"
      >
        <span class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Alimentos a Priorizar
        </span>
      </button>
      
      <button
        @click="selectedCategory = 'occasional'"
        :class="[
          'px-6 py-3 rounded-xl font-medium transition-all duration-300',
          selectedCategory === 'occasional' 
            ? 'bg-gradient-to-r from-lavender-500 to-lavender-600 text-white shadow-md scale-105' 
            : 'bg-white text-lavender-600 border-2 border-lavender-300 hover:border-lavender-400'
        ]"
      >
        <span class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Consumo Ocasional
        </span>
      </button>
    </div>

    <!-- Content Cards -->
    <Transition name="fade" mode="out-in">
      <!-- Priority Foods -->
      <div v-if="selectedCategory === 'priority'" class="grid md:grid-cols-2 gap-4">
        <div 
          v-for="(food, index) in (profile === 'pcos' ? pcosNutrition.priority : noPcosNutrition.priority)"
          :key="index"
          class="card hover:border-sage-300 group"
        >
          <div class="flex items-start gap-4">
            <div class="text-4xl group-hover:scale-110 transition-transform duration-300">
              {{ food.icon }}
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-sage-800 mb-1 flex items-center gap-2">
                {{ food.name }}
                <span class="badge-priority text-xs">Priorizar</span>
              </h4>
              <p class="text-sm text-gray-600 leading-relaxed">{{ food.benefit }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Occasional Foods -->
      <div v-else class="grid md:grid-cols-2 gap-4">
        <div 
          v-for="(food, index) in (profile === 'pcos' ? pcosNutrition.occasional : noPcosNutrition.occasional)"
          :key="index"
          class="card hover:border-lavender-300 group"
        >
          <div class="flex items-start gap-4">
            <div class="text-4xl group-hover:scale-110 transition-transform duration-300">
              {{ food.icon }}
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-lavender-800 mb-1 flex items-center gap-2">
                {{ food.name }}
                <span class="badge-occasional text-xs">Moderar</span>
              </h4>
              <p class="text-sm text-gray-600 leading-relaxed">{{ food.reason }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Educational Note -->
    <div class="card bg-gradient-to-r from-lavender-50 to-sage-50 border-lavender-200 mt-8">
      <div class="flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-lavender-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm text-gray-700 leading-relaxed">
          <span class="font-semibold">Recuerda:</span> Estas son guías generales. La nutrición es altamente individualizada. Lo ideal es trabajar con un profesional de nutrición para adaptar estas recomendaciones a tus necesidades específicas, preferencias y objetivos de salud.
        </p>
      </div>
    </div>
  </div>
</template>
