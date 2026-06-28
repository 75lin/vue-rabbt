import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user';
import { ref } from 'vue'

export const useUserStore = defineStore('userInfo',()=>{
    //state
    const userInfo = ref({});

    const getUserInfo = async ({ account, password } )=>{
        let res = await loginAPI({ account, password });
        userInfo.value = res.result;
    }

    const cleanUserInfo = ()=>{
        userInfo.value = {}
    }
    return {
        userInfo, getUserInfo,cleanUserInfo
    }
},{
    persist: true
})