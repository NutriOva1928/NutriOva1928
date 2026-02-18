<script setup lang="ts">
import { ref } from 'vue';

interface EventItem {
  id: string;
  clock: string;
  name: string;
  severity: number; // 0-5
  hostname: string;
}

const events = ref<EventItem[]>([
  { id: '101', clock: '2026-02-16 10:30', name: 'Desayuno Saludable: Espinacas y Huevo', severity: 0, hostname: 'Usuario_Ana' },
  { id: '102', clock: '2026-02-15 14:00', name: 'Nivel de Energía Bajo (Fatiga)', severity: 2, hostname: 'Usuario_Ana' },
  { id: '103', clock: '2026-02-14 09:15', name: 'Ejercicio: Caminata 30min', severity: 0, hostname: 'Usuario_Maria' },
]);

const filters = ref({
  host: '',
  dateFrom: '',
  dateTill: ''
});

const severityLabel = (sev: number) => {
  if (sev === 0) return 'Registro';
  if (sev < 3) return 'Atención';
  return 'Alerta';
};

const severityClass = (sev: number) => {
  if (sev === 0) return 'bg-nutriova-green-50 text-nutriova-green-700 border-nutriova-green-100';
  if (sev < 3) return 'bg-nutriova-earth-100 text-nutriova-terracotta-600 border-nutriova-earth-200';
  return 'bg-red-50 text-red-600 border-red-100';
};
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <h3 class="text-2xl font-bold text-nutriova-terracotta-800">Historial de Eventos</h3>
      
      <!-- Filtros -->
      <div class="flex gap-2 mt-4 md:mt-0">
        <input 
          v-model="filters.dateFrom"
          type="date" 
          class="px-3 py-2 border border-nutriova-earth-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-nutriova-green-400"
        />
        <input 
          v-model="filters.host"
          type="text" 
          placeholder="Buscar Usuario..."
          class="px-3 py-2 border border-nutriova-earth-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-nutriova-green-400"
        />
        <button class="bg-nutriova-terracotta-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-nutriova-terracotta-600 transition-colors">
          Filtrar
        </button>
      </div>
    </div>

    <!-- Tabla / Lista -->
    <div class="bg-white rounded-xl shadow-sm border border-nutriova-earth-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-nutriova-earth-50 text-nutriova-earth-700 font-semibold text-sm uppercase tracking-wider">
            <tr>
              <th class="px-6 py-4 text-left">Fecha/Hora</th>
              <th class="px-6 py-4 text-left">Usuario</th>
              <th class="px-6 py-4 text-left">Evento</th>
              <th class="px-6 py-4 text-left">Tipo</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-nutriova-earth-100">
            <tr v-for="event in events" :key="event.id" class="hover:bg-nutriova-green-50/30 transition-colors">
              <td class="px-6 py-4 text-sm text-gray-600">{{ event.clock }}</td>
              <td class="px-6 py-4 text-sm font-medium text-nutriova-earth-800">{{ event.hostname }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ event.name }}</td>
              <td class="px-6 py-4">
                <span :class="['px-3 py-1 text-xs rounded-full border', severityClass(event.severity)]">
                  {{ severityLabel(event.severity) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
