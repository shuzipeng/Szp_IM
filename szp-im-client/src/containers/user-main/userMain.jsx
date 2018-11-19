import React, { Component } from 'react'
import { connect } from 'react-redux'

import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'
class UserMain extends Component {

  componentDidMount () {
    if (this.props.user.type === 'female') {
      this.props.getUserList('male')
    } else if (this.props.user.type === 'male') {
      this.props.getUserList('female')
    }
    
  }

  render () {
    return (
      <UserList userList={this.props.userList}></UserList>
    )
  }
}

export default connect (
  state => ({userList: state.userList, user: state.user}),
  {getUserList}
)(UserMain)