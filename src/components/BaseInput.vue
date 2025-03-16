<script setup lang="ts">
import {shallowRef} from "vue";

const searchQuery = shallowRef<string>('')
</script>

<template>
  <input
      v-model.trim="searchQuery"
      class="border"
      type="text"
      @change="$emit('update:searchQuery', searchQuery)"
  />
</template>

<style scoped>

</style>