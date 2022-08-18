import {ADD_COUNTER,ADD_TO_CART} from './mutations-type'
export default{
    addCart(context,payload){
        return new Promise((resolve,reject) => {
            //payload新添加的商品
        // 数组常用的方法有哪些？push /pop/splice/unshift/map/filter/reduce/find
        // 方法一：
        // let oldProduct = null;
        // for(let item of state.cartList){
        //     if(item.iid === payload.iid){
        //         oldProduct = item;
        //     }
        // }
        //2.判断oldProduct
        // if(oldProduct){
        //     oldProduct.count += 1
        // }
        // else{
        //     payload.count = 1
        //     state.cartList.push(payload)
        // }

        // 方法二：
        // let index = state.cartList.indexOf(payload)
        // if(index === -1){
        //     let oldProduct = state.cartList[index]
        //     oldProduct.count += 1
        // }
        // else{
        //     payload.count = 1
        //     state.cartList.push(payload)
        // }

        //查找之前数据是否有该商品
        let oldProduct = context.state.cartList.find( item => item.iid === payload.iid)

        //2.判断oldProduct
        if(oldProduct){
            // oldProduct.count += 1
            resolve('当前数量加一')
            context.commit(ADD_COUNTER,oldProduct)
        }
        else{
            payload.count = 1
            resolve('成功添加新商品')
            context.commit(ADD_TO_CART,payload)
        }
        })
    }
}