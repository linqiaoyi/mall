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
        //1.???????????????iid
        this.iid = this.$route.params.iid

        //2.??????iid??????????????????
        getDetail(this.iid).then(res =>{
            const data = res.result
            //?????????????????????????????????
            this.topImages = data.itemInfo.topImages
            
            //2.??????????????????
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            
            //3.??????????????????
            this.shops = new Shops(data.shopInfo)

            //4.??????????????????
            this.detailInfo = data.detailInfo;

            //5.????????????
            this.goodsparam = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            
            //6.??????????????????
            if(data.rate.cRate){
                this.commentInfo = data.rate.list[0];
            }
        })

        //3.??????????????????
        getRecommand().then(res =>{
            this.recommends = res.data.list
            console.log('recommends',this.recommends);
        })

        //4.???getThemeTopY??????
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
        clickHandle(index){//200??????????????????????????????
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },
        contentScroll(position){
            // 1.??????position
            const positionY = -position.y
            // 2.positionY??????????????????????????????
            // positionY ???0 ??? y1 ??????,index=0
            // positionY ???y1 ??? y2 ??????,index=1
            // positionY ???y2 ??? y3 ??????,index=2
            // positionY ???y3 ??? y4 ??????,index=3
            let length = this.themeTopYs.length;
            for(let i=0;i<length-1;i++){
                if(this.currentIndex !== i &&((i < length-1 && positionY >= this.themeTopYs[i] &&
                positionY < this.themeTopYs[i+1]))){
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex;
                }   
            }

            // 3.????????????????????????
            this.isShow = positionY > this.tabOffsetTop
                
        },
        addToCart(){
            //????????????????????????????????????
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            //???????????????????????????
            // this.$store.commit('addCart',product)
            
            // ??????mapActions
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

            // ????????????mapActions
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