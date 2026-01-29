<script setup lang="ts">
import { ref, computed } from 'vue'

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
    description: 'Beber al menos 2 litros de agua al día. La hidratación adecuada mejora función metabólica y ayuda a eliminar toxinas.',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    completed: false
  },
  {
    id: 2,
    title: 'Horarios regulares de comida',
    description: 'Comer a horarios similares cada día estabiliza glucosa e insulina, reduciendo antojos y mejorando energía.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    completed: false
  },
  {
    id: 3,
    title: 'Sueño reparador (7-9h)',
    description: 'El sueño de calidad regula cortisol, leptina y grelina (hormonas del estrés y apetito), clave para equilibrio hormonal.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    completed: false
  },
  {
    id: 4,
    title: 'Movimiento diario',
    description: 'Al menos 30 minutos de actividad física moderada mejora sensibilidad a insulina y libera endorfinas (hormona del bienestar).',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    completed: false
  },
  {
    id: 5,
    title: 'Gestión del estrés',
    description: 'Practicar técnicas de relajación (respiración, meditación, yoga) reduce cortisol elevado que afecta otros ejes hormonales.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    completed: false
  },
  {
    id: 6,
    title: 'Consciencia alimentaria',
    description: 'Comer sin distracciones, masticando bien y reconociendo señales de hambre y saciedad mejora digestión y relación con la comida.',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    completed: false
  },
  {
    id: 7,
    title: 'Reducir exposición a disruptores endocrinos',
    description: 'Minimizar plásticos, cosméticos con parabenos y alimentos con pesticidas protege tu sistema hormonal.',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    completed: false
  },
  {
    id: 8,
    title: 'Revisiones médicas periódicas',
    description: 'Chequeos anuales con análisis hormonales permiten detectar desequilibrios tempranos y ajustar hábitos a tiempo.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
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
</script>

<template>
  <div class="space-y-6">
    <!-- Progress Header -->
    <div class="card bg-gradient-to-br from-lavender-500 to-sage-500 text-white">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-2xl font-bold mb-1">Tu Progreso de Hábitos</h3>
          <p class="text-white/90 text-sm">Marca los hábitos que ya incorporaste en tu rutina</p>
        </div>
        <div class="text-center bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
          <div class="text-4xl font-bold">{{ completedCount }}/{{ habits.length }}</div>
          <div class="text-sm">completados</div>
        </div>
      </div>
      <div class="w-full bg-white/30 rounded-full h-3">
        <div 
          class="bg-white h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
          :style="{ width: `${progressPercentage}%` }"
        >
          <span v-if="progressPercentage > 20" class="text-xs font-semibold text-lavender-700">
            {{ progressPercentage }}%
          </span>
        </div>
      </div>
    </div>

    <!-- Habits Checklist -->
    <div class="space-y-3">
      <div
        v-for="habit in habits"
        :key="habit.id"
        @click="toggleHabit(habit.id)"
        :class="[
          'card cursor-pointer transition-all duration-300',
          habit.completed 
            ? 'bg-sage-50/80 border-sage-300' 
            : 'hover:border-lavender-300'
        ]"
      >
        <div class="flex items-start gap-4">
          <!-- Checkbox -->
          <div class="flex-shrink-0 mt-1">
            <div 
              :class="[
                'w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300',
                habit.completed 
                  ? 'bg-sage-500 border-sage-500' 
                  : 'border-lavender-300 hover:border-lavender-500'
              ]"
            >
              <svg 
                v-if="habit.completed" 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-4 w-4 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <!-- Icon -->
          <div 
            :class="[
              'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
              habit.completed 
                ? 'bg-sage-500' 
                : 'bg-lavender-500'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="habit.icon" />
            </svg>
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h4 
              :class="[
                'font-semibold mb-1 transition-all duration-300',
                habit.completed 
                  ? 'text-sage-800 line-through' 
                  : 'text-gray-800'
              ]"
            >
              {{ habit.title }}
            </h4>
            <p 
              :class="[
                'text-sm leading-relaxed transition-all duration-300',
                habit.completed 
                  ? 'text-sage-600' 
                  : 'text-gray-600'
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
      class="card bg-gradient-to-r from-sage-500 to-lavender-500 text-white text-center"
    >
      <div class="text-5xl mb-3">🎉</div>
      <h3 class="text-2xl font-bold mb-2">¡Increíble trabajo!</h3>
      <p class="text-white/90">
        Has marcado todos los hábitos. Recuerda que la consistencia es más importante que la perfección. 
        Cada pequeño paso cuenta en tu camino hacia el bienestar integral.
      </p>
    </div>

    <div v-else class="card bg-lavender-50/50 border-lavender-200">
      <div class="flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-lavender-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm text-gray-700 leading-relaxed">
          <span class="font-semibold">Tip:</span> No necesitas implementar todos los hábitos a la vez. Elige 1-2 para comenzar y ve incorporando más gradualmente. El cambio sostenible es progresivo.
        </p>
      </div>
    </div>
  </div>
</template>
