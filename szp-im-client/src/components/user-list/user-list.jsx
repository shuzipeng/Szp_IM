import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

const Header = Card.Header
const Body = Card.Body
class UserList extends Component {

  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  render () {
    const {userList} = this.props
    return (
      <WingBlank style={{marginBottom:55,marginTop:45}}>
      <QueueAnim type='scale'>

         {
          userList.map(user => (
            <div key={user._id}>
            <WhiteSpace />
            <Card onClick={() => this.props.history.push(`/chat/${user._id}`)} >
              <Header
                thumb = {require(`../../assets/images/headers/${user.header}.jpg`)}
                extra={user.username}
                thumbStyle={{width:'40px',height:'40px'}}
              />
              <Body>
                <div>身高: {user.height} cm</div>
                <div>年收入: {user.income} K</div>
                <div>星座: {user.constellation}</div>
              </Body>
            </Card>
          </div>        
          ))
        }

      </QueueAnim>
       
      </WingBlank>

    )
  }
}

export default withRouter(UserList)
