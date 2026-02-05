<script setup lang="ts">
import NutricionSop from './NutricionSop.vue'
import NutricionGeneral from './NutricionGeneral.vue'

defineProps<{
  profile: 'pcos' | 'no-pcos'
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- Componente especializado para SOP -->
    <NutricionSop v-if="profile === 'pcos'" />

    <!-- Componente para usuarios sin SOP (Nutrición General) -->
    <NutricionGeneral v-else />
  </div>
</template>
