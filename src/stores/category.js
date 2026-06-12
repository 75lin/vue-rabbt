import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout';

export const useCategoryStore = defineStore('category',()=>{
    //定义state
    const categoryList = ref([]);

    //action
    const getCategory = async ()=>{
        const res = await getCategoryAPI();
        categoryList.value = res.result;
    }

    return {
        categoryList,
        getCategory
    }
})
