<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div>
                <img src="~assets/img/detail/shopper.svg" alt="">
                <span>客服</span>
            </div>
            <div>
                <img src="~assets/img/detail/shopCar.svg" alt="">
                <span>店铺</span>
            </div>
            <div>
                <img src="~assets/img/collect.svg" alt="">
                <span>收藏</span>
            </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="addToCart">加入购物车</div>
            <div class="buy">购买</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'DetailBottomBar',
    methods:{
        addToCart(){
            this.$emit('addToCart')
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    height:49px;
    background-color: #fff;
    /* position: relative; */
    /* bottom: 49px; */
    /* z-index:10; */
position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    
    display: flex;
    text-align: center;
}
.bar-item{
    flex:1;
    display: flex;
}
.bar-item>div{
    flex:1;
}
.bar-left{
    font-size:14px;
}
.bar-left img{
    display: block;
    width: 22px;
    height: 22px;
    margin:4px auto 3px;
}
.bar-right{
    font-size:15px;
    
    line-height: 50px;
}
.bar-right .cart{
    color:#333;
    background-color: #ffe817;
}
.bar-right .buy{
    color:#fff;
    background-color: #f69;
}
</style>