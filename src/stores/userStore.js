import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user';
import { useCartStore } from './cartStore';
import { ref } from 'vue'

export const useUserStore = defineStore('userInfo',()=>{
    //state
    const userInfo = ref({});

    //获取用户信息
    const getUserInfo = async ({ account, password } )=>{
        let res = await loginAPI({ account, password });
        userInfo.value = res.result;

        //更新购物车列表
        useCartStore().mergeCart();
    }

    const cleanUserInfo = ()=>{
        userInfo.value = {};
        useCartStore().clearCart();
    }
    return {
        userInfo, getUserInfo,cleanUserInfo
    }
},{
    persist: true
})