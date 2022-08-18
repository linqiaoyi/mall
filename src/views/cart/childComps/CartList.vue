<template>
    <div class="cart-list">
        <scroll 
            class="scroll"
            :probe-type="3"
            ref="scroll">
            <div class="content">
                <cart-list-item 
                    v-for="(item,index) in cartList" 
                    :key="index"
                    :item-info="item"/>
            </div>
        </scroll>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem.vue'

export default {
    name:'CartList',
    components:{
        CartListItem,
        Scroll
    },
    computed:{
        ...mapGetters({
            cartList:'cartList'
        })
    },
    activated(){
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
.cart-list{
    padding:6px;
    /* height: 100vh; */
}
.content{
    height:100%;
}
.scroll{
    height: calc(100vh - 49px - 44px -40px);
    overflow: hidden;
}

</style>