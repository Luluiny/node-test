var session=require('express-session')
var express = require('express')
var app = express()
app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
//浏览器默认不会使用session保持状态  跟php类似 
// 使用 session 中间件
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名 -----加密就是加盐
    resave : false,      //不管session数据是否发生改变 都会自动保存
    saveUninitialized: false, // 是否保存未初始化的会话
}));
app.get('/', (req, res)=>{
    //把判断是否登录放在全局守护的中间件上 之后网页的每一个请求都会经过这个首先进行这个判断
    // 登录过的就直接next进行下一步就是借着开始的路由申请 没有登录的就去登录
    //获取session 
    if(req.session.isLogin&&req.session.isLogin=='true'){
        res.end('首页')
    }else{
        //设置session req.session应该是一个对象  直接给对象添加属相
        console.log(req.session)
        req.session.isLogin='true'
        req.session.Currentuser={'name':'jack','age':'22'}
        res.end()
    }
});