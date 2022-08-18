import {request} from './request'
export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}

export function getRecommand(){
    return request({
        url:'/recommend'
    })
}

// 构造类
export class Goods{
    constructor(itemInfo,columns,services){
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discountDesc = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}
export class Shops{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.goods = shopInfo.cGoods
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
    }
}
export class GoodsParam{
    constructor(info,rule){
        this.image = info.images ? info.images[0]:'';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}