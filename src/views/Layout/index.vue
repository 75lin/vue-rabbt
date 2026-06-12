<template>
    <LayoutNav />
    <LayoutHeaderFixed />
    <LayoutHeader />
    <RouterView></RouterView>
    <LayoutFooter />
</template>
<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeaderFixed from './components/LayoutHeaderFixed.vue'
import { onMounted} from 'vue'
import { useCategoryStore} from '@/stores/category.js'

const categoryStore = useCategoryStore()

onMounted(()=>{
    categoryStore.getCategory();
})


</script>