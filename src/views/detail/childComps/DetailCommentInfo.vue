<template>
    <div>
        <div v-if="Object.keys(commentInfo).length" class="comment-info">
        <div class="info-header">
            <div class="header-title">用户评价</div>
            <div class="header-more">更多
                <img src="~assets/img/go.svg" />
            </div>
        </div>
        <div class="info-user">
            <img :src="commentInfo.user.avatar" alt=""/>
            <span>{{commentInfo.user.uname}}</span>
        </div>
        <div class="info-detail">
            <p>{{commentInfo.content}}</p>
            <div class="info-other">
                <span class="date">{{commentInfo.created | showDate}}</span>
                <span>{{commentInfo.style}}</span>
            </div>
            <div class="info-imgs">
                <img :src="item" :key="index" v-for="(item,index) in commentInfo.images" alt="">
            </div>
        </div>
        {{commentInfo.list}}
    </div>
    <div class="comment-info" style="color:red" v-else>暂无用户评价</div>
    </div>
</template>

<script>
import {formatDate} from 'common/utils';
export default {
    name:'DetailCommentInfo',
    props:{
        commentInfo:{
            type:Object,
            default:{}
        }
    },
    filters:{
        showDate(value){
            //1. 拿到时间戳,转化成date格式
            const date = new Date(value * 1000)
            //2. 将date格式化
            return formatDate(date,'yyyy-MM-dd hh:mm:ss')
        }
    }
}
</script>

<style scoped>
.comment-info{
    padding:4px 15px;
}
.info-header{
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
    text-align: center;
    padding: 10px 0;
    border-bottom:1px solid #eee;
}
.header-more{
    display: flex;
    vertical-align: middle;
}
.header-more img{
    height: 16px;
    width: 16px;
}
.info-user{
    padding:10px 0 2px;
    display: flex;
    vertical-align: middle;
    align-items: center;
}
.info-user img{
    width:24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 5px ;
}
.info-detail{
    padding:0 5px 15px;
}
.info-detail p {
    font-size: 14px;
    line-height: 1.5;
    color:#777;
    margin: 0;
    padding-top:11px;
}
.info-detail .info-other{
    font-size:12px;
    margin-top:10px;
    color:#999;
}
.info-detail .info-other {
    padding:0 5px 10px;
}
.info-imgs{
    display: flex;
    flex-wrap:wrap;
}
.info-imgs img{
    padding-left: 5px;
    width: 60px;
    height: 60px;
    /* width:100%;
    height: 100%; */
}
</style>