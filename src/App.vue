<script setup lang="ts">
import { ref, computed } from 'vue'
import LandingSelector from './components/LandingSelector.vue'
import ModuleInfo from './components/ModuleInfo.vue'
import ModuleNutrition from './components/ModuleNutrition.vue'
import ModuleHabits from './components/ModuleHabits.vue'
import ModuleDisclaimer from './components/ModuleDisclaimer.vue'

type UserProfile = 'pcos' | 'no-pcos' | null

const userProfile = ref<UserProfile>(null)
const currentModule = ref<number>(0)

// Handler para selección de perfil
const handleProfileSelection = (profile: 'pcos' | 'no-pcos') => {
  userProfile.value = profile
  currentModule.value = 1
}

// Resetear estado al inicio
const resetToHome = () => {
  userProfile.value = null
  currentModule.value = 0
}

// Navegación entre módulos
const nextModule = () => {
  if (currentModule.value < 4) {
    currentModule.value++
  }
}

const prevModule = () => {
  if (currentModule.value > 1) {
    currentModule.value--
  }
}

const showLanding = computed(() => userProfile.value === null)

// Títulos de módulos dinámicos
const moduleTitle = computed(() => {
  switch (currentModule.value) {
    case 1:
      return userProfile.value === 'pcos' ? 'Entiendo el SOP' : 'Entiendo mi Salud'
    case 2:
      return userProfile.value === 'pcos' ? 'Manejo Nutricional' : 'Nutrición Preventiva'
    case 3:
      return userProfile.value === 'pcos' ? 'Hábitos de Manejo' : 'Hábitos de Prevención'
    case 4:
      return 'Información Importante'
    default:
      return ''
  }
})

const profileGradient = computed(() => {
  return userProfile.value === 'pcos'
    ? 'from-pastel-lilac-300 to-pastel-pink-200'
    : 'from-pastel-mint-300 to-pastel-sky-200'
})
</script>

<template>
  <div class="min-h-screen bg-[#FDFCF8] flex flex-col font-sans transition-colors duration-500">
    <!-- Navbar / Header -->
    <header 
      v-if="!showLanding" 
      class="sticky top-0 z-40 bg-white/60 backdrop-blur-md border-b border-gray-100 px-6 py-4"
    >
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <!-- Botón Inicio (Superior Izquierda) -->
        <button 
          @click="resetToHome"
          class="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-pastel-sky-100 text-gray-700 font-semibold shadow-sm hover:shadow-md hover:bg-pastel-sky-200 transition-all duration-300 border border-pastel-sky-200/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Inicio
        </button>

        <div class="hidden md:flex items-center gap-3">
          <div :class="['w-8 h-8 rounded-full bg-gradient-to-br', profileGradient]"></div>
          <span class="text-xs font-bold text-gray-400 tracking-widest uppercase">
            Perfil: {{ userProfile === 'pcos' ? 'Manejo SOP' : 'Prevención' }}
          </span>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-grow flex flex-col">
      <Transition name="fade" mode="out-in">
        <!-- Landing Selector -->
        <LandingSelector 
          v-if="showLanding" 
          @select-profile="handleProfileSelection"
        />

        <!-- Dashboard -->
        <div v-else class="max-w-6xl mx-auto w-full px-6 py-10 flex-grow">
          <!-- Module Header -->
          <div class="text-center mb-12">
            <span class="text-gray-400 text-xs font-bold uppercase tracking-[0.3em] mb-2 block animate-pulse">
              Módulo {{ currentModule }} / 4
            </span>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-700 title-gradient leading-tight">
              {{ moduleTitle }}
            </h2>
          </div>

          <!-- Component Render -->
          <div class="min-h-[50vh]">
            <Transition name="fade" mode="out-in">
              <ModuleInfo 
                v-if="currentModule === 1" 
                :profile="userProfile!"
              />
              <ModuleNutrition 
                v-else-if="currentModule === 2" 
                :profile="userProfile!"
              />
              <ModuleHabits 
                v-else-if="currentModule === 3"
                :profile="userProfile!"
              />
              <ModuleDisclaimer 
                v-else-if="currentModule === 4"
              />
            </Transition>
          </div>

          <!-- Navigation Footer -->
          <footer class="mt-16 flex justify-between items-center border-t border-gray-100 pt-10">
            <button
              v-if="currentModule > 1"
              @click="prevModule"
              class="group flex items-center gap-3 text-gray-500 font-bold hover:text-gray-700 transition-colors"
            >
              <div class="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:bg-gray-50 group-hover:border-gray-200 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              Anterior
            </button>
            <div v-else></div>

            <button
              v-if="currentModule < 4"
              @click="nextModule"
              class="group flex items-center gap-4 px-8 py-4 bg-gray-700 text-white rounded-[2rem] font-bold shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all hover:bg-gray-800"
            >
              Siguiente
              <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </footer>
        </div>
      </Transition>
    </main>

    <!-- Footer Copyright -->
    <footer v-if="!showLanding" class="py-8 text-center border-t border-gray-50">
      <p class="text-xs text-gray-300 font-medium tracking-widest uppercase">
        NutriHealth &copy; 2026 &bull; Educación para el Bienestar
      </p>
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.title-gradient {
  background: linear-gradient(135deg, #374151 0%, #6B7280 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
