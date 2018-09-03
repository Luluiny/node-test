//使用express创建服务器和响应
var express = require('express')
var session = require('express-session')
var app = express()
app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
var router = require('./router-express')


//console.log(1111111111111111111111111111111);
//console.log(router)


//引入body-parser 通过中间件的方式设置参数的解析和传递方式 之后在传递参数的直接使用这个中间件
var bodyParser = require('body-parser')
var bodyurl = bodyParser.urlencoded({
    extended: false
})
//一个是url的utf-8的编码格式
app.use(bodyurl)
// 解析 application/json
app.use(bodyParser.json())
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

//注入session
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名 -- 加盐
    resave: false, //不管session数据是否发生改变，都会自动保存
    saveUninitialized: false, // 是否保存未初始化的会话
}));

//静态资源的托管
app.use(express.static('public'))

//挂载模板引擎 使用express-art-template
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

//挂载中间件 让每次请求都经过这个检查 全局监控
app.use(function (req, res, next) {
    //直接判断有没有登陆  在登录的那里设置session的信息 没登录就没有信息 登录才会有信息
    //特殊的如果申请是要去登录页面的时候不要跳转直接登录
    if (req.session.isLogin && req.session.isLogin === 'true' || req.url === '/login') {
        next()
    } else {
        console.log(11111111111111111);

        //没有登录直接重定向取到登录页面
        res.writeHead(301, {
            'Location': '/login'
        })
        res.end()
    }
})

//挂载路由 
app.use(router)