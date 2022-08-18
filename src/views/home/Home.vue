<template>
    <div id='home'>
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <TabControl 
            :titles="titles" 
            @tabClick="tabClick" 
            ref="tabControl1"
            class="tab-control"
            v-show="isTabFixed"
            />
        <Scroll ref="scroll" 
                class="content" 
                :probe-type="3" 
                @scroll="contentScroll"
                @pullingUp="loadMore"
                :pull-up-load="true">
                <swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
                <Recommend :recommends="recommends" @imgLoad="swiperImageLoad"/>
                <Feature @imgLoad="swiperImageLoad"/>
                <TabControl 
                :titles="titles" 
                @tabClick="tabClick" 
                ref="tabControl2"
                />
                <GoodsList :goods="showGoods"/>
        </Scroll>
        <!-- 监听组件，需要click.native -->
        <BackTop @click.native="backClick" v-show="isShow"/>
    </div>
    
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Swiper from 'components/common/swiper/Swiper.vue'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import Recommend from 'views/home/childComps/Recommend'
import Feature from 'views/home/childComps/Feature'

import {getHomeMultidata,getHomeGoods} from 'network/home.js'
import {debounce} from 'common/utils';
export default {
    name:'Home',
    components:{
        NavBar,
        Swiper,
        Recommend,
        Feature,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data(){
        return{
            banners:[],
            recommends:[],
            titles:['流行','新款','精选'],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop',
            isShow:false,
            tabOffsetTop:0,
            isTabFixed: false,
            saveY:0
        }
    },
    created(){
        // 1.请求多个数据
        this.getHomeMultidata()
        // 2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted(){
        //1.图片加载完成的事件监听
        const refresh = debounce(this.$refs.scroll.refresh,200)
        // 监听item中图片加载完成
        this.$bus.$on('itemImageLoad',()=>{
            // this.$refs.scroll.refresh()
            refresh()
        })
        //2.获取tabControl的offsetTop
        //所有的组件都有一个属性$el，用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
        
    },
    methods:{
        /**
         * 事件点击相关的方法
        */
        tabClick(index){
            switch(index){
                case 0:
                    this.currentType = 'pop'
                    break;
                case 1:
                    this.currentType = 'new'
                    break;
                case 2:
                    this.currentType = 'sell'
                    break;
            }  
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0)
            //另一种方法
            // window.scrollTo(0,0)
        },
        contentScroll(position){
            // console.log(position.y);
            //1.判断backTop是否显示
            this.isShow = (-position.y) > 1000
            // if(position.y > 1000){
            //     this.isShow = true
            // }
            // else{
            //     this.isShow = false
            // }
            //2.决定tabcontrol是否吸顶（position:fixed）
            this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        loadMore(){
            // console.log('加载更多');
            this.getHomeGoods(this.currentType)
        },
        swiperImageLoad(){
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            // console.log(this.$refs.tabControl.$el.offsetTop)
        },
        /** 
            网络请求相关的方法
        */
        getHomeMultidata(){
            getHomeMultidata().then(res=>{          
            this.banners = res.data.banner;
            this.recommends = res.data.recommend.list;
            // console.log(this.banners);
            // console.log(this.recommends);
            // console.log(res.data);
            })
        },
        getHomeGoods(type){
            const page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res => {
                // console.log(res)
                // 这里用赋值会覆盖原来的数据，这里要保存原先page0/1...的数据
                // 要一个一个放进去，不是一组[]一组[]放
                this.goods[type].list.push(...res.data.list)
                // console.log(type,page,this.goods[type].list);
                this.goods[type].page += 1
                //完成上拉加载更多
                this.$refs.scroll.finishPullUp()
            })  
        }
    } ,
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    activated(){
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        // this.$refs.scroll.scroll.y = this.saveY  
        // console.log('saveY',this.saveY,this.$refs.scroll.scroll.y)
    },
    // beforeRouteLeave (to, from, next) {
    //     this.saveY = this.$refs.scroll.scroll.y
    //     console.log('this.$refs.scroll.scroll.y',this.$refs.scroll.scroll.y);
    //     next()
    // },
    deactivated(){
        this.saveY = this.$refs.scroll.scroll.y
        // console.log('saveY',this.saveY)
    },
}
</script>

<style scoped>
#home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
}
.home-nav{
    background-color: var(--color-tint);
    color:#fff;
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9; */
}
.tab-control{
    position: relative;
    z-index: 9;
}
/* .tab-control{
    position:sticky;
    top:44px;
    z-index: 9;
} */
.content{
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom:49px;
    left:0;
    right:0;
    
}
/* .content{
    height: 300px;
    overflow: hidden;
    margin-top:44px;
} */
</style>