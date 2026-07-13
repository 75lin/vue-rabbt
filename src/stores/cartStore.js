import { ref,computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import { insertCartAPI , getCartListAPI, deleteCartAPI,mergeCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart',()=>{
    //定义state
    const cartList = ref([]);

    const userStore = useUserStore();
    //登录状态
    const isLogin = computed(() => userStore.userInfo.token)

    //action
    //添加商品
    const addCart = async (goods)=>{
        const { skuId, count} = goods;

        if(isLogin.value){
            //已登录
            await insertCartAPI({skuId,count})
            updateCartList();
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

    //获取接口购物车列表,更新cartList
    const updateCartList = async ()=>{
        const res = await getCartListAPI();
        cartList.value = res.result
    }
    
    //删除商品
    const deleteCart =async (skuId)=>{
        if(isLogin.value){
            const ids = [skuId]
            console.log(ids)
            await deleteCartAPI(ids)
            updateCartList();
        }else{
            const index = cartList.value.findIndex((item)=>item.skuId === skuId);
            cartList.value.splice(index,1)
            //cartList.value = cartList.value.filter(item=>item.skuId!==skuId)
        }
    }

    //合并本地购物车列表
    const mergeCart =async ()=>{
        await mergeCartAPI(cartList.value.map(item=>({ 
            skuId: item.skuId,
            selected: item.selected,
            count: item.countm,
        })))

        updateCartList();
    }

    //退出登录清除商品
    const clearCart = ()=>{
        cartList.value = []
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
        mergeCart,
        clearCart,
        updateCartList,
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
