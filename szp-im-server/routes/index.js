var express = require('express')
var router = express.Router()


const md5 = require('blueimp-md5')
const {UserModel, ChatModel} = require('../db/models')
const filter = {password: 0, __v: 0}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

/*
  注册功能,post
  @username
  @password
  @type
 */
router.post('/register', (req, res) => {
  const { username, password, type } = req.body
  // 判断是否已经存在
  UserModel.findOne({username}, (err, userDoc) => {
    if (userDoc){
      res.send({ code: 1, msg: '用户已存在' })
    } else {
      new UserModel({ username, type, password: md5(password) }).save((err, user) => {
        // 返回包含user的json数据,不传密码,且带上MongoDB的_id
        const data = { username, type, _id: user._id }
        // 持久化cookie
        res.cookie('userId', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
        res.send({code: 0, data: data})
      })
    }
  })
})

/*
  登录,post
  @username
  @password
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body
  UserModel.findOne({username, password:md5(password)}, filter, (err, user) => {
    if (user) {
      res.cookie('userId', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 })
      res.send({code :0, data: user})
    } else {
      res.send({code: 1, msg: '用户名或密码错误'})
    }
  })
})

/**
 * 更新用户额外信息
 * userId
 * height: {type: Number},
  constellation: {type: String},
  income: {type: Number},
  sign: {type: String},
  header: {type: String}
 */

router.post('/updateUser', (req,res) => {
  // 取出cookie里的userId,判断登录状态
  const userId = req.cookies.userId
  if (!userId) {
    res.send({code: 1, msg: "请先登录"})
  } else {
    const user = req.body
    UserModel.findByIdAndUpdate({_id: userId}, user, (err, oldUser) => {
      if (!oldUser) {
        res.clearCookie('userId')
        res.send({code: 1, msg: "请先登录"})
      } else {
        const {_id, username, type} = oldUser
        const data = Object.assign(user, {_id, username, type})
        res.send({code: 0, data: data})
      }
    })
  }
})


/**
 * 获取用户信息
 * @type {Router|router}
 */

router.get('/user', (req, res) => {
  const userId = req.cookies.userId

  if (!userId) {
    return res.send({code: 1, msg: '请先登录'})
  }

  UserModel.findOne({_id: userId}, filter, (err, user) => {
    res.send({code: 0, data: user})
  })

})


/**
 * 获取特定类型的用户列表
 * @type {Router|router}
 * @根据type
 */

router.get('/userlist', (req, res) => {
  const {type} = req.query

  UserModel.find({type}, filter, (err, users) => {
    res.send({code: 0, data: users})
  })
})


/**
 *
 * @type {Router|router}
 */

router.get('/getMsgList', (req, res) => {
  const  userId = req.cookies.userId
  UserModel.find((err, userDocs) => {
    const users  =  userDocs.reduce((users, user) => {
      users[user._id] = {username: user.username, header: user.header}
      return users
    },{})

    /**
     * 查询用户的聊天信息
     */
    ChatModel.find({'$or': [{from: userId}, {to: userId}]}, filter, (err, chatMsgs) => {
      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})

/**
 * 更新未读消息状态
 */

router.post('/readMsg', (req, res) => {
  const from = req.body.from
  const to = req.cookies.userId

  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, (err, doc) => {
    res.send({code: 0, data: doc.nModified})
  })
})


module.exports = router
