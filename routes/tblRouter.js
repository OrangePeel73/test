var express = require('express');
var tblDB = require('../db/tblDB');
var tblRouter = express.Router();

tblRouter.get('/papes/bank/topic',function(req,resp){
  var body = req.body;
  resp.send(body);
})
// 查找题型
tblRouter.get('/findType',function(req,resp){
    var body=req.body;
    tblDB.findType(function(results){
        resp.send(JSON.stringify(results));
    });
});
// 查找方向
tblRouter.get('/findPart',function(req,resp){
    var body=req.body;
    tblDB.findPart(function(results){
        resp.send(JSON.stringify(results));
    });
})
// 查找知识点
tblRouter.get('/findTopic',function(req,resp){
    var body=req.body;
    tblDB.findTopic(function(results){
        resp.send(JSON.stringify(results));
    });
})
module.exports = tblRouter;