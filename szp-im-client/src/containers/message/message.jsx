import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'


const Item = List.Item
const Brief = Item.Brief
class Message extends Component {
 
  getLastMsgs = (chatMsgs) =>{
    const lastMsgObjs = {}
    console.log(this.props)
    chatMsgs.forEach(msg => {

      if (msg.to === this.props.user._id && !msg.read) {
        msg.unReadCount = 1
      } else {
        msg.unReadCount = 0
      }
     
      const chatId = msg.chat_id
      const lastMsg = lastMsgObjs[chatId]

      if (!lastMsg) {
         lastMsgObjs[chatId] = msg 
      } else {
        const unReadCount = lastMsg.unReadCount + msg.unReadCount
        if (msg.create_time > lastMsg.create_time) {
          lastMsgObjs[chatId] = msg
        }
        lastMsgObjs[chatId].unReadCount = unReadCount 
      }
    })

    const lastMsgs = Object.values(lastMsgObjs)

    lastMsgs.sort((msg1, msg2) => {
      return msg2.create_time - msg1.create_time
    })

    return lastMsgs
  }

  render () {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat
    const lastMsgs = this.getLastMsgs(chatMsgs)
    // 根据chat_id 分组
    return (
     <List style={{marginTop:50, marginBottom: 50}}>
     <QueueAnim type='left'>
     {
        lastMsgs.map(msg => {
          const targetUserId = msg.to === user._id ?  msg.from : msg.to
          const targetUser = users[targetUserId]
          return (
            <Item
              key={msg._id}
              extra={<Badge text={msg.unReadCount} />}
              thumb={targetUser.header ? require(`../../assets/images/headers/${targetUser.header}.jpg`) : null}
              arrow='horizontal'
              onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
            >
              {msg.content}
              <Brief>{targetUser.username}</Brief>
            </Item>
          )
        })
      }
     </QueueAnim>
     </List>
    )
  }
}

export default connect (
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)