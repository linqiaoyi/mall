<template>
    <div class="bottom-bar">
        <div class="check-content">
            <div class="check-button">
                <check-button :value="isSelectAll" @click.native='checkClick'></check-button>
                <span>全选</span>
                <div class="price">
                    合计：{{totalPrice}}
                </div>
                <div class="calculate" @click = "calcClick">
                    去结算：{{checkLength}}
                </div>
            </div>
                
        </div>
    </div> 
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    name:'CartButtomBar',
    components:{
        CheckButton
    },
    computed:{
        totalPrice(){
            return '￥' + this.$store.state.cartList.filter(item => {
                return item.checked
            })
            .reduce((pre,item)=>{
                return pre + item.count*item.price
            },0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
            return !(this.$store.state.cartList.filter(item => !item.checked).length)
        },
        
    },
    methods:{
        checkClick(){
            if(this.isSelectAll)
            {
                this.$store.state.cartList.forEach(item => item.checked = false)
            }
            else{
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
        },
        calcClick(){
            if(this.isSelectAll === 0){
                this.$toast.show('请选择购买的商品',2000)
            }
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    border-top:1px solid #ccc;
    height:40px;
    background-color: #fff;
    position: fixed;
    bottom:49px;
    right: 0px;
    left: 0px;
}
.check-content{
    padding: 10px 10px;
    display: flex;    
}
.check-button{
    vertical-align: middle;
    align-items: center;
    display: flex;
}
span{
    margin-left:5px;
}
.price{
    margin-left:30px;
}
.calculate{
    position: absolute;
    right:0px;
    height: 100%;
    width:100px;
    line-height: 2.2;
    text-indent:5px ;
    background-color: var(--color-tint);
    align-items: center;
    color:#fff;
}
</style>