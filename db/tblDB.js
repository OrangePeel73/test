
var pool = require('./pool');
//题型
 function findType(handler){
    pool.getConnection(function(err,conn){
        if(err){
            throw err;
        }else {
            var sql = "select * from tbl_exam_subjecttype";
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
// 方向
function findPart(handler){
    pool.getConnection(function(err,conn){
        if(err){
            throw err;
        }else {
            var sql = "select * from tbl_exam_epartment";
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
// 查找方向下的知识点
function findTopic(handler){
    pool.getConnection(function(err,conn){
        if(err){
            throw err;
        }else {
            var sql = "select * from tbl_exam_topic";
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
module.exports = {
  
    findType:findType,
    findPart:findPart,
    findTopic:findTopic
    
}