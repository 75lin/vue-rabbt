import { dayjs } from "dayjs";
import { computed, onUnmounted, ref } from "vue";

export function useCountDown(){

    const time = ref(0) 
    let timer = null;

    const formatTime = computed(()=>{
        let min = Math.floor(time.value/60)
        let second = time.value - min*60
        return `${min}分${second}秒`
    })

    const start = (countdown)=>{
        time.value = countdown;
        timer = setInterval(()=>time.value--,1000);
    }

    onUnmounted(()=>{
        timer && clearInterval(timer);
    })

    return {
        formatTime,
        start,
    }
}