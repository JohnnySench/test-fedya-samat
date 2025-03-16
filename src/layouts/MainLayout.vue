<script setup lang="ts">
import BaseHeader from "@/components/BaseHeader.vue";
import BaseNavigation from "@/components/BaseNavigation.vue";
import BaseInput from "@/components/BaseInput.vue";
import {provide} from "vue";
import {useTreeContent} from '@/composables/useTreeContent'


const {
  filteredTreeContent, content, setSearchQuery, searchQuery, activePaths
} = useTreeContent()

provide("content", content)
provide("activePaths", activePaths)
</script>

<template>
  <div class="w-screen h-screen overflow-hidden flex flex-col gap-5 p-10">
    <BaseHeader />
    <div class="flex flex-row gap-5 h-full overflow-hidden">

      <div class="col-span-3 h-full border overflow-auto w-[300px]">
        <BaseInput @update:search-query="setSearchQuery" class="block mx-auto my-5"/>
        <div v-for="(tree, index) in filteredTreeContent" :key="index">
          <BaseNavigation :page="tree" :level="0" :search-query="searchQuery"/>
        </div>
      </div>

      <div class="border w-full">
        <RouterView />
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>