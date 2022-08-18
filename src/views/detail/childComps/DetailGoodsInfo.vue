<template>
    <div v-if="Object.keys(detailInfo).length" class="goods-info">
        <div class="info-desc clear-fix">
            <div class="start"></div>
            <div class="desc">{{detailInfo.desc}}</div>
            <div class="end"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index"
            :src="item" alt="" @load="imageLoad">
        </div>
    </div>
</template>

<script>
export default {
    name:'DetailGoodsInfo',
    props:{
        detailInfo:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
            counter: 0,
            imagesLength: 0
        }
    },
    methods:{
        imageLoad(){
            if(++this.counter === this.imagesLength){
                this.$emit('imageLoad')
            }
        }
    },
    watch:{
        detailInfo(){
            this.imagesLength = this.detailInfo.detailImage[0].list.length
        }
    }
}
</script>

<style scoped>
.goods-info{
    padding:30px 8px 0;
    border-bottom: solid 4px rgba(100,100,100,.1);
}
.info-desc{
    padding:0 8px 0;
    font-size: 14px;
}
.info-desc .desc{
    text-indent: 2em;
}
.info-key{
    padding:8px;
}
.info-list img{
    width: 100%;
}
</style>