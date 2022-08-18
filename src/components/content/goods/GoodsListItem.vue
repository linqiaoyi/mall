<template>
    <div class="goods-list-item" @click="itemClick" >
        <img v-lazy="showImage" alt="" class="showImg" @load="imgLoad">
        <!-- @load="imgLoad" -->
        <div>
            <p class="title">{{goodsItem.title}}</p>
            <div class="detail">
                <span class="price">{{goodsItem.price}}</span>
                <img src="~assets/img/collect.svg" alt="" class="collect" @click="ClickHandle" v-if="!isClick">
                <img src="~assets/img/collect-active.svg" alt="" class="collect" @click="ClickHandle" v-else>
                <span class="collect">{{goodsItem.cfav}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'GoodsListItem',
    props:{
        goodsItem: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return{
            isClick:false
        }
    },
    computed:{
        showImage(){
            return this.goodsItem.image || this.goodsItem.show.img
        }
    },
    methods:{
        ClickHandle(){
            this.isClick = !this.isClick;
        },
        
        imgLoad(){
            // if(this.$route.path.indexOf('/home') === 0){
            //     this.$bus.$emit('homeItemImgLoad')
            // }
            // else if (this.$route.path.indexOf('/detail') === 0){
            //     this.$bus.$emit('detailItemImageLoad')
            // }
            // console.log('imgLoad');
            this.$bus.$emit('itemImageLoad')
        },
        itemClick(){
            this.$router.push('/detail/'+ this.goodsItem.iid)
            // console.log(this.goodsItem.iid);
        }
    }
}
</script>

<style scoped>

.goods-list-item{
    width:49%;
    text-align: center;
    align-items: center;
    font-size: 12px;
}
/* .goods-list-item:nth-child(2n){
    margin-left: 2px;
} */
.showImg{
    width:100%;
    border-radius: 6px;
}
.title{
    text-overflow: ellipsis;
    overflow: hidden;
    width:100%;
    white-space: nowrap;
    height: 12px;
    margin:0;
    background-color: #fff;
}
.detail{
    vertical-align:middle;
}
.collect,.collect-active{
    width: 14px;
    height: 14px;
    padding-left:2px;
}
.price{
    color:var(--color-tint)
}
</style>