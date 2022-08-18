<template>
    <div class="feature">
        <a href="https://act.mogujie.com/zzlx67">
            <img src="~assets/img/home/background.png" alt="" @load="imgLoad">
        </a>
        
    </div>
</template>

<script>
export default {
    name:'Feature',
    methods:{
        imgLoad(){
            this.$emit('imgLoad')
        }
    }
}
</script>

<style scoped>
    .feature img {
        width:100%;
    }
</style>