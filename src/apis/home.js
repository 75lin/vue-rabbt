import httpInstance from '@/utils/http'

export function getBannerAPI(){
   return httpInstance.get('/home/banner');
}

export function getHomeNewAPI(){
   return httpInstance.get('/home/new',{
      params:{
         limit: 4,
      }
   });
}

export function getHomeHotAPI(){
   return httpInstance.get('/home/hot');
}

export function getHomeProductAPI(){
   return httpInstance.get('/home/goods')
}