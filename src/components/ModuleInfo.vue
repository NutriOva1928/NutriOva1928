<script setup lang="ts">
defineProps<{
  profile: 'pcos' | 'no-pcos'
}>()

const pcosContent = {
  title: '¿Qué es el Síndrome de Ovario Poliquístico (SOP)?',
  description: 'El SOP es un trastorno endocrino que afecta entre el 5-10% de las mujeres en edad reproductiva. Se caracteriza por:',
  features: [
    {
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Desequilibrio hormonal',
      text: 'Niveles elevados de andrógenos (hormonas masculinas) que pueden causar síntomas como acné, hirsutismo y alopecia.'
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Ciclos menstruales irregulares',
      text: 'Períodos menstruales infrecuentes, prolongados o ausentes debido a ciclos anovulatorios (sin ovulación).'
    },
    {
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      title: 'Resistencia a la insulina',
      text: 'Hasta el 70% de las mujeres con SOP presentan resistencia a la insulina, lo que aumenta el riesgo de diabetes tipo 2.'
    },
    {
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      title: 'Impacto emocional',
      text: 'El SOP puede afectar la salud mental, aumentando el riesgo de ansiedad y depresión debido a los cambios hormonales y físicos.'
    }
  ],
  nutritionRole: 'La nutrición juega un rol crucial en el manejo del SOP. Una alimentación antiinflamatoria, balanceada y de bajo índice glucémico puede ayudar a regular la insulina, mejorar la ovulación y reducir síntomas.'
}

const noPcosContent = {
  title: 'Salud Hormonal Femenina',
  description: 'El equilibrio hormonal es fundamental para el bienestar integral de la mujer. Conocer cómo funciona tu sistema endocrino te empodera para cuidarlo mejor:',
  features: [
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Ciclo menstrual saludable',
      text: 'Un ciclo regular (21-35 días) es señal de un sistema hormonal equilibrado, con ovulación predecible y niveles hormonales estables.'
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Hormonas clave',
      text: 'Estrógeno, progesterona, testosterona y cortisol trabajan en armonía para regular el estado de ánimo, energía, metabolismo y fertilidad.'
    },
    {
      icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
      title: 'Prevención proactiva',
      text: 'Nutrición adecuada, ejercicio regular, gestión del estrés y sueño reparador son la base para prevenir desequilibrios hormonales.'
    },
    {
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      title: 'Conciencia corporal',
      text: 'Observar señales como energía, calidad del sueño, estado de ánimo y regularidad menstrual te permite identificar desequilibrios tempranos.'
    }
  ],
  nutritionRole: 'Una alimentación rica en nutrientes, antioxidantes y grasas saludables, junto con hábitos conscientes, son la base para mantener tu sistema hormonal funcionando óptimamente a lo largo de toda tu vida.'
}
</script>

<template>
  <div class="space-y-8">
    <!-- Contenido según perfil -->
    <template v-if="profile === 'pcos'">
      <div class="card">
        <h3 class="text-2xl font-bold text-lavender-800 mb-4">{{ pcosContent.title }}</h3>
        <p class="text-gray-700 leading-relaxed mb-6">{{ pcosContent.description }}</p>
        
        <div class="grid md:grid-cols-2 gap-4">
          <div 
            v-for="(feature, index) in pcosContent.features" 
            :key="index"
            class="bg-lavender-50/50 rounded-xl p-4 border border-lavender-100 hover:border-lavender-300 transition-colors duration-300"
          >
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-10 h-10 bg-lavender-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-lavender-800 mb-1">{{ feature.title }}</h4>
                <p class="text-sm text-gray-600 leading-relaxed">{{ feature.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-gradient-to-br from-sage-50 to-lavender-50 border-sage-200">
        <div class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sage-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>
            <h4 class="font-semibold text-sage-800 mb-2 text-lg">El Rol de la Nutrición</h4>
            <p class="text-gray-700 leading-relaxed">{{ pcosContent.nutritionRole }}</p>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="card">
        <h3 class="text-2xl font-bold text-sage-800 mb-4">{{ noPcosContent.title }}</h3>
        <p class="text-gray-700 leading-relaxed mb-6">{{ noPcosContent.description }}</p>
        
        <div class="grid md:grid-cols-2 gap-4">
          <div 
            v-for="(feature, index) in noPcosContent.features" 
            :key="index"
            class="bg-sage-50/50 rounded-xl p-4 border border-sage-100 hover:border-sage-300 transition-colors duration-300"
          >
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-10 h-10 bg-sage-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-sage-800 mb-1">{{ feature.title }}</h4>
                <p class="text-sm text-gray-600 leading-relaxed">{{ feature.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-gradient-to-br from-lavender-50 to-sage-50 border-lavender-200">
        <div class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-lavender-600 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>
            <h4 class="font-semibold text-lavender-800 mb-2 text-lg">El Rol de la Nutrición</h4>
            <p class="text-gray-700 leading-relaxed">{{ noPcosContent.nutritionRole }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
