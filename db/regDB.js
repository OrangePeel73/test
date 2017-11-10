// 数据库操作


var pool = require('./pool');


//查询所有注册信息
function findAll(handler){
    pool.getConnection(function(err,conn){
        if(err){
            throw err;
        } else {
            var sql = "select * from reg";
            conn.query(sql,function(err,results){
                if(err){
                    throw err;
                } else {
                    handler.call(this,results);
                }
                //释放连接对象
                conn.release();
            });
        }
    });
}
// 添加
function addUser(reg,handler){
    pool.getConnection(function(err,conn){
        if(err){
            throw err;
        } 
        else {
            var sql = 'insert into reg values(null,?,?);'
            conn.query(sql,[
                reg.name,
                reg.psw
            ],function(err,result){
                if(err){
                    throw err;
                }
                else {
                    handler(result);
                }
                conn.release();
        });
        }
    });
}

module.exports = {
  
    findAll:findAll,
    addUser:addUser
}

