<script setup>
defineProps({
    title: {
        type: String,
    },
    subTitle: {
        type: String,
    }
})
</script>

<template>
    <div class="home-panel">
        <div class="container">
            <div class="head">
                <h3>{{ title }}<small>{{ subTitle }}</small></h3>
            </div>
            
            <div class="body">


                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home-panel{
    background: #fff;

    .head{
        padding: 40px 0;
        display: flex;
        align-items: flex-start;

        h3{
            flex:1;
            font-size:32px;
            font-weight: normal;
            height: 35px;
            line-height: 35px;
        }
        
        small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }

    .body{
        display: flex;
        .content{
            display: flex;
            justify-content: center;
            align-items: center;
            flex:1;
            height: 200px;
            background: #eee;
        }
    }
}
</style>