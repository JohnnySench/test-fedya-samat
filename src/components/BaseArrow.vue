<script setup lang="ts">
import ArrowDown from '@/components/icons/ArrowDown.vue'
import ArrowRight from '@/components/icons/ArrowRight.vue';

defineProps<{isOpen: boolean}>()
</script>

<template>
  <ArrowDown v-if="!isOpen" class="hover:fill-blue-600"/>
  <ArrowRight v-else class="hover:fill-blue-600"/>
</template>

<style scoped>

</style>