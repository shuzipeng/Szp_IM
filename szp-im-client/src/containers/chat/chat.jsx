import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'


import {sendMsg, readMsg} from '../../redux/actions'

const Item = List.Item
class Chat extends Component {

  state = {
    content: "",
    isShow: false
  }

   // 在第一次render()之前回调
  componentWillMount () {
    // 初始化表情列表数据
    const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
    this.emojis = emojis.map(emoji => ({text: emoji}))
  }

  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)

    // 更新未读消息
    const from = this.props.match.params.userId
    const to = this.props.user._id
    this.props.readMsg(from, to)  
  }

  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }


  handleSend = () => {
    const from = this.props.user._id
    const to = this.props.match.params.userId
    const content = this.state.content.trim()

    if (content) {
      this.props.sendMsg({from, to, content})
    }
    //清除输入数据
    this.setState({
      content: '',
      isShow: false
    }) 
  }

  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if(isShow) {
      // 异步手动派发resize事件,解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  // 得到对方的头像 

  render () {
    const {user} = this.props
    const { users, chatMsgs } = this.props.chat
    const myId = user._id

    if(!users[myId]){
      return null
    }
    const targetId = this.props.match.params.userId
    const chatId = [myId, targetId].sort().join('_')

    const msgs =  chatMsgs.filter(msg => msg.chat_id === chatId)
    const targetHeader = users[targetId].header
    const targetImg = targetHeader ? require(`../../assets/images/headers/${targetHeader}.jpg`) : null
    return (
      <div id='chat-page'>
        <NavBar 
          className='stick-header'
          icon={<Icon type='left'/>}
          onLeftClick={()=> this.props.history.goBack()}
        >
        {users[targetId].username}
        </NavBar>
        <List style={{marginTop:50, marginBottom: 50}}>
          <QueueAnim type='alpha' delay={100}>
          {
            msgs.map(msg => {
              if(targetId === msg.from) { // 对方发送给我的
                return (
                  <Item
                    key={msg._id}
                    thumb={targetImg}
                  >{msg.content}</Item>
                )
              } else {  // 我发送给对方的
                return (
                    <Item
                      key={msg._id}
                      extra='我'
                      className='chat-me'
                    >
                    {msg.content}
                    </Item>
                )
              }
            })  
          }
        </QueueAnim>
      </List>
        <div className='am-tab-bar'>
          <InputItem 
            placeholder="请输入"
            value={this.state.content}
            onChange = {value => this.setState({content: value})}
            onFocus={() => this.setState({isShow: false})}
            extra={
              <span>
                <span onClick={this.toggleShow} style={{marginRight:10}}>😊</span>
                <span onClick={this.handleSend}>发送</span>
              </span>
            }
          />
           {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                this.setState({content: this.state.content + item.text})
              }}
            />
          ) : null}
        </div>
      </div>
    )
  }

}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)