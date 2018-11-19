/*
  包含N个操作的数据库Model模块
 */

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Szp_IM', {useNewUrlParser: true},(err, res)=>{
  if(!err){
    console.log('db connect success')
  }
})

// user的Model

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  height: {type: Number},
  constellation: {type: String},
  income: {type: Number},
  sign: {type: String},
  header: {type: String}
})

const UserModel = mongoose.model('user', userSchema)

exports.UserModel = UserModel

// 定义chats的Model

const chatScheme = mongoose.Schema({
  from: {type: String, required: true},
  to: {type: String, required: true},
  chat_id: {type: String, required: true},
  content: {type: String, required: true},
  read: {type: Boolean, default: false},
  create_time: {type: Number},
})

const ChatModel = mongoose.model('chat', chatScheme)

exports.ChatModel = ChatModel

