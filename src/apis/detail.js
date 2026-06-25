import httpInstance from '@/utils/http'

// 获取商品详情页数据
export function getDetailAPI(id){
   return httpInstance.get('/goods',{
    params: { id },
   });
}