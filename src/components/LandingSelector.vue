<script setup lang="ts">
defineEmits<{
  selectProfile: [profile: 'pcos' | 'no-pcos']
}>()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="max-w-4xl w-full">
      <!-- Hero Section -->
      <div class="text-center mb-12 animate-fade-in">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-lavender-400 to-sage-400 rounded-3xl mb-6 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold title-gradient mb-4">
          NutriHealth SOP
        </h1>
        <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Tu guía educativa sobre nutrición y hábitos saludables para el equilibrio hormonal
        </p>
      </div>

      <!-- Selection Cards -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- Card: Con diagnóstico SOP -->
        <button
          @click="$emit('selectProfile', 'pcos')"
          class="card text-left group hover:border-lavender-300 active:scale-95"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-lavender-500 to-lavender-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-lavender-700 mb-2 group-hover:text-lavender-800">
                Tengo diagnóstico de SOP
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Información especializada sobre el Síndrome de Ovario Poliquístico, nutrición específica y estrategias de manejo.
              </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-lavender-400 group-hover:text-lavender-600 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        <!-- Card: Sin diagnóstico SOP -->
        <button
          @click="$emit('selectProfile', 'no-pcos')"
          class="card text-left group hover:border-sage-300 active:scale-95"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-sage-500 to-sage-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-sage-700 mb-2 group-hover:text-sage-800">
                No tengo diagnóstico de SOP
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Guía de salud hormonal general, nutrición preventiva y hábitos para el bienestar femenino integral.
              </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sage-400 group-hover:text-sage-600 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>

      <!-- Info Banner -->
      <div class="card bg-lavender-50/50 border-lavender-200">
        <div class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-lavender-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm text-gray-700 leading-relaxed">
            <span class="font-semibold">Importante:</span> Esta plataforma es una herramienta educativa desarrollada como parte de una tesis de grado. No sustituye la consulta médica profesional.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
