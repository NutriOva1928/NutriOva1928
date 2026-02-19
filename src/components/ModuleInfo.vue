<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  profile: 'pcos' | 'no-pcos'
}>()

// Interfaces
interface InfoItem {
  id: string
  title: string
  text: string
  modalDetail: string
  icon: string
  colorClass: string // Color de fondo de la card
  borderClass: string // Color del borde (usado en modal)
  iconContainer: string // Color del circulo del icono
}

// Estado del Modal
const isModalOpen = ref(false)
const selectedItem = ref<InfoItem | null>(null)

// Datos Perfil Síndrome de Ovario Poliquístico (Manejo)
const pcosItems: InfoItem[] = [
  {
    id: 'que-es',
    title: '¿Qué es el Síndrome de Ovario Poliquístico?',
    text: 'Trastorno endocrino que afecta entre el 6-13% de las mujeres. Se caracteriza por desequilibrio de andrógenos (acné, vello facial).',
    modalDetail: 'El Síndrome de Ovario Poliquístico es una condición hormonal compleja. El exceso de andrógenos no solo afecta la piel y el vello, sino que influye en todo el metabolismo femenino, requiriendo un enfoque integral de salud.',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    colorClass: 'bg-pastel-lilac-100/80',
    borderClass: 'border-pastel-lilac-300',
    iconContainer: 'bg-pastel-lilac-400'
  },
  {
    id: 'ciclos',
    title: 'Ciclos Irregulares',
    text: 'Períodos menstruales prolongados o ausentes debido a ciclos anovulatorios (sin ovulación).',
    modalDetail: 'La irregularidad menstrual es una señal de que la ovulación no está ocurriendo de forma predecible. Esto se debe a desequilibrios en las hormonas LH y FSH, lo cual es central en el diagnóstico del Síndrome de Ovario Poliquístico.',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    colorClass: 'bg-pastel-sky-100/80',
    borderClass: 'border-pastel-sky-300',
    iconContainer: 'bg-pastel-sky-400'
  },
  {
    id: 'insulina',
    title: 'Resistencia a la Insulina',
    text: 'Afecta al 50-70% de mujeres con este síndrome. Un factor metabólico que aumenta el riesgo de Diabetes Tipo 2.',
    modalDetail: 'La resistencia a la insulina es el motor de muchos síntomas del Síndrome de Ovario Poliquístico. El cuerpo lucha por procesar el azúcar, lo que eleva la insulina en sangre y, a su vez, estimula a los ovarios a producir más testosterona.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    colorClass: 'bg-pastel-mint-100/80',
    borderClass: 'border-pastel-mint-300',
    iconContainer: 'bg-pastel-mint-400'
  },
  {
    id: 'genetica',
    title: 'Factor Genético',
    text: 'Influencia hereditaria y probabilidad familiar; ciertos genes elevan la posibilidad de desarrollar el síndrome.',
    modalDetail: 'Si tienes familiares directos con Síndrome de Ovario Poliquístico, tus genes pueden predisponerte. Sin embargo, la epigenética nos dice que tus hábitos nutricionales y de vida pueden influir en cómo se expresan estos genes.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    colorClass: 'bg-pastel-pink-100/80',
    borderClass: 'border-pastel-pink-300',
    iconContainer: 'bg-pastel-pink-400'
  },
  {
    id: 'emocional',
    title: 'Impacto Emocional',
    text: 'Aumento del riesgo en ansiedad y depresión debido a los cambios hormonales y físicos persistentes.',
    modalDetail: 'El Síndrome de Ovario Poliquístico no solo es físico. Las fluctuaciones hormonales y los cambios en la imagen corporal tienen un impacto real en la salud mental. Reconocer esto es el primer paso para un bienestar integral.',
    icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    colorClass: 'bg-pastel-blue-100/80',
    borderClass: 'border-pastel-blue-300',
    iconContainer: 'bg-pastel-blue-400'
  }
]

