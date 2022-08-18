<template>
    <div class="list-item">
        
        
        <div class="item-selector">
            <CheckButton :value="itemInfo.checked" @click.native="changeChecked"></CheckButton>
        </div>
        <div class="item-img">
            <img :src="itemInfo.image" alt="商品图片">
        </div>
        <div class="item-info">
            <div class="item-title">{{itemInfo.title}}</div>
            <div class="item-desc">{{itemInfo.desc}}</div>
            <div class="info-bottom">
                <div class="item-price left">￥{{itemInfo.price}}</div>
                <div class="item-count right">X{{itemInfo.count}}</div>
            </div>
        </div>
        
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    name:'CartListItem',
    props:{
        itemInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    components:{
        CheckButton
    },
    methods:{
        changeChecked(){
            this.itemInfo.checked = !this.itemInfo.checked
        }
    }
}
</script>

<style scoped>
.list-item{
    width:100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
.item-selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-content: center;
}

.item-img {
    padding-right:2px;
}
.item-img img{
    width: 80px;
    height: 100px;
    /* display: block; */
    border-radius: 5px;
}
item-info{
    font-size: 17px;
    color:#333;
    width: 65%;
    overflow: hidden;
}
.item-title,
.item-desc 
{
    font-size: 17px;
    width: 250px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.item-desc {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
}
.info-bottom{
    margin-top:10px;
    font-size:14px;
    display: flex;
    bottom:10px;
    left:10px;
    right:10px;
}
.info-bottom .item-price{
    color:orangered
}
.item-count{
    font-size: 16px;
    padding-left:130px;
}
</style>