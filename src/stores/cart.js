import { ref,computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { insertCartAPI , getCartListAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart',()=>{
    //定义state
    const cartList = ref([]);

    const userStore = useUserStore();
    //登录状态
    const isLogin = computed(() => userStore.userInfo.token)

    //action
    const addCart = async (goods)=>{
        const { skuId, count} = goods;

        if(isLogin.value){
            //已登录
            await insertCartAPI({skuId,count})
            const res = await getCartListAPI();
            console.log(res)
        }else {
            //未登录
                const item = cartList.value.find((item)=> goods.skuId === item.skuId)
                if(item){
                    item.count = item.count + goods.count;
                }else{
                    cartList.value.push(goods)
                }
        }
    }

    const deleteCart =(skuId)=>{
        const index = cartList.value.findIndex((item)=>item.skuId === skuId);
        cartList.value.splice(index,1)
        //cartList.value = cartList.value.filter(item=>item.skuId!==skuId)
    }

    //单选商品
    const toggleSelecte =(skuId,selected)=>{
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    //全选商品
    const allSelect =(selected)=>{
        cartList.value.forEach(item=>item.selected = selected)
    }

    //只有所有都选中，isAll才为true
    const isAll = computed(()=>cartList.value.every(item=>item.selected))

    //计算属性
    const allCount = computed(()=>cartList.value.reduce((allCount, item)=>item.count+allCount,0));
    const allPrice = computed(()=>cartList.value.reduce((allPrice, item)=>item.count*item.price+allPrice,0));
    
    //已选数组

    // 已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    // 已选择商品价钱合计
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

    return {
        cartList,
        isAll,
        addCart,
        deleteCart,
        toggleSelecte,
        allSelect,
        allCount,
        allPrice,
        selectedCount,
        selectedPrice,
    }
},{
    persist: true,
})
