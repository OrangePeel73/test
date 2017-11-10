// 路由  

var express = require('express');
var regDB = require('../db/regDB');
var regRouter = express.Router();

// 主页
regRouter.post('/index',function(req,resp){
  var body = req.body;
  resp.send(body);
})

regRouter.post('/login',function(req,resp){
  var body = req.body;
  resp.send(body);
})
regRouter.post('/reg',function(req,resp){
  var body = req.body;
  resp.send(body);
})
regRouter.post('/./papes/bank/topic',function(req,resp){
  var body = req.body;
  resp.send(body);
})

// 注册页面传入数据库注册数据  查询数据
regRouter.get('/findReg',function(req,resp){
  var body = req.body;//获取请求
  regDB.findAll(function(results){
    resp.send(JSON.stringify(results));//回应请求
  });
  
})

// tianjai 
// 向数据库添加数据
regRouter.post('/addUser',function(req,resp){
  var body = req.body;
  // resp.send(body);
  if(body){
    regDB.addUser(body,function(results){
    resp.json(results);
  });
  }
  
})

  
  



module.exports = regRouter;