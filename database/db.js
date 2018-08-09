var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/chatdata')
// var db = mongoose.connection
var Schema = mongoose.Schema
var userSchema = new Schema({
  headshow: {type: Number},
  name: {type: String},
  account: {type: String},
  password: {type: String}
})
var privateSchema = new Schema({
  selfaccount: {type: String},
  othername: {type: String},
  otheraccount: {type: String},
  chathistory: {type: Array}
})
var groupScheme = new Schema({
  time: {type: String},
  username: {type: String},
  account: {type: String},
  content: {type: String}
})
exports.user = mongoose.model('users', userSchema)
exports.privateHistory = mongoose.model('privatehistories', privateSchema)
exports.groupHistory = mongoose.model('grouphistories', groupScheme)
