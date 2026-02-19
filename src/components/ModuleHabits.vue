<script setup lang="ts">
import { ref, computed } from 'vue'
import HabitosBienestar from './HabitosBienestar.vue'
import HabitosGeneral from './HabitosGeneral.vue'

// Props para el perfil
const props = defineProps<{
  profile: 'pcos' | 'no-pcos'
}>()

interface Habit {
  id: number
  title: string
  description: string
  icon: string
  completed: boolean
}

const habits = ref<Habit[]>([
  {
    id: 1,
    title: 'Hidratación consciente',
    description: 'Beber al menos 2 litros de agua al día.',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    completed: false
  },
  {
    id: 2,
    title: 'Horarios regulares de comida',
    description: 'Comer a horarios similares cada día.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    completed: false
  },
  {
    id: 3,
    title: 'Sueño reparador (7-9h)',
    description: 'Dormir entre 7 y 9 horas de calidad.',
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    completed: false
  },
  {
    id: 4,
    title: 'Movimiento diario',
    description: 'Al menos 30 minutos de actividad física.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    completed: false
  },
  {
    id: 5,
    title: 'Gestión del estrés',
    description: 'Practicar técnicas de relajación.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    completed: false
  },
  {
    id: 6,
    title: 'Consciencia alimentaria',
    description: 'Comer sin distracciones, masticando bien.',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    completed: false
  },
  {
    id: 7,
    title: 'Reducir disruptores endocrinos',
    description: 'Minimizar plásticos y cosméticos dañinos.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    completed: false
  },
  {
    id: 8,
    title: 'Revisiones médicas periódicas',
    description: 'Chequeos anuales con análisis hormonales.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    completed: false
  }
])

const toggleHabit = (id: number) => {
  const habit = habits.value.find(h => h.id === id)
  if (habit) {
    habit.completed = !habit.completed
  }
}

const completedCount = computed(() => habits.value.filter(h => h.completed).length)
const progressPercentage = computed(() => Math.round((completedCount.value / habits.value.length) * 100))

// Estado para alternar entre vistas
const activeView = ref<'cards' | 'checklist'>('cards')
</script>

<template>
  <div class="space-y-6">
    <!-- Tabs de navegación - Estilo soft pastel -->
    <div class="flex justify-center gap-3 mb-6">
      <button
        @click="activeView = 'cards'"
        :class="[
          'px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 border-2',
          activeView === 'cards' 
            ? profile === 'pcos'
              ? 'bg-habits-50 border-habits-300 text-habits-600 shadow-soft'
              : 'bg-nutrition-50 border-nutrition-300 text-nutrition-600 shadow-soft'
            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        {{ profile === 'pcos' ? 'Hábitos Clave' : 'Hábitos de Prevención' }}
      </button>
      
      <button
        @click="activeView = 'checklist'"
        :class="[
          'px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 border-2',
          activeView === 'checklist' 
            ? profile === 'pcos'
              ? 'bg-stress-50 border-stress-300 text-stress-600 shadow-soft'
              : 'bg-sleep-50 border-sleep-300 text-sleep-600 shadow-soft'
            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        Mi Progreso
      </button>
    </div>

    <!-- Contenido según tab seleccionado -->
    <Transition name="fade" mode="out-in">
      <!-- Vista de Tarjetas Interactivas -->
      <template v-if="activeView === 'cards'">
        <HabitosBienestar v-if="profile === 'pcos'" key="pcos-cards" />
        <HabitosGeneral v-else key="nopcos-cards" />
      </template>

      <!-- Vista de Checklist -->
      <div v-else key="checklist" class="space-y-6">
        <!-- Progress Header - Estilo soft pastel -->
        <div :class="[
          'rounded-3xl p-6 border-4 bg-white shadow-soft',
          profile === 'pcos' ? 'border-habits-200' : 'border-nutrition-200'
        ]">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-xl font-semibold text-gray-700 mb-1">Tu Progreso de Hábitos</h3>
              <p class="text-gray-500 text-sm">Marca los hábitos que ya incorporaste en tu rutina</p>
            </div>
            <div :class="[
              'text-center rounded-2xl px-5 py-3',
              profile === 'pcos' ? 'bg-habits-50' : 'bg-nutrition-50'
            ]">
              <div :class="[
                'text-3xl font-bold',
                profile === 'pcos' ? 'text-habits-600' : 'text-nutrition-600'
              ]">{{ completedCount }}/{{ habits.length }}</div>
              <div class="text-xs text-gray-500">completados</div>
            </div>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-2">
            <div 
              :class="[
                'h-2 rounded-full transition-all duration-500',
                profile === 'pcos' ? 'bg-habits-400' : 'bg-nutrition-400'
              ]"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
        </div>

        <!-- Habits Checklist -->
        <div class="space-y-3">
          <div
            v-for="habit in habits"
            :key="habit.id"
            @click="toggleHabit(habit.id)"
            :class="[
              'bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all duration-300 shadow-soft',
              habit.completed 
                ? profile === 'pcos' ? 'border-habits-300 bg-habits-50' : 'border-nutrition-300 bg-nutrition-50'
                : 'border-gray-100 hover:border-gray-200 hover:shadow-soft-lg'
            ]"
          >
            <div class="flex items-start gap-4">
              <!-- Checkbox -->
              <div class="flex-shrink-0 mt-1">
                <div 
                  :class="[
                    'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300',
                    habit.completed 
                      ? profile === 'pcos' ? 'bg-habits-400 border-habits-400' : 'bg-nutrition-400 border-nutrition-400'
                      : 'border-gray-300 hover:border-gray-400'
                  ]"
                >
                  <svg 
                    v-if="habit.completed" 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-4 w-4 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <!-- Icon -->
              <div 
                :class="[
                  'flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300',
                  habit.completed 
                    ? profile === 'pcos' ? 'bg-habits-200' : 'bg-nutrition-200'
                    : 'bg-gray-100'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="habit.icon" />
                </svg>
              </div>

              <!-- Content -->
              <div class="flex-1">
                <h4 
                  :class="[
                    'font-medium mb-0.5 transition-all duration-300',
                    habit.completed 
                      ? 'text-gray-500 line-through' 
                      : 'text-gray-700'
                  ]"
                >
                  {{ habit.title }}
                </h4>
                <p 
                  :class="[
                    'text-sm leading-relaxed transition-all duration-300',
                    habit.completed 
                      ? 'text-gray-400' 
                      : 'text-gray-500'
                  ]"
                >
                  {{ habit.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Motivational Message -->
        <div 
          v-if="completedCount === habits.length"
          :class="[
            'rounded-3xl border-4 p-6 text-center bg-white shadow-soft',
            profile === 'pcos' ? 'border-habits-300' : 'border-nutrition-300'
          ]"
        >
          <div class="text-4xl mb-3">🎉</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">¡Increíble trabajo!</h3>
          <p class="text-gray-500 text-sm">
            Has marcado todos los hábitos. Recuerda que la consistencia es más importante que la perfección.
          </p>
        </div>

        <div v-else class="bg-white rounded-2xl border-2 border-gray-100 p-4 shadow-soft">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-stress-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-sm text-gray-500 leading-relaxed">
              <span class="font-medium text-gray-600">Tip:</span> No necesitas implementar todos los hábitos a la vez. Elige 1-2 para comenzar y ve sumando poco a poco. <br>
              <i>Pequeños hábitos, grandes cambios.</i>
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
