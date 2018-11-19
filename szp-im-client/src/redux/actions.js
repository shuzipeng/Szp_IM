/**
 * 包含异步和同步的action
 */

import io from 'socket.io-client'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  UPDATEUSER_SUCCESS,
  RECEIVE_USER,
  RESET_USER,
  GET_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_NEW_MSG,
  MSG_READ
} from './action-types'

import {
  reqRegister, 
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg
} from '../api'


// 同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const updateUserSuccess = (user) => ({type: UPDATEUSER_SUCCESS, data: user})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
const receivetUserList = (userList) => ({type: GET_USER_LIST, data: userList})
const receiveMsgList = ({users, chatMsgs, userId}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userId}})
const receiveNewMsg = (chatMsg, userId) => ({type: RECEIVE_NEW_MSG, data:{ chatMsg, userId}})
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from , to}})

//  注册的异步action
 export const register = (user) => {
  const { username, password, password2, type } = user
  if (!username) {
    return errorMsg('请输入密码')
  } else if (password !== password2) {
    return errorMsg('两次密码输入不一致')
  }
  // 简单的验证通过,提交表单数据
  return async dispatch => {
    const response = await reqRegister({username, password, type})
      const result = response.data
    if (result.code === 0) {
      // 分发成功的action
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  } 
 }

//  登录的异步action
 export const login = (user) => {
  const { username, password } = user
  if (!username) {
    return errorMsg('用户名不能为空')
  } 
  if (!password) {
    return errorMsg('密码不能为空')
  }

  return async dispatch => {
    const response = await reqLogin(user)
    const result = response.data
    if (result.code === 0) {
      // 分发成功的action
      dispatch(authSuccess(result.data))
      getMsgList(dispatch, result.data._id)
    } else {
      dispatch(errorMsg(result.msg))
    }
  }  
 }

 //完善用户信息
 export const updateUser = (user) => {
  const {header, income, constellation, height} = user

  if (!header || !income || !constellation || !height) {
    return errorMsg('请完善信息')
  }

   return async dispatch => {
     const response = await reqUpdateUser(user)
     const result = response.data
     if (result.code === 0) {
      // 分发成功的action
      dispatch(updateUserSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
   }
 }

 // 获取用户信息
 export const getUserInfo = () => {
   return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 0) {
      // 分发成功的action
      dispatch(receiveUser(result.data))
      getMsgList(dispatch, result.data._id)
    } else {
      dispatch(resetUser(result.msg))
    }
   }
 }

 // 获取用户列表
export const getUserList = (type) => {
  //console.log(this.props.user)
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data

    if (result.code === 0) {
      // 分发成功的action
      dispatch(receivetUserList(result.data))
    } else {
      
    }
  }
}

/**
 * 单例对象,判断无则创建,且保存
 */

function initScoket (dispatch, userId) {
  if (!io.socket) {
    io.socket = io('ws://localhost:4000')
    io.socket.on('receiveMsg', (chatMsg) => {
     // 只有当chatMsg 与我相关,则dispatch同步action且保存
     if (userId === chatMsg.from || userId === chatMsg.to) {
      dispatch(receiveNewMsg({chatMsg, userId}))
     } 
    })
  }
}

async function getMsgList (dispatch, userId) {
  initScoket(dispatch, userId)
  const response = await reqChatMsgList()
  const result = response.data

  if (result.code === 0) {
    const {users, chatMsgs} = result.data
    dispatch(receiveMsgList({users, chatMsgs, userId}))
  }
}

// 发送消息异步action
export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    io.socket.emit('sendMsg', {from, to, content})
  }
}

// 读取消息
export const readMsg = (from, to) => {
  return async dispatch => {
    const response = await reqReadMsg(from)
    const result = response.data
    if ( result.code === 0 ) {
      const count = result.data
      dispatch(msgRead({count, from, to}))
    } 
  }
}
