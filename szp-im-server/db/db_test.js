const mongoose = require('mongoose')
const md5 = require('blueimp-md5')
mongoose.connect('mongodb://localhost:27017/Szp_IM',{useNewUrlParser:true},(error, res) => {
  if(!error){
    console.log('db connect success')
  }
})

/*
  描述文档的结构,属性名/属性值 , 是否必须
 */
const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
})

/*
  定义model, 可以操作集合
 */
const UserModel = mongoose.model('user', userSchema)
/*
   增删改查操作.通过Model/Model实例 来进行
 */
function testSave() {
  const userModel = new UserModel({username: 'Rose', password: md5('123456'), type: 'female'})
  userModel.save((err, userDoc) => {
    console.log('save', err, userDoc)
  })
}
//testSave()

function testFind() {
  UserModel.find((error, users) =>{
    console.log('find', users)
  })
}

testFind()