<template>
    <div class="swiper">
        <div class="swiper-container" >
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item,index in list">
                    <a :href="item.link"><img :src="item.image" alt="" @load="imageLoad"></a>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
    

</template>

<script>
import  Swiper from 'common/swiper.min.js'//引入siwpercommon/swiper.min.js
import 'swiper/css/swiper.min.css'
export default {
    name:'Swiper',
    data(){
        return{
            list:[],
            isLoad:false
        }
    },
    props:['banners'],

    watch:{
        banners(){
            this.list = this.banners.list
            this.$nextTick(()=>{
                new Swiper ('.swiper-container', {
                    direction: 'horizontal', // 默认vertical垂直切换选项
                    loop: true, // 循环模式选项
                    speed:1000,
                    autoplay:{
                        delay:1000
                    },
                    autoHeight:true,
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        //clickable:参数设置为true时，点击分页器的指示点分页器会控制swiper切换
                        clickable:true,
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })
            }) 
        }
    },
    methods:{
        imageLoad(){
            if(!this.isLoad){
                this.$emit('swiperImageLoad')
                this.isLoad = true
            }
        }
    }
}
</script>

<style scoped>
.swiper{
    width: 100%;
    height: 40%;
    margin:0px auto;
}
/* .swiper-container {
    width: 100%;
    height: 100%;
} */
.swiper-slide img {
    width: 100%;
}

.swiper-pagination-bullet {
    width:20px;
    border-radius:20px;
    background-color: #fff;
}


</style>