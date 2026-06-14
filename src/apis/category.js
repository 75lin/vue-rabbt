import httpInstance from '@/utils/http'

export function getCategoryDataAPI(id){
   return httpInstance.get('/category',{
    params: { id },
   });
}