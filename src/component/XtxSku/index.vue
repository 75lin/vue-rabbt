<script setup>
import { watchEffect,ref } from 'vue';
import getSubSet from './getSubSets'

const props = defineProps({
  goods:{
    type: Object,
    default: ()=>({specs: [],skus: []}),
  }
})

const emit = defineEmits(['change']);
//商品数据
const goods = ref({});

//更改选择的规格
const changeSku =(spec, value)=>{
    if(value.disabled) return;
    if(value.selected) {
        value.selected = false;
        return;
    }

    spec.values.forEach(valItem => {
        valItem.selected = valItem === value;
    });
    const pathMap = getPathMap(goods.value);
    updataDisableState(goods.value.specs,pathMap);
    getSkuObj(pathMap);
}

//获取有效字典路径
const getPathMap = (goods)=>{
    const pahtMap = {}
    const effectiveSkus = goods.skus.filter(sku=> sku.inventory > 0);
    effectiveSkus.forEach(sku=>{
        const selectedValArr = sku.specs.map(val=>val.valueName);
        const valueArrPowerSet = getSubSet(selectedValArr);
        valueArrPowerSet.forEach(arr=>{
            const key =arr.join('-');
            if(key === '') return;
            if(pahtMap[key]){
                pahtMap[key].push(sku.id)
            }else{
                pahtMap[key] = [sku.id]
            }
        })
    })

    return pahtMap;
}

// 初始化禁用状态 specs：商品源数据 pathMap：路径字典
const initDisabledState = (specs, pathMap) => {
  // 约定：每一个按钮的状态由自身的disabled进行控制
  specs.forEach(item => {
    item.values.forEach(val => {
      // 路径字典中查找是否有数据 有-可以点击 没有-禁用
      val.disabled = !pathMap[val.name]
    })
  })
}

//获取选择的规格字段名
const getSelectedVals = (specs)=>{
    const selectedVals = [];
    specs.forEach(spec=>{
        const selectedVal = spec.values.find(value=>value.selected);
        selectedVals.push(selectedVal?.name);
        // console.log(selectedVal)
    })
    return selectedVals;
}

//更新禁用状态
const updataDisableState = (specs, pathMap) => {
  // 约定：每一个按钮的状态由自身的disabled进行控制
  specs.forEach((spec, i) => {
    const selectedValues = getSelectedVals(specs)
    spec.values.forEach(val => {
      selectedValues[i] = val.name;
      const key = selectedValues.filter(value => value).join('-')
      // 路径字典中查找是否有数据 有-可以点击 没有-禁用
      if(pathMap[key]) val.disabled = false;
      else val.disabled = true;
    })
  })  
}

//获取当前Sku对象
const getSkuObj = (pathMap)=>{
    const selectedValues = getSelectedVals(goods.value.specs);
    const i = selectedValues.findIndex(item=>item === undefined);
    if(i > -1) {
      emit('change',{})
    }
    else{
        const key = selectedValues.filter(value => value).join('-');
        const skuIds = pathMap[key]
        // 以skuId作为匹配项去goods.value.skus数组中找
        const skuObj = goods.value.skus.find(item => item.id === skuIds[0])
        emit('change',skuObj)
    }
}

watchEffect(()=>{
    goods.value = {
          ...props.goods,
          specs: props.goods.specs.map(spec => ({
              ...spec,
              values: spec.values.map(value => ({
                  ...value,
                  selected: false,
                  disabled: false,
              }))
          }))
    };
    console.log(goods.value)
    const pathMap = getPathMap(goods.value);
    //初始化更新按钮状态
    initDisabledState(goods.value.specs, pathMap)
})
</script>

<template>
    <div class="goods-sku">
        <dl v-for="item in goods.specs" :key="item.id">
            <dt>{{ item.name }}</dt>
            <dd>
                <template v-for="value in item.values" :key="value.name">
                    <img  v-if="value.picture" :src="value.picture"  :title="value.name"
                            @click="changeSku(item,value)"
                            :class="{selected: value.selected , disabled: value.disabled}"/>
                            <!-- activedArray[itemIndex] === valueIndex -->
                    <span v-else      
                            @click="changeSku(item,value)"
                            :class="{selected: value.selected, disabled: value.disabled}">{{ value.name }}</span>
                </template>
            </dd>
        </dl>
    </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
