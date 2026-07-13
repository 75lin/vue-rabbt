import httpInstance from '@/utils/http'

//获取订单信息
export function getOrderInfoAPI(){
   return httpInstance.get('/member/order/pre')
}

//提交订单
export function createOrderAPI(order){
    return httpInstance.post('/member/order', order)
}