<template>
    <tab-bar class="tab-bar">
        <tab-bar-item path="/home" activeColor='#e89abe' >
        <span slot="item-icon-active" class="iconfont icon-shouyefill" ></span>
        <span slot="item-icon" class="iconfont icon-shouye" ></span>
        <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item path="/category" activeColor='#e89abe'>
        <span slot="item-icon-active" class="iconfont icon-fenlei1" ></span>
        <span slot="item-icon" class="iconfont icon-fenlei"></span>
        <div slot="item-text">分类</div>
        </tab-bar-item>
        <tab-bar-item path="/cart" activeColor='#e89abe'>
        <span slot="item-icon-active" class="iconfont icon-gouwuchefill" ></span>
        <span slot="item-icon" class="iconfont icon-gouwuche"></span>
        <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item path="/profile" activeColor='#e89abe'>
        <span slot="item-icon-active" class="iconfont icon-wodefill" ></span>
        <span slot="item-icon" class="iconfont icon-wode"></span>
            <div slot="item-text">我的</div>
        </tab-bar-item>
    </tab-bar>

</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
    name:'MainTabBar',
    components:{
        TabBar,
        TabBarItem
    }
}
</script>

<style>
    @import 'assets/img/tabbar/iconfont.css';
    .tab-bar{
        z-index: 10;
    }
</style>