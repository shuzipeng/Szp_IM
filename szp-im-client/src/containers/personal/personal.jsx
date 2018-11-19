import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button, Modal} from 'antd-mobile';
import Cookies from 'js-cookie'


import { resetUser } from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief
class Personal extends Component {

  logout= () =>{
    Modal.alert('退出', '确定退出登陆吗?', [
      {text: '取消'},
      {
        text: '确定',
        onPress: ()=> {

          // 清除cookie中userid
          Cookies.remove('userId')
          // 清除redux管理user
          this.props.resetUser()
        }
      }
    ])
  }

  render () {
    const {username, header, height,income,constellation,sign,} = this.props.user
    return (
      <div style={{marginBottom:50, marginTop:50}}>
        <Result 
           img={<img src={require(`../../assets/images/headers/${header}.jpg`)} style={{width: 50}} alt="header"/>}
           title={username}
        />

        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>身高: {height}</Brief>
            <Brief>年薪: {income}</Brief>
            <Brief>星座: {constellation}</Brief>
            <Brief>个性签名: {sign}</Brief>
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
        </List>

      </div>
    )
  }
}

export default connect (
  state => ({user: state.user}),
  {resetUser}
)(Personal)