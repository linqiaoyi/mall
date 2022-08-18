<template>
    <div class="back-top">
        <img src="~assets/img/to-top.svg" alt="">
    </div>
</template>

<script>
export default {
    name:'BackTop'
}
</script>

<style scoped>
.back-top{
    position: fixed;
    right:10px;
    bottom: 56px;
}
.back-top img{
    height: 30px;
    width: 30px;
}
</style>