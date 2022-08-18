<template>
    <!-- ref一般获取子组件 -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    data(){
        return{
            scroll:null,
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType:this.probeType,
                click:true,
                observeDOM:true,
                observeImage:true,
                pullUpLoad:this.pullUpLoad
            })

            //监听滚动的位置
            if(this.probeType === 2 || this.probeType === 3){
                this.scroll.on('scroll',(position) => {
                    // console.log(position);
                    this.$emit('scroll',position)
                })
            }

            //监听scroll滚动到底部
            //监听上拉事件
            if(this.pullUpLoad){
                this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp')
                })
            }
    },
    methods:{
        scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            // console.log('4455566');
            
            this.scroll && this.scroll.refresh()
        }
    }
}
</script>

<style scoped>
</style>