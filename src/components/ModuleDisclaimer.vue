<script setup lang="ts">
</script>

<template>
  <div class="space-y-6">
    <!-- Main Disclaimer Card -->
    <div class="card bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
      <div class="flex items-start gap-4 mb-6">
        <div class="flex-shrink-0 w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-red-800 mb-3">Aviso Legal Importante</h3>
          <p class="text-gray-700 leading-relaxed text-lg">
            Esta plataforma es una <strong>herramienta educativa</strong> desarrollada como parte de una tesis de grado en el área de Nutrición y Salud.
          </p>
        </div>
      </div>

      <div class="bg-white/70 rounded-xl p-6 space-y-4">
        <div class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p class="text-gray-800 leading-relaxed">
            <strong>Esta plataforma NO sustituye el diagnóstico médico profesional.</strong> Si sospechas que tienes SOP o cualquier otro trastorno hormonal, debes consultar con un médico especialista (ginecólogo/a, endocrinólogo/a).
          </p>
        </div>

        <div class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p class="text-gray-800 leading-relaxed">
            <strong>No reemplaza la orientación nutricional individualizada.</strong> Cada persona tiene necesidades únicas. Trabaja con un/a nutricionista calificado/a para crear un plan personalizado.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p class="text-gray-800 leading-relaxed">
            <strong>La información es general y educativa.</strong> No debe ser interpretada como consejo médico, diagnóstico o tratamiento específico para tu caso particular.
          </p>
        </div>
      </div>
    </div>

    <!-- What This Platform IS -->
    <div class="card bg-gradient-to-br from-sage-50 to-lavender-50 border-sage-200">
      <div class="flex items-start gap-4 mb-4">
        <div class="flex-shrink-0 w-12 h-12 bg-sage-500 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div class="flex-1">
          <h4 class="text-xl font-bold text-sage-800 mb-3">Lo que SÍ ofrece esta plataforma:</h4>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start gap-2">
              <span class="text-sage-600 font-bold mt-1">•</span>
              <span>Información educativa basada en evidencia científica sobre SOP y salud hormonal</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-sage-600 font-bold mt-1">•</span>
              <span>Guías generales de nutrición y hábitos saludables</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-sage-600 font-bold mt-1">•</span>
              <span>Herramientas de autorreflexión y conciencia sobre tu bienestar</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-sage-600 font-bold mt-1">•</span>
              <span>Recursos para iniciar conversaciones informadas con profesionales de salud</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Academic Context -->
    <div class="card bg-white/80">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 w-12 h-12 bg-lavender-500 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>
        <div class="flex-1">
          <h4 class="text-lg font-semibold text-lavender-800 mb-2">Contexto Académico</h4>
          <p class="text-gray-700 leading-relaxed">
            Esta aplicación fue desarrollada como parte de un trabajo de investigación académica en Nutrición y Salud. 
            Su objetivo es democratizar el conocimiento sobre el SOP y empoderar a las mujeres con información de calidad 
            para que puedan tomar decisiones informadas sobre su salud, siempre en conjunto con profesionales calificados.
          </p>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="card bg-gradient-to-r from-lavender-500 to-sage-500 text-white text-center">
      <h4 class="text-2xl font-bold mb-3">Tu salud es una prioridad</h4>
      <p class="text-white/95 leading-relaxed mb-4">
        Si después de explorar esta plataforma tienes preguntas o inquietudes sobre tu salud hormonal, 
        te animamos a que consultes con profesionales de la salud calificados. <strong>Tu bienestar merece atención experta y personalizada.</strong>
      </p>
      <div class="flex items-center justify-center gap-2 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span>Con información y acompañamiento profesional, tu camino hacia el bienestar hormonal es posible</span>
      </div>
    </div>

    <!-- Legal Footer -->
    <div class="text-center text-xs text-gray-500 mt-6 pb-4">
      <p>© 2026 Nutriova | Proyecto de Tesis | Solo fines educativos</p>
      <p class="mt-1">Última actualización: Enero 2026</p>
    </div>
  </div>
</template>
