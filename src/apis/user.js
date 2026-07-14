import httpInstance from '@/utils/http'

export function loginAPI({ account, password } ){   
    return httpInstance.post('/login',{ account, password } );
}

//获取用户偏好
export function getPerferAPI({limit = 4}){
    return httpInstance.get('/goods/relevant',{
        params: {
            limit,
        }
    })
}


/**
 * 
 * @param {*} params:{
 *          orderState: 1; 对应的订单状态
 *  page：1；
 *  pageSize: 2;
 * }
 * 
 */
//获取用户订单列表
export function getUserOrder(params){
    return httpInstance({
    url:'/member/order',
    method:'GET',
    params,
    timeout: 20000
  })
}