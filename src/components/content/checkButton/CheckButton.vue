<template>
    <div class="check-button" :class="{check:value}">
        <img src="~assets/img/checkbutton.svg" alt="" v-show="value">
    </div>
</template>

<script>
export default {
    name:'CheckButton',
    props:{
        value:{
            type:Boolean,
            default:false
        }
    },
}
</script>

<style scoped>
.check-button{
    border-radius: 50%;
    height: 20px;
    width: 20px;
    border:2px solid #aaa;
    box-sizing: border-box;
}
.check-button img{
    height: 20px;
    width: 20px;
} 
.check{
    border-color:#fff;
}
</style>