// Datos Perfil Sin Diagnóstico (Prevención)
const prepItems: InfoItem[] = [
  {
    id: 'equilibrio',
    title: 'Equilibrio Hormonal',
    text: 'Mantener niveles estables de estrógenos y progesterona es vital para tu energía y ánimo diario.',
    modalDetail: 'El equilibrio se logra mediante una vida balanceada. Cuando tus hormonas funcionan bien, tu ciclo es regular y tu metabolismo se mantiene activo.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    colorClass: 'bg-pastel-sky-100/80',
    borderClass: 'border-pastel-sky-300',
    iconContainer: 'bg-pastel-sky-400'
  },
  {
    id: 'estilo-vida',
    title: 'Estilo de Vida Saludable',
    text: 'La prevención es tu mejor herramienta. El ejercicio y el descanso protegen tu salud a largo plazo.',
    modalDetail: 'Alimentarte bien y moverte no solo te hace sentir mejor hoy, sino que previene desajustes metabólicos en el futuro.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    colorClass: 'bg-pastel-mint-100/80',
    borderClass: 'border-pastel-mint-300',
    iconContainer: 'bg-pastel-mint-400'
  }
]

const items = computed(() => props.profile === 'pcos' ? pcosItems : prepItems)

const openModal = (item: InfoItem) => {
  selectedItem.value = item
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  selectedItem.value = null
  document.body.style.overflow = ''
}
</script>

<template>
  <div class="animate-fade-in">
    <!-- Section Header -->
    <div class="mb-10 flex items-center gap-4">
      <div class="h-10 w-1.5 bg-gray-700 rounded-full"></div>
      <h3 class="text-2xl font-bold text-gray-700">
        {{ profile === 'pcos' ? 'Señales que acompaña el SOP' : 'Fundamentos de Prevención' }}
      </h3>
    </div>

    <!-- Cards Grid -->
    <div class="flex flex-wrap justify-center gap-8">
      <div 
        v-for="item in items" 
        :key="item.id"
        @click="openModal(item)"
        class="group relative card rounded-3xl p-8 border-2 border-white/50 shadow-sm hover:shadow-soft-lg hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden flex-[1_1_300px] max-w-[360px] w-full"
        :class="item.colorClass"
      >
        <!-- Background Accent -->
        <div class="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

        <div class="relative z-10">
          <!-- Icon -->
          <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md transition-transform group-hover:rotate-6', item.iconContainer]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
            </svg>
          </div>

          <!-- Content -->
          <h4 class="text-xl font-bold text-gray-700 mb-3 tracking-tight">{{ item.title }}</h4>
          <p class="text-gray-600 leading-relaxed text-sm mb-6 line-clamp-3">
            {{ item.text }}
          </p>

          <!-- Interaction Prompt -->
          <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-600 transition-colors">
            Explorar detalle
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal System -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="isModalOpen && selectedItem" 
          class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/10 backdrop-blur-md"
          @click.self="closeModal"
        >
          <div 
            class="bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl border-4 relative animate-pop-up"
            :class="selectedItem.borderClass"
          >
            <!-- Close Button -->
            <button 
              @click="closeModal"
              class="absolute top-6 right-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Modal Content -->
            <div class="p-10">
              <div class="flex items-center gap-5 mb-8">
                <div :class="['w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-lg', selectedItem.iconContainer]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="selectedItem.icon" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-black text-gray-700 leading-tight">{{ selectedItem.title }}</h3>
                  <div class="h-1 w-12 bg-gray-100 rounded-full mt-2"></div>
                </div>
              </div>

              <!-- Content Body -->
              <div class="space-y-6">
                <p class="text-gray-500 font-medium italic border-l-4 border-gray-100 pl-4 leading-relaxed">
                  "{{ selectedItem.text }}"
                </p>
                <div class="bg-gray-50 rounded-2xl p-6">
                  <h5 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Impacto en la Salud</h5>
                  <p class="text-gray-700 leading-relaxed">
                    {{ selectedItem.modalDetail }}
                  </p>
                </div>
              </div>

              <!-- Modal Footer -->
              <div class="mt-10 flex justify-end">
                <button 
                  @click="closeModal"
                  class="px-8 py-3 bg-gray-700 text-white rounded-2xl font-bold shadow-soft hover:bg-gray-800 transition-all text-sm"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-pop-up {
  animation: popUp 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes popUp {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Modal Transitions */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
