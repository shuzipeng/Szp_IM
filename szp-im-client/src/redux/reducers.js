import {combineReducers} from 'redux'
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
const initUser = {
  username: '',
  type: '',
  header:'',
  height:'',
  income:'',
  constellation:'',
  sign:'',
  msg: '',
  redirectTo:''
}

//  产生user状态的reducer
function user (state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...action.data, redirectTo: '/userinfo'}

    case ERROR_MSG:
      return  {...state, msg: action.data}

    case UPDATEUSER_SUCCESS:
      return action.data

    case RECEIVE_USER:
      return action.data  

    case RESET_USER:
      return {...initUser, msg: action.data}

    default:
      return state
  }
}

const initUserList = []

// 产生userList的reducer
function userList (state = initUserList, action) {
  switch (action.type) {
    case GET_USER_LIST:
      return action.data

    default:
      return state  
  }
}

const initChat = {
  users: {},
  chatMsgs: [],
  unReadCount: 0
}

function chat (state = initChat, action) {

  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const {users, chatMsgs, userId} = action.data
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === userId ? 1 : 0),0)
      }

    case RECEIVE_NEW_MSG:
      const {chatMsg} = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userId ? 1 : 0)
      }

    case MSG_READ:
      const {from, to, count} = action.data
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg => {
          if (msg.from === from && msg.to === to && !msg.read) {
            return {...msg, read: true}
          } else {
            return msg
          }
        }),
        unReadCount: state.unReadCount-count
      }

    default: 
      return state
  } 
}

export default combineReducers({
    user, userList, chat
})