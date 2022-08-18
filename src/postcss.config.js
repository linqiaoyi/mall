module.exports = {
    plugins:{
        autoprefixer:{},
        "postcss-px-to-viewport":{
            viewportWidth:375,//视窗的宽度，对应是我们设计稿的宽度
            viewportHeight:667,//视窗的高度，对一个是我们设计稿的高度
            unitPrecision:5,//指定‘px'转换为视窗单位值的小数位数,这里表示保存5位整数
            viewPortUnit:'vw',//指定需要转换成的视窗单位，建议使用vm
            selectorBlackList:['tab-bar','tab-bar-item'],
            minPixelValue:1,//小于或等于1px不转化为视窗单位
            mediaQuery:false, //允许在媒体查询中转化为px
            // exclude:[/TabBar\.vue/]
        },
    }
}