<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, inject} from "vue";
import {formatRouteKey} from '@/shared/helper'

const route = useRoute()
const content = inject("content")
const currentKey = computed(() => {
  if (route.params?.key)
    return formatRouteKey(route.params.key as string)
})
</script>

<template>
  <div>{{route.params.key}}</div>
  <div v-if="currentKey">{{content?.[currentKey]}}</div>
</template>

<style scoped>

</style>