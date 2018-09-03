//1引入数据库
var mysql = require('mysql')
//2创建数据库连接 定义一个变量来接收用于后面的SQL执行方法中使用这个对象
var connection = mysql.createPool({
    //主机名
    host: '127.0.0.1',
    //用户名
    user: 'root',
    //密码
    password: 'root',
    //想操作的数据库的名称
    database: 'herosdata'
})
//3打开连接 也可以不打开 默认是打开最近连接的
//4创建查询命令
//4.1执行一个新增语句
//var sql="select name,id,gender,img from herosdata"
var obj = {
    id: 5,
    name: '赵四123',
    gender: '男',
    img: '3.jpg'
}
var sql = "insert into heros values(null,'456','女','1.jpg',default)"

// var sql = "select * from heros"
//执行SQL语句
// connection.query(sql语句，（错误信息对象，执行的结果，查询返回的字段信息）=>{
// })
// console.log(connection.query);

connection.query(sql, (err, result, fields) => {
    if (err) {
        console.log("------" + err + "-----")
    } else {
        console.log(result)
        console.log(fields)
    }
})