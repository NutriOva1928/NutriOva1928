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
        <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pastel-lilac-300 via-pastel-pink-200 to-pastel-mint-300 rounded-[2rem] mb-8 shadow-soft">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold title-gradient mb-4">
          Nutriova
        </h1>
        <p class="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Bienvenida a Nutriova, tu apoyo en el manejo del Síndrome de Ovario Poliquístico
        </p>
      </div>

      <!-- Pregunta Principal -->
      <div class="text-center mb-10">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
          ¿Tienes un diagnóstico médico de Síndrome de Ovario Poliquístico?
        </h2>
        <p class="text-gray-500">
          Selecciona tu situación para personalizar tu experiencia
        </p>
      </div>

      <!-- Selection Cards - Estilo Soft Pastel -->
      <div class="grid md:grid-cols-2 gap-8 mb-10">
        <!-- Card: Con diagnóstico SOP -->
        <button
          @click="$emit('selectProfile', 'pcos')"
          class="btn-profile-pcos text-left group"
        >
          <div class="flex flex-col items-center text-center">
            <!-- Icono con líneas finas -->
            <div class="w-20 h-20 bg-gradient-to-br from-pastel-lilac-200 to-pastel-lilac-300 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <span class="badge-pcos mb-4">CON DIAGNÓSTICO</span>
            
            <h3 class="text-xl font-semibold text-gray-700 mb-3">
              Tengo diagnóstico de Síndrome de Ovario Poliquístico
            </h3>
            
            <p class="text-gray-500 text-sm leading-relaxed mb-4">
              Contenido enfocado en <span class="font-medium text-pastel-lilac-600">acompañamiento y manejo</span> del síndrome.
            </p>
            
            <div class="space-y-2 text-left w-full">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-pastel-lilac-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Sensibilidad a la insulina
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-pastel-lilac-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Control de andrógenos
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-pastel-lilac-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Reducción de inflamación
              </div>
            </div>
            
            <div class="mt-6 flex items-center gap-2 text-pastel-lilac-500 font-medium group-hover:text-pastel-lilac-600">
              Comenzar
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </button>

        <!-- Card: Sin diagnóstico SOP -->
        <button
          @click="$emit('selectProfile', 'no-pcos')"
          class="btn-profile-nopcos text-left group"
        >
          <div class="flex flex-col items-center text-center">
            <!-- Icono con líneas finas -->
            <div class="w-20 h-20 bg-gradient-to-br from-pastel-mint-200 to-pastel-mint-300 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            
            <span class="badge-nopcos mb-4">SIN DIAGNÓSTICO</span>
            
            <h3 class="text-xl font-semibold text-gray-700 mb-3">
              No tengo diagnóstico de Síndrome de Ovario Poliquístico
            </h3>
            
            <p class="text-gray-500 text-sm leading-relaxed mb-4">
              Contenido enfocado en <span class="font-medium text-pastel-mint-600">prevención y optimización</span> de tu salud.
            </p>
            
            <div class="space-y-2 text-left w-full">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-pastel-mint-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Salud metabólica a largo plazo
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-pastel-mint-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Bienestar hormonal
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-pastel-mint-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Equilibrio energético
              </div>
            </div>
            
            <div class="mt-6 flex items-center gap-2 text-pastel-mint-500 font-medium group-hover:text-pastel-mint-600">
              Comenzar
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      <!-- Info Banner - Estilo suave -->
      <div class="bg-white rounded-3xl shadow-soft border border-gray-100 p-6">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pastel-sky-100 to-pastel-sky-200 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-600 leading-relaxed">
              <span class="font-semibold text-gray-700">Importante:</span> Esta plataforma es una herramienta educativa desarrollada como parte de una tesis de grado. No sustituye la consulta médica profesional.
            </p>
          </div>
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
