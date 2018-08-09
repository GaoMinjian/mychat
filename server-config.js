/*
let socketIo = require('socket.io');
let express = require('express');

let httpPort = 3000;
let app = express();

app.get('/',function (req, res){
  res.sendFile(__dirname + '/index.html')
});

let server =require('http').createServer(app);
let io = socketIo(server);

io.on('connection',function (socket) {
  console.log('a user connected');
  socket.on('disconnect',function () {
    console.log('a user disconnect');
  })
});

server.listen(httpPort);
console.log('success:' + httpPort);
*/
let http = require('http');
let user = require('./database/db').user; //mongo model
let privateHistory = require('./database/db').privateHistory;
let groupHistory = require('./database/db').groupHistory
let socketId = [],users = []//用账号对应客户端
// let fs = require('fs');
// let exec = require('child_process').exec;
let server = http.createServer(function (req, res) {
  // console.log(req)
  // console.log(res)
  // fs.readFile('./index.html',function(error,data){//若根目录有index.html，访问地址，将显示index.html
  //  res.writeHead(200,{'Content-Type':'text/html'});
  //  res.end(data,'utf-8');
  // });
}).listen(3000);//创建http服务
console.log('Server running ');
var io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
  console.log('链接成功'+ socket.id);
  user.find({},function (err,docs) {
    socket.emit('allUsers',docs)
  })
/*  socket.emit('allusers', user.find({},function (err,docs) {

  }))*/

//登录
  socket.on('login', (data) => { //data:{account, password}
    user.find({account:data.account},function (err,docs) {
      if(err){
        console.log("err:"+ err);
        socket.emit('loginRes',{state:false,res:'account'})//防止name==res错误时返回内容
      }
      else if (docs.length>0 && data.password==docs[0].password) {
        // console.log(docs[0],docs[0].name,docs[0].account,docs[0].password)
        socket.emit('loginRes',{state:true,res:docs[0].name,headshow:docs[0].headshow});
        socketId[docs[0].account] = socket.id;
        socket.account = docs[0].account
      }
      else{
        socket.emit('loginRes',{state:false,res:'password'})
      }
    })
  });

  //记录刷新后客户端连接ID
  socket.on('saveSocketId',data=>{//account
    socketId[data] = socket.id
    socket.account = data
  })

  //注册
  socket.on('register',(data) => {//data:{headshownum,username,account,password}
    user.count({account:data.account},function (err,docs) {
      if(docs == 1){
        socket.emit('regiserRes','exist')
      }
      else{
        user.create({headshow:data.headshow, name:data.username, account:data.account, password:data.password},function (err,doc) {
          if(err){
            socket.emit('registerRes','error')
          }
          else {
            socket.emit('registerRes','success')
            user.find({},function (err,docs) {
              io.sockets.emit('allUsers',docs)
            })
          }
        })
      }
    })
  })

  //获取私聊的历史信息
  socket.on('getPrivateHistory', (data) =>{  // data:{selfname,selfaccount,othername,otheraccount}
    privateHistory.find({selfaccount:data.selfaccount, otheraccount:data.otheraccount},function (err,docs) {
      if(docs.length > 0) {
        // console.log('OK then send');
        socket.emit('sendPrivateHistory', {othername:docs[0].othername, chathistory:docs[0].chathistory})
      }
      else { //privatehistories中创建新私聊记录
        privateHistory.create({selfname:data.selfname,selfaccount:data.selfaccount,othername:data.othername, otheraccount:data.otheraccount, chathistory:[]},function (err,docs) {
          privateHistory.create({selfname:data.othername,selfaccount:data.otheraccount,othername:data.selfname ,otheraccount:data.selfaccount, chathistory:[]},function() {
              socket.emit('sendPrivateHistory', {othername:data.othername,chathistory:[]})
                 }
              )
            }
          )
        }
      }
    )
  })

  //保存聊天记录并发送给对方
  socket.on("sendMsg", (data) =>{ //data:{selfaccount,otheraccount,chathistory}
    privateHistory.update({$and:[{selfaccount:data.selfaccount},{otheraccount:data.otheraccount}]},{$set:{chathistory:data.chathistory}},{multi:true},function (err,docs) {
      console.log(docs)
    });
    var otherhistory = data.chathistory
    for(var i=0;i<otherhistory.length;i++){
      otherhistory[i].self = ! data.chathistory[i].self
    }
    privateHistory.update({$and:[{selfaccount:data.otheraccount, otheraccount:data.selfaccount}]}, {$set:{chathistory:otherhistory}},{multi:true},function (err,docs) {
      console.log(docs)
    });
    if (data.otheraccount in socketId) {
      io.to(socketId[data.otheraccount]).emit('sendToOther', otherhistory)
      privateHistory.find({selfaccount:data.otheraccount},function (err,docs) {
        var latest = []
        for (var i=0; i<docs.length;i++){
            latest[i] = {othername: docs[i].othername, otheraccount: docs[i].otheraccount, latestmsg: docs[i].chathistory[docs[i].chathistory.length - 1]}
        }
        io.to(socketId[data.otheraccount]).emit('getLatestPrivateHistory',latest)
      })
    }
  })

  //message所有私聊的最新信息
  socket.on('reqLatestPrivateHistory', data =>{// data = account
    privateHistory.find({selfaccount:data},function (err,docs) {
      var latest = []
      for (var i=0; i<docs.length;i++){
        latest[i] = {othername:docs[i].othername, otheraccount:docs[i].otheraccount, latestmsg:docs[i].chathistory[docs[i].chathistory.length-1]}
      }
      socket.emit('getLatestPrivateHistory', latest)
    })
  })


  //获取群聊历史记录
  socket.on('reqGroupHistory', data =>{ //空
    groupHistory.find({},function (err,docs) {
      socket.emit('getGroupHistory',docs)
    })
  })

  //发送单条群聊信息
  socket.on('sendGroupMsg', data =>{ //data:time,username,account,content
    groupHistory.create({time: data.time,username:data.username, account:data.account, content:data.content},function () {
      socket.broadcast.emit('getGroupMsg',data)
      io.sockets.emit('latestGroupMsg',data)
    })
  })

  socket.on('reqLatestGroupMsg',data =>{ //kong
    groupHistory.find({},function (err,docs) {
      io.sockets.emit('getLatestGroupMsg',docs[docs.length-1])
    })
  })


  //设置头像
  socket.on('setHeadshow',data =>{
    user.update({account:data.account},{$set:{headshow:data.headshow}},function (err,doc) {
      if (err) {
        console.log(err)
      }
      else  {
        console.log(doc)
      }
    })
  })
  //修改昵称
  socket.on('setUsername',data =>{
    user.update({account:data.account},{$set:{name:data.username}})
  })



  //断开连接
  socket.on('disconnect',function () {
    if(socket.account in socketId){
      socketId.splice(socket.account,1);
      // delete(socketId[socket.account])
      // users.splice(users.indexOf(socket.account), 1)
      console.log("断开连接" + socket.id)
    }
  })
});
