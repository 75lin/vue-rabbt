import httpInstance from '@/utils/http'

// 获取分类数据
export function getCategoryDataAPI(id){
   return httpInstance.get('/category',{
    params: { id },
   });
}

//获取二级分类数据
export function getSubCategoryDataAPI(id){
   return httpInstance.get('/category/sub/filter',{
    params: { id },
   });
}

/**
 * @description: 获取二级分类筛选数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
   return httpInstance.post('/category/goods/temporary', data)
}