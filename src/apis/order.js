import httpInstance from '@/utils/http'

//获取生成的订单信息
export function getOrderInfoAPI(){
   return httpInstance.get('/member/order/pre')
}

//提交订单
export function createOrderAPI(order){
    return httpInstance.post('/member/order', order)
}

//获取支付订单
export function getPayOrderAPI(id){
    return httpInstance.get(`/member/order/${id}`)
}