<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, inject} from "vue";

const route = useRoute()
const content = inject("content")
const currentKey = computed(() => {
  if (route.params?.key)
    return (route.params.key as string)
        .slice(0, -5)
        .replace(/-/g, '_')
})
</script>

<template>
  <div>{{route.params.key}}</div>
  <div v-if="currentKey">{{content?.[currentKey]}}</div>
</template>

<style scoped>

</style>