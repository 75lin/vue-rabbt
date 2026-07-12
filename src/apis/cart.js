//接口购物车封装
import httpInstance from '@/utils/http'


//加入购物车
export function insertCartAPI({ skuId, count }){
   return httpInstance.post('/member/cart',{
    skuId,count
   })
}

//获取购物车列表
export function getCartListAPI(){
    return httpInstance.get('/member/cart')
}

// 删除购物车
export function deleteCartAPI(ids){
   return httpInstance.delete('/member/cart',{
      data:{
         ids
      }
   })
}

//合并本地购物车,cartList为对象数组[{skuId,selected,count}]
export function mergeCartAPI(cartList){
   return httpInstance.post('/member/cart/merge',cartList)
}