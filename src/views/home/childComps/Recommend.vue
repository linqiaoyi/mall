<template>
    <div class="recommend">
        <div v-for="item in recommends" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imgLoad">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:'Recommend',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        imgLoad(){
            this.$emit('imgLoad')
        }
    }
}
</script>

<style scoped>
.recommend{
    display: flex;
    width: 100%;
    text-align:center;
    font-size:12px;
    padding:20px 0px ;
    border-bottom:4px solid #eee;
}
.recommend-item{
    flex: 1;
    
}
.recommend-item img{
    height:65px;
    width:65px;
    margin-bottom:10px;
}
a:link{
    color:black;
}
a:active{
    color:var(--color-tint)
}
</style>