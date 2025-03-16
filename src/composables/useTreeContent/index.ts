import {computed, onBeforeMount, ref, shallowRef, watchEffect} from "vue";
import {getContent} from '@/shared/api'
import type {IPages, TRootPages} from '@/shared/types'
import {useRoute} from "vue-router";
import {formatRouteKey} from '@/shared/helper'
import {findPath, filterTree, createTree} from './utils.ts'

export const useTreeContent = () => {
    const content = ref<IPages | null>(null)
    let rootPages: TRootPages | null = null
    const fetchContent = async () => {
        try {
            const { pages, rootLevelKeys } = await getContent()
            rootPages = rootLevelKeys
            content.value = pages
        } catch (e) {
            console.error(e)
        }
    }

    const getTreeContent = computed(() => {
        if (content.value)
            return createTree(content.value, rootPages as TRootPages)
        return null
    })


    const searchQuery = shallowRef<string>('')
    const setSearchQuery = (str: string) => {
        searchQuery.value = str
    }

    const filteredTreeContent = computed(() => {
        if (!getTreeContent.value) return [];
        return filterTree(getTreeContent.value, searchQuery.value);
    });

    const route = useRoute()
    const activePaths = shallowRef<string[] | null>(null)
    watchEffect(() => {
        if (filteredTreeContent.value?.length && route?.params?.key) {
            activePaths.value = findPath(filteredTreeContent.value, formatRouteKey(route.params.key as string));
        }
    });


    onBeforeMount(async() => {
        await fetchContent()
    })

    return {
        getTreeContent,
        filteredTreeContent,
        setSearchQuery,
        searchQuery,
        content,
        activePaths,
    }
}