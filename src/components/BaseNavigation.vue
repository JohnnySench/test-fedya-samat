<script setup lang="ts">
import {computed, defineProps, inject, onMounted, shallowRef, watchEffect, type ShallowRef} from 'vue';
import {useRoute, useRouter} from "vue-router";
import type {TRecursivePage} from '@/shared/types'
import {stringIncludes} from '@/shared/helper'
import BaseArrow from "@/components/BaseArrow.vue";
import {formatRouteKey} from '@/shared/helper'

interface IProps {
  page: TRecursivePage;
  level: number;
  searchQuery: string;
}
const props = defineProps<IProps>()

const visible = shallowRef(false)

const router = useRouter()
const redirectToArticle = async () => {
  await router.push({
    name: 'article-key',
    params: {
      key: props.page.link
    }
  })
}

const route = useRoute()
const getRouteName = computed(() => {
  if (route.params.key) {
    return formatRouteKey((route.params.key as string))
  }

})

const nextToggleVisible = shallowRef(true)

const isMatchesSearch = computed(() => stringIncludes(props.page.name, props.searchQuery))

watchEffect(() => {
  if (props.searchQuery && isMatchesSearch.value) {
    nextToggleVisible.value = false
  }
  if (nextToggleVisible.value && props.searchQuery) {
    visible.value = true
  }

  if (!props.searchQuery) {
    nextToggleVisible.value = true
    visible.value = false
  }
})


const activePaths = inject('activePaths') as ShallowRef<string[]>
const checkAndSetPaths = () => {
  if (activePaths.value?.length > 1 && activePaths.value?.includes(props.page.key)) {
    visible.value = true
  }
}
onMounted(() => {
  checkAndSetPaths()
})
</script>

<template>
  <div>
    <div class="flex flex-row items-center relative" >
      <BaseArrow
          v-if="page?.childPageKeys?.length"
          :is-open="!visible"
          :style="{position: 'absolute', left: `${level * 20}px`}"
          :class="['cursor-pointer']"
          @click="visible = !visible"
      />
      <div
          :style="{ marginLeft: `${(level + 1) * 20}px` }"
          :class="
          [
            'cursor-pointer  hover:text-blue-700',
            {'text-blue-700 font-bold': page?.key === getRouteName},
            {'text-blue-700 font-bold': searchQuery && isMatchesSearch}
          ]"
          @click="redirectToArticle"
      >
        {{ page.name }}
      </div>
    </div>

    <div v-if="page?.childPageKeys?.length && visible">
      <BaseNavigation
          v-for="(child) in page.childPageKeys"
          :key="child.key"
          :page="child"
          :level="level + 1"
          :search-query="searchQuery"
      />
    </div>
  </div>
</template>

<style scoped>

</style>