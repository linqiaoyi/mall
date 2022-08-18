<template>
    <div class="detail">
        <nav-bar>
            <div slot="left"  @click="backClick">
                <img src="~assets/img/back.svg" alt=""class="backImg">
            </div>
            <div slot="center" class="title">
                <div v-for="item,index in titles" 
                    class="title-item"
                    :class="{active: index === currentIndex}"
                    @click="clickHandle(index)">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:'Detail',
    components:{
        NavBar
    },
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    methods:{
        clickHandle(index){
            this.currentIndex = index;
            this.$emit('clickHandle',index)
        },
        backClick(){

            this.$router.back()
            // this.$router.go(-1)
        }
    }
}
</script>

<style scoped>

.backImg{
    width: 24px;
    height: 24px;
    box-sizing: border-box;
    padding-top:10px;
    
}
.title{
    display: flex;
    font-size: 13px;
}
.title-item{
    flex:1;
}
.active{
    color:var(--color-high-text)
}
</style>