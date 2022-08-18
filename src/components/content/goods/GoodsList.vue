<template>
    <div class="goods-list">
        <GoodsListItem v-for="item in goods" 
                        :goods-item="item" 
                        class="goods-list-item" 
                        :key="item.iid"/>
    </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'
export default {
    name:'GoodsList',
    components:{
        GoodsListItem
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.goods-list{
    padding: 4px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    border-top: 3px solid #eee;
}

</style>