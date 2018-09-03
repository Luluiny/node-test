var express = require('express')
//var handler=require('./handler-express')
//创建路由模块对象
var router = express.Router()
//使用中间件监听用户请求 添加配置规则 get post put delete
//使用链式编程
var handler = require('./handler-express')
router.get('/', handler.getIndexpage)
    .get('/add',handler.getAdd)
     .post('/add',handler.getAddheros)
     .post('/fileUpload',handler.getFileUpLoad)
     .get('/edit',handler.getAddPage)
     .post('/edit',handler.doEdit)
     .get('/del',handler.delheros)
     .get('/login',handler.getLogin)
     .post('/login',handler.doLogin)
    // console.log(33333333333333);
     
// router.get('地址',回调方法)
//       .post('/地址'，回调函数)

//暴露成员
module.exports = router