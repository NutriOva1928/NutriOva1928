<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface MetricItem {
  name: string
  value: number
  unit: string
  status: 'optimal' | 'warning' | 'critical'
}

const metrics = ref<MetricItem[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Mock fetch function (replace with actual API call)
const fetchMetrics = async () => {
  loading.value = true
  try {
    // TODO: Connect to backend endpoint that uses ZabbixManager to fetch health telemetry
    // Example: fetch('/api/health/indicators/top') where the backend parses history data
    
    // Simulating delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock Data simulating the "Top Indicators" parser result
    // Logic: Parse history (PID->ID, User->Category, Process->Indicator, Value->Level)
    // Filtered by last 3 minutes
    metrics.value = [
      { name: 'Nivel de Glucosa', value: 92, unit: 'mg/dL', status: 'optimal' },
      { name: 'Actividad Física', value: 45, unit: 'min', status: 'optimal' },
      { name: 'Calidad de Sueño', value: 6.5, unit: 'hrs', status: 'warning' },
      { name: 'Nivel de Estrés', value: 78, unit: '/100', status: 'warning' },
      { name: 'Hidratación', value: 1.2, unit: 'L', status: 'critical' },
    ]
  } catch (e) {
    error.value = "Error al cargar indicadores de salud en tiempo real."
  } finally {
    loading.value = false
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'optimal': return 'bg-nutriova-green-100 text-nutriova-green-700 border-nutriova-green-200'
    case 'warning': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
    case 'critical': return 'bg-red-50 text-red-700 border-red-200'
    default: return 'bg-gray-50 text-gray-700'
  }
}

onMounted(() => {
  fetchMetrics()
})
</script>

<template>
  <div class="w-full">
    <div class="mb-8 text-center max-w-2xl mx-auto">
      <h3 class="text-2xl font-bold text-nutriova-green-900 mb-2">Indicadores de Salud en Tiempo Real</h3>
      <p class="text-nutriova-earth-600">
        Monitoreo de factores críticos para el tratamiento del <span class="font-semibold text-nutriova-terracotta-600">Síndrome de Ovario Poliquístico</span>.
      </p>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-nutriova-terracotta-500"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 p-4 rounded-xl border border-red-100 text-red-600">
      {{ error }}
    </div>

    <div v-else class="flex flex-col gap-6 max-w-5xl mx-auto">
      <!-- Fila Superior: 3 cuadros -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="(metric, index) in metrics.slice(0, 3)" 
          :key="index"
          class="bg-white rounded-2xl p-6 shadow-sm border border-nutriova-earth-100 hover:shadow-md transition-shadow relative overflow-hidden"
        >
          <div class="flex justify-between items-start mb-4">
            <span class="font-medium text-nutriova-earth-800">{{ metric.name }}</span>
            <span :class="['text-xs px-2 py-1 rounded-full border font-semibold', getStatusColor(metric.status)]">
              {{ metric.status === 'optimal' ? 'Óptimo' : metric.status === 'warning' ? 'Revisar' : 'Crítico' }}
            </span>
          </div>
          
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-bold text-nutriova-green-600">{{ metric.value }}</span>
            <span class="text-sm text-nutriova-earth-500 font-medium">{{ metric.unit }}</span>
          </div>

          <!-- Progress Bar Visual -->
          <div class="mt-4 h-2 w-full bg-nutriova-earth-50 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-1000 ease-out"
              :class="{
                'bg-nutriova-green-500': metric.status === 'optimal',
                'bg-nutriova-terracotta-400': metric.status === 'warning',
                'bg-red-500': metric.status === 'critical'
              }"
              :style="{ width: `${metric.value}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Fila Inferior: 2 cuadros centrados -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-2/3 mx-auto w-full">
        <div 
          v-for="(metric, index) in metrics.slice(3, 5)" 
          :key="index + 3"
          class="bg-white rounded-2xl p-6 shadow-sm border border-nutriova-earth-100 hover:shadow-md transition-shadow relative overflow-hidden"
        >
          <div class="flex justify-between items-start mb-4">
            <span class="font-medium text-nutriova-earth-800">{{ metric.name }}</span>
            <span :class="['text-xs px-2 py-1 rounded-full border font-semibold', getStatusColor(metric.status)]">
              {{ metric.status === 'optimal' ? 'Óptimo' : metric.status === 'warning' ? 'Revisar' : 'Crítico' }}
            </span>
          </div>
          
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-bold text-nutriova-green-600">{{ metric.value }}</span>
            <span class="text-sm text-nutriova-earth-500 font-medium">{{ metric.unit }}</span>
          </div>

          <!-- Progress Bar Visual -->
          <div class="mt-4 h-2 w-full bg-nutriova-earth-50 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-1000 ease-out"
              :class="{
                'bg-nutriova-green-500': metric.status === 'optimal',
                'bg-nutriova-terracotta-400': metric.status === 'warning',
                'bg-red-500': metric.status === 'critical'
              }"
              :style="{ width: `${metric.value}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
