//把所有的静态资源都放在一个public的文件夹里面 然后使用app.use(express.static('public'))
//这样每一个静态资源就都可以找到 
var express = require('express')
var fs = require('fs')
var app = express()
//静态资源的托管
app.use(express.static('public'))
//添加端口监听
app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
//读取文件
app.get('/', (req, res) => {
    fs.readFile(__dirname + '/views/index.html', (err, data) => {
        if(err){
            res.end(err)
        }else{
            res.end(data)
        }
    })
})