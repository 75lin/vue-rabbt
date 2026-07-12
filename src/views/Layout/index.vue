<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeaderFixed from './components/LayoutHeaderFixed.vue'
import { onMounted} from 'vue'
import { useCategoryStore} from '@/stores/categoryStore.js'

const categoryStore = useCategoryStore()

onMounted(()=>{
    categoryStore.getCategory();
})
</script>

<template>
    <!-- 首页布局 -->
    <LayoutNav />
    <LayoutHeaderFixed />
    <LayoutHeader />
    <RouterView></RouterView>
    <LayoutFooter />
</template>