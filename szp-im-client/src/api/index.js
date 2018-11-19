/*
  网络请求
*/
import ajax from './ajax'

// 注册接口
export const reqRegister = (user) => ajax('/register', user, 'POST')


// 登录接口
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')


// 更新用户
export const reqUpdateUser = (user) => ajax('/updateUser', user, 'POST')

// 获取用户信息
export const reqUser = () => ajax('/user')

// 获取用户列表
export const reqUserList = (type) => ajax('/userlist', { type })

// 获取用户聊天消息列表
export const reqChatMsgList = () => ajax('/getMsgList')

// 修改消息为已读
export const reqReadMsg = (from) => ajax('/readMsg', {from}, 'POST')