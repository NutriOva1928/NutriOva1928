<script setup lang="ts">
import { ref, computed } from 'vue'
import LandingSelector from './components/LandingSelector.vue'
import ModuleInfo from './components/ModuleInfo.vue'
import ModuleNutrition from './components/ModuleNutrition.vue'
import ModuleHabits from './components/ModuleHabits.vue'
import ModuleDisclaimer from './components/ModuleDisclaimer.vue'
import DashboardMetrics from './components/DashboardMetrics.vue'
import EventsHistory from './components/EventsHistory.vue'

type UserProfile = 'pcos' | 'no-pcos' | null

const userProfile = ref<UserProfile>(null)
const currentModule = ref<number>(0)
const currentView = ref<'modules' | 'dashboard' | 'history'>('modules')

// Handler para selección de perfil
const handleProfileSelection = (profile: 'pcos' | 'no-pcos') => {
  userProfile.value = profile
  currentModule.value = 1
  currentView.value = 'modules'
}

// Resetear estado al inicio
const resetToHome = () => {
  userProfile.value = null
  currentModule.value = 0
  currentView.value = 'modules'
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
      return userProfile.value === 'pcos' ? 'Aprendiendo a escuchar mi cuerpo' : 'Entiendo mi Salud'
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
      class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-nutriova-earth-200 px-6 py-4 shadow-sm"
    >
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-8">
          <!-- Logo / Brand -->
          <div 
            @click="resetToHome"
            class="cursor-pointer flex items-center gap-3 group"
          >
            <div>
              <h1 class="text-xl font-bold text-nutriova-green-900 tracking-tight leading-none group-hover:text-nutriova-green-700 transition-colors">Nutriova</h1>
              <span class="text-[0.65rem] uppercase tracking-widest text-nutriova-earth-500 font-semibold block mt-0.5">Equilibrio & Bienestar</span>
            </div>
          </div>

          <!-- Navigation Links -->
          <!-- Navigation Links Removed -->
        </div>

        <div class="flex items-center gap-3">
          <div :class="['w-8 h-8 rounded-full border-2 border-white shadow-sm bg-gradient-to-br', profileGradient]"></div>
          <span class="hidden sm:block text-xs font-bold text-nutriova-earth-400 tracking-widest uppercase">
            {{ userProfile === 'pcos' ? 'Modo SOP' : 'Prevención' }}
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

        <!-- App Contents -->
        <div v-else class="max-w-7xl mx-auto w-full px-6 py-10 flex-grow">
          
          <!-- Modules View -->
          <div v-if="currentView === 'modules'">
            <div class="text-center mb-12">
              <span class="text-nutriova-earth-400 text-xs font-bold uppercase tracking-[0.3em] mb-2 block">
                Ruta de Aprendizaje
              </span>
              <h2 class="text-3xl md:text-4xl font-bold text-nutriova-green-900 leading-tight">
                {{ moduleTitle }}
              </h2>
            </div>

            <div class="min-h-[50vh]">
              <Transition name="fade" mode="out-in">
                <ModuleInfo v-if="currentModule === 1" :profile="userProfile!" />
                <ModuleNutrition v-else-if="currentModule === 2" :profile="userProfile!" />
                <ModuleHabits v-else-if="currentModule === 3" :profile="userProfile!" />
                <ModuleDisclaimer v-else-if="currentModule === 4" />
              </Transition>
            </div>

            <!-- Module Nav Footer -->
            <footer class="mt-16 flex justify-between items-center border-t border-nutriova-earth-100 pt-10">
              <button
                v-if="currentModule > 1"
                @click="prevModule"
                class="group flex items-center gap-3 text-nutriova-earth-500 font-bold hover:text-nutriova-terracotta-600 transition-colors"
              >
                <div class="w-10 h-10 rounded-full border-2 border-nutriova-earth-100 flex items-center justify-center group-hover:bg-nutriova-terracotta-50 group-hover:border-nutriova-terracotta-100 transition-all">
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
                class="group flex items-center gap-4 px-8 py-4 bg-nutriova-terracotta-500 text-white rounded-[2rem] font-bold shadow-soft hover:shadow-soft-lg hover:translate-y-[-2px] transition-all hover:bg-nutriova-terracotta-600"
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

          <!-- Dashboard Metrics View -->
          <div v-else-if="currentView === 'dashboard'">
            <DashboardMetrics />
          </div>

          <!-- History View -->
          <div v-else-if="currentView === 'history'">
            <EventsHistory />
          </div>

        </div>
      </Transition>
    </main>

    <!-- Footer Copyright -->
    <footer v-if="!showLanding" class="py-8 text-center border-t border-nutriova-earth-100 bg-white">
      <p class="text-xs text-nutriova-earth-400 font-medium tracking-widest uppercase">
        Nutriova &copy; 2026 &bull; Equilibrio Hormonal y Bienestar
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
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
