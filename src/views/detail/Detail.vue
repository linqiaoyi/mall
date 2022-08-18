<template>
    <div id="detail">
        <detail-nav-bar 
        class="detail-nav" 
        @clickHandle="clickHandle" 
        ref="nav"/>
        <!-- :pull-up-load="true" -->
        <scroll class="content" 
                ref="scroll" 
                
                :probe-type="3" 
                @scroll="contentScroll">
            <detail-swiper :topImages="topImages" @imageLoad="imageLoad"></detail-swiper>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shops="shops" />
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" ref="goods"/>
            <detail-param-info ref="params" :goodsparam="goodsparam"/>
            <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
            <goods-list ref="recommends" :goods="recommends" />
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"/>
        <back-top v-show="isShow" @click.native="backClick"/>
        <!-- <toast :message="message" :show="show"/> -->
    </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar.vue'
// import BackTop from 'components/content/backtop/BackTop'
// import Toast from 'components/common/toast/Toast'

import {debounce} from 'common/utils'
import {mapActions} from 'vuex'
// import {ADDCART} from 'store/mutations'
import {getDetail,Goods,Shops,GoodsParam,getRecommand} from 'network/detail'
import { backTopMixin } from 'common/mixin'
export default {
    name:'Detail',
    data(){
        return {
            iid:null,
            topImages:[],
            goods:{},
            shops:{},
            detailInfo:{},
            goodsparam:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopYs:null,
            currentIndex:0,
            // isShow:false,
            tabOffsetTop:0,
            // show:false,
            // message:''
        }
    },
    mixins:[backTopMixin],
    created(){
        //1.保存传入的iid
        this.iid = this.$route.params.iid

        //2.根据iid请求详情数据
        getDetail(this.iid).then(res =>{
            const data = res.result
            //获取订部的图片轮播数据
            this.topImages = data.itemInfo.topImages
            
            //2.获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            
            //3.获取商家信息
            this.shops = new Shops(data.shopInfo)

            //4.获取店铺信息
            this.detailInfo = data.detailInfo;

            //5.获取参数
            this.goodsparam = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            
            //6.取出评论信息
            if(data.rate.cRate){
                this.commentInfo = data.rate.list[0];
            }
        })

        //3.请求推荐数据
        getRecommand().then(res =>{
            this.recommends = res.data.list
            console.log('recommends',this.recommends);
        })

        //4.给getThemeTopY赋值
        this.getThemeTopYs = debounce(()=>{
            this.themeTopYs = []
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
            this.themeTopYs.push(this.$refs.recommends.$el.offsetTop-44)
            this.themeTopYs.push(Number.MAX_VALUE)
        },500)
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        // Toast,
        // BackTop,
    },
    methods:{
        ...mapActions(['addCart']),
        imageLoad(){
            //
            // this.$nextTick(() => {
            //     this.themeTopYs = []
            //     this.themeTopYs.push(0);
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
            //     this.themeTopYs.push(this.$refs.recommends.$el.offsetTop-44)
            //     console.log(this.themeTopYs);
            // })
            //  this.$refs.scroll.refresh()
            this.$refs.scroll.refresh()
            this.getThemeTopYs()
            this.tabOffsetTop = this.$refs.goods.$el.offsetTop 
        },
        // imgLoad(){
        //     this.$refs.scroll.refresh()
        // },
        clickHandle(index){//200（第三个参数）是时间
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },
        contentScroll(position){
            // 1.获取position
            const positionY = -position.y
            // 2.positionY与主题中的值进行对比
            // positionY 在0 和 y1 之间,index=0
            // positionY 在y1 和 y2 之间,index=1
            // positionY 在y2 和 y3 之间,index=2
            // positionY 在y3 和 y4 之间,index=3
            let length = this.themeTopYs.length;
            for(let i=0;i<length-1;i++){
                if(this.currentIndex !== i &&((i < length-1 && positionY >= this.themeTopYs[i] &&
                positionY < this.themeTopYs[i+1]))){
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex;
                }   
            }

            // 3.显示是否回到顶部
            this.isShow = positionY > this.tabOffsetTop
                
        },
        addToCart(){
            //获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            //将商品添加到购物车
            // this.$store.commit('addCart',product)
            
            // 导入mapActions
            this.addCart(product).then(res =>{
                // this.show = true;
                // this.message = res;
                // console.log('res',res);
                // setTimeout(()=>{
                //     this.show = false,
                //     this.message = ''
                // },1500)
                this.$toast.show(res,1500)
                console.log(this.$toast);
                
            })

            // 没有导入mapActions
            // this.$store.dispatch('addCart',product).then(res =>{
            //     console.log('res',res)
            // })
            
            
        }
        // backClick(){
        //     this.$refs.scroll.scrollTo(0,0)
        // },
    },
    updated() {
    },
}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height:100vh;
    }
    .content{
        height:calc(100% - 44px - 49px);
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>