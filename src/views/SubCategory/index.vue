<script setup>
import { getSubCategoryDataAPI } from '@/apis/category';
import { getSubCategoryAPI } from '@/apis/category';
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import GoodsItem from '../Home/components/GoodsItem.vue';

//获取面包屑导航渲染数据
const route = useRoute();
const subCategoryData = ref({})
const getSubCategoryData = async (id)=>{
    const res = await getSubCategoryDataAPI(id);
    subCategoryData.value = res.result;
}

//获取基础列表数据
const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'orderNum'
})
  
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = res.result.items
}

// tab切换回调
const tabChange = () => {
  reqData.value.page = 1
  getGoodList()
}

const disabled = ref(false)

const loadMore =async ()=>{
    reqData.value.page++;
    const res = await getSubCategoryAPI(reqData.value)
    goodList.value = [...goodList.value, ...res.result.items]
    // 加载完毕 停止监听
    if (res.result.items.length === 0) {
    disabled.value = true
    console.log('已全部加载');
    }
}

onMounted(
    ()=>{ 
        getSubCategoryData(route.params.id);
        getGoodList()
    }
);
</script>

<template>
<!-- 二级分类数据内容 -->
<div class="container">
    <!-- 面包屑导航 -->
     <div class="bread-container">
        <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: `/category/${subCategoryData.parentId}` }">{{subCategoryData.parentName }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ subCategoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
     </div>

     <!-- 内容区 -->
    <div class="sub-container">
        <el-tabs v-model="reqData.sortField" @tab-change="tabChange()"> 
            <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
            <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
            <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
        </el-tabs>
        <div class="goodsList" v-infinite-scroll="loadMore" :infinite-scroll-disabled="disabled" >
            <GoodsItem v-for="good in goodList" :key="good.id" :good="good" />
        </div>
    </div>
</div>
</template>

<style>
.goodsList{
    display: flex;
    justify-content:space-around;
    flex-wrap: wrap;
    
}
</style>