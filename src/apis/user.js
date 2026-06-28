import httpInstance from '@/utils/http'

export function loginAPI({ account, password } ){   
    return httpInstance.post('/login',{ account, password } );
}