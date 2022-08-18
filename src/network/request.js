import axios from 'axios'
export function request(config){
    //1.创建一个实例
    const instance1 = axios.create({
        baseURL:'http://152.136.185.210:7878/api/hy66',
        timeout:5000,
    })

    //2.axios拦截器
    instance1.interceptors.request.use(config=>{
        return config
    },err =>{
        console.log(err);
        
    })
    //3.axios响应拦截器
    instance1.interceptors.response.use(res=>{
        return res.data
    },err=>{
        console.log(err);
        
    })
    //4.发送网络请求
    return instance1(config)
}