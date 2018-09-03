//专门处理数据
// var fs=require('fs')
// exports.getAlldata=(callback)=>{
//     fs.readFile(__dirname+'/data/data.json',(err,data)=>{
//         if(err){
//             callback(err)
//         }else{
//             callback(null,JSON.parse(data.toString()))
//         }
//     })
// }

//使用数据库的形式提供数据
var mysql = require('mysql')
//连接数据库
var connection = mysql.createConnection({
    //设置主机
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'herosdata'
})
//获取所有的数据
exports.getAlldata = (callback) => {
    var sql = "SELECT id,name,gender,img FROM heros WHERE isDelete=0";
    //执行SQL语句
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);

            callback(err)
        } else {
            callback(null, {
                heros: result
            })
        }
    })
}
//添加英雄
exports.addHeros=(obj,callback)=>{
    var sql=`INSERT into heros VALUES(null,'${obj.name}','${obj.gender}','${obj.img}',DEFAULT)`
    connection.query(sql,(err,result)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}
//动态展示编辑页面
exports.getedit=(id,callback)=>{
    var sql="SELECT * FROM heros WHERE id=? AND isDelete=0"
    connection.query(sql,[id],(err,result)=>{
        if(err){
            callback(err)
        }else(
            //如果这个操作成功返回的是只有一行数据 是数组 一项  但是我们需要返回对象
            callback(null,result[0])
        )
    })
}
//实现编辑
exports.editheros=(obj,callback)=>{
    
    var sql=`UPDATE heros SET ? WHERE id=?`
    connection.query(sql,[obj,obj.id],(err,result)=>{
        if(err){
            
   // console.log(1111111111111111111111111)
            callback(err)
        }else{
           // console.log(3333333333333333333)
            //如果这个操作成功返回的是只有一行数据 是数组 一项  但是我们需要返回对象
            callback(null,result[0])
        }
            
            
            
        
    })
}
//实现删除  删除不是真的删除数据  而是改变数据的状态 之前我们筛选是按照状态为0 直接找到对应的id然后换成状态是1
exports.editheros=(id,callback)=>{
    var sql="UPDATE heros SET isDelete=1 WHERE id=?"
    connection.query(sql,[id],(err,result)=>{
        if(err){
           callback(err)
        }else{
            callback(null)
        }
    })
}
//登录验证 用昵称去筛选数据库 如果返回的是一条信息 就是一个对象 
exports.islogin=(nickname,callback) => {
    var sql = 'select * from users where nickname = ?'
    connection.query(sql,[nickname],(err,result) => {
        if(err){
            callback(err)
        }else{
            callback(null,result[0])
        }
    })
}