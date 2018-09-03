//使用express 基于node.js 
//使用express创建服务器 和用户请求响应
var express=require('express')
 var router=require('./router-express')
 //创建服务器
 var app=express()
 //静态资源的托管
 app.use(express.static('public'))
 //添加端口的监听
 app.listen(3000,()=>{
     console.log('http://127.0.0.1:3000')
 })
 //注入路由  或者说是挂载--use  让当前应用使用我们制定的路由规则
app.use(router)