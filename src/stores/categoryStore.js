import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout';

//请求并获取导航栏一级分类数据
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
