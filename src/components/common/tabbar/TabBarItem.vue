<template>
        <div class="tab-bar-item" @click='clickHandle'>
            <div v-if='!isActive'>
                <slot name="item-icon"></slot>
            </div>
            <div v-else>
                <slot name="item-icon-active" ></slot>
            </div>
            <div :style="activeStyle">
                <slot name="item-text" ></slot>
            </div>
            <!-- <span class="iconfont icon-shouyefill" ></span>
            <span class="iconfont icon-shouye" ></span> -->
            <!-- 首页 -->
        </div>
        <!-- <div class="tab-bar-item">
            <span class="iconfont icon-fenlei"></span>
            <span class="iconfont icon-fenlei1"></span>
            分类
        </div>
        <div class="tab-bar-item">
            <span class="iconfont icon-gouwuche"></span>
            <span class="iconfont icon-gouwuchefill"></span>
            购物车
        </div>
        <div class="tab-bar-item">
            <span class="iconfont icon-wode"></span>
            <span class="iconfont icon-wodefill"></span>
            我的
        </div> -->
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'#red'
        }
    },
    data(){
        return{
            // isActive:true,
        }
    },
    computed:{
        isActive(){
            //indexOf是否包含某个参数，不包含返回-1，包含返回1
            //这是表示不活跃
            return this.$route.path.indexOf(this.path) !== -1 
        },
        activeStyle(){
            return this.isActive ? {color:this.activeColor}:{}
        }
    },
    methods:{
        clickHandle(){
            this.$router.push(this.path)
        }
    }
}
</script>

<style>
.tab-bar-item{
flex: 1;
text-align: center;
height: 49px;  
cursor:pointer;
}

</style>