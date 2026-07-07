import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart',()=>{
    //定义state
    const cartList = ref([]);

    //action
    const addCart =(goods)=>{
        const item = cartList.value.find((item)=> goods.skuId === item.skuId)
        if(item){
            item.count++;
        }else{
            cartList.value.push(goods)
        }
    }

    return {
        cartList,
        addCart
    }
},{
    persist: true,
})
