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

// Handler para reset
const resetApp = () => {
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

// Computed para mostrar/ocultar componentes
const showLanding = computed(() => userProfile.value === null)
const showDashboard = computed(() => userProfile.value !== null)

// Títulos de módulos
const moduleTitle = computed(() => {
  switch (currentModule.value) {
    case 1:
      return userProfile.value === 'pcos' 
        ? 'Entendiendo el SOP' 
        : 'Salud Hormonal Femenina'
    case 2:
      return 'Nutrición Inteligente'
    case 3:
      return 'Hábitos de Bienestar'
    case 4:
      return 'Importante: Aviso Legal'
    default:
      return ''
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header con logo y reset (solo visible cuando hay perfil seleccionado) -->
    <header 
      v-if="showDashboard" 
      class="bg-white/70 backdrop-blur-md border-b border-lavender-100 sticky top-0 z-50 shadow-sm"
    >
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-lavender-400 to-sage-400 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 class="text-xl font-semibold title-gradient">NutriHealth SOP</h1>
        </div>
        <button 
          @click="resetApp"
          class="text-sm text-lavender-600 hover:text-lavender-800 font-medium transition-colors duration-200 flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Inicio
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col">
      <!-- Landing/Selector Screen -->
      <Transition name="fade" mode="out-in">
        <LandingSelector 
          v-if="showLanding" 
          @select-profile="handleProfileSelection"
        />

        <!-- Dashboard Educativo -->
        <div v-else class="container mx-auto px-4 py-8 max-w-5xl">
          <!-- Progress Indicator -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-lavender-700">Progreso del Módulo</span>
              <span class="text-sm font-medium text-lavender-700">{{ currentModule }}/4</span>
            </div>
            <div class="w-full bg-lavender-100 rounded-full h-2.5">
              <div 
                class="bg-gradient-to-r from-lavender-500 to-sage-500 h-2.5 rounded-full transition-all duration-500"
                :style="{ width: `${(currentModule / 4) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Module Title -->
          <h2 class="text-3xl md:text-4xl font-bold title-gradient mb-8 text-center">
            {{ moduleTitle }}
          </h2>

          <!-- Module Content -->
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
            />
            <ModuleDisclaimer 
              v-else-if="currentModule === 4"
            />
          </Transition>

          <!-- Navigation Buttons -->
          <div class="flex justify-between items-center mt-10 gap-4">
            <button
              v-if="currentModule > 1"
              @click="prevModule"
              class="btn-secondary"
            >
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
              </span>
            </button>
            <div v-else></div>

            <button
              v-if="currentModule < 4"
              @click="nextModule"
              class="btn-primary ml-auto"
            >
              <span class="flex items-center gap-2">
                Siguiente
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </Transition>
    </main>

    <!-- Footer -->
    <footer class="bg-white/50 backdrop-blur-sm border-t border-lavender-100 py-6 mt-auto">
      <div class="container mx-auto px-4 text-center">
        <p class="text-sm text-gray-600">
          © 2026 NutriHealth SOP - Herramienta Educativa
        </p>
        <p class="text-xs text-gray-500 mt-1">
          Tesis de Grado - Nutrición y Salud Hormonal
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Animations already defined in global CSS */
</style>
