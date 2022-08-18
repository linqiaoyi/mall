<template>
    <div class="param-info" v-if="Object.keys(goodsparam).length">
        <p>参数信息</p>
        <table v-for="(table,index) in goodsparam.sizes" 
                :key="index" class="info-size">
            <tr v-for="(tr,indey) in table" :key="indey">
                <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
            </tr>
        </table>

        <table class="info-param">
            <tr v-for="(key,value) in goodsparam.infos" :key="value">
                <td class="info-param-key">{{key.key}}</td>
                <td class="param-value">{{key.value}}</td>
            </tr>
        </table>
        
        <div class="info-img" v-if="goodsparam.image.length">
            <img :src="goodsparam.image" alt="">
        </div>
        
    </div>
</template>

<script>
export default {
    name:'DetailParamInfo',
    props:{
        goodsparam:{
            type:Object,
            default:{}
        }
    }
}
</script>

<style scoped>
.param-info{
    font-size: 14px;
    padding: 20px 15px;
    border-bottom:5px solid #f2f5f8;
}
.param-info p {
    font-size: 15px;
    margin-bottom: 10px;
}
.param-info table{
    width:100%;
    border-collapse: collapse;
}
.param-info table tr{
    height: 42px;
}
.param-info table tr td{
    border-bottom: 1px solid rgba(100,100,100,.1);
}
.info-param-key{
    width: 95px;
}
.info-param{
    border-top:1px solid rgba(0,0,0,.1);
}
.param-value {
    color:#eb4868;
}
.info-img img{
    width:100%;
}
</style>