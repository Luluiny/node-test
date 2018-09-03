var mymoudle = require('./dataModule')
var formidable = require("formidable"); //载入 formidable
var path = require("path")
var myurl = require('url')
var template=require('art-template')
exports.getIndexpage = (req, res) => {
    mymoudle.getAlldata((err, data) => {
        if (err) {
            //console.log(11111111111111)
            res.end('err')
        } else {

            res.render(__dirname + '/views/index.html', data)
        }
    })
}
exports.getAdd = (req, res) => {
    //加载静态页面 直接调用render方法渲染
    res.render(__dirname + '/views/add.html')
}
exports.getAddheros = (req, res) => {
    mymoudle.addHeros(req.body, (err) => {
        if (err) {
            res.json({
                code: 100,
                msg: "添加失败"
            })
        } else {
            res.json({
                code: 200,
                msg: "添加成功"
            })
        }
    })
}
exports.getFileUpLoad = (req, res) => {
    //前面写的HTML里面的图片路径还是之前的 后台使用了静态托管 文件的路径都移到了public里面去了 
    // console.log(1111111111111)
    // console.log(req.body)
    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    //设置编码类型
    form.uploadDir = __dirname + '/public/images'
    //设置文件上传时临时文件的文件名是否包括扩展名。如果该值为真，即为包括扩展名，否则，就不包括扩展名。
    form.keepExtensions = false

    form.parse(req, (err, fields, files) => {
        if (err) {
            var obj = {
                code: 100,
                msg: '失败'
            }
            res.end(JSON.stringify(obj))
        } else {
            //上传成功之后保存图片 basename可以获取一段url中的最后一段
            var filename = path.basename(files.img.path)
            var obj = {
                code: 200,
                msg: '成功',
                myimg:filename
            }
            res.end(JSON.stringify(obj))
        }

    })
}
//动态展示编辑页面的数据
exports.getAddPage=(req,res)=>{
    //接收参数
    var url=req.url
    var id=myurl.parse(url,true).query.id
    //根据id获取对应的数据对象
    mymoudle.getedit(id,(err,data)=>{
        if(err){
            res.end('404')
        }else{
            var html=template(__dirname+'/views/edit.html',data)
            res.end(html)
        }
    })
}
//实现编辑功能
exports.doEdit=(req,res)=>{
    console.log(2222222222222222222222)
    console.log(req.body)
    //接收参数 
    // var url=req.url
    // var id=myurl.parse(url,true).query.id
    mymoudle.editheros(req.body,(err,data)=>{
        if (err) {
            res.json({
                code: 100,
                msg: "编辑失败"
            })
        } else {
            
    
    
            res.json({
                code: 200,
                msg: "编辑成功"
            })
        }
    })
}
exports.delheros=(req,res)=>{
    //接收参数id
    var url=req.url
    var id=myurl.parse(url,true).query.id
    mymoudle.editheros(id,(err,data)=>{
        if(err){
            var html={
                code: 100,
                msg: '失败'
            }
            res.end(JSON.stringify(html))
        }else{
            var html={
                code: 200,
                msg: '成功'
            }
            res.end(JSON.stringify(html))
        }
    })
}
//实现登录静态页面
exports.getLogin=(req,res)=>{
    res.render(__dirname + "/views/login.html")
}
//实现登录
exports.doLogin=(req,res)=>{
    var current=req.body
    //console.log(1111111111111111111)
    
    console.log(current)
    mymoudle.islogin(current.username,(err,data)=>{
        if(err){
            //onsole.log(222222222222222222222);
            
            //登录失败
            res.json({
                code:123,
                msg:'服务器异常'
            })
            // res.writeHead(301,{
            //     'Location':'/login'
            // })
            // res.end()
        }else{
            if(data){
                //登录成功
                if(data.password == current.userpwd){
                    //只有登录名是一样的才说明登录成功 这个时候设置session
                    req.session.isLogin = 'true'
                    req.session.current=req.body
                    //然后返回首页
                    res.writeHead(301,{
                        'Location':'/'
                    })
                    res.end()
                }else{
                    //用户名写错是不报错
                    res.writeHead(301,{
                        'Location':'/'
                    })
                    res.end()
                }
            }else{
                res.writeHead(301,{
                    'Location':'/'
                })
                res.end()
            }
        }
    })
}