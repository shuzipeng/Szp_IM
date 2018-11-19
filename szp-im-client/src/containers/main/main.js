import React,{Component} from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile';

import { getUserInfo } from '../../redux/actions'
import UserInfo from '../user-info/userInfo'
import UserMain from '../user-main/userMain'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'


class Main extends Component{

  navList = [
    {
      path: '/usermain',
      component: UserMain,
      title: '主页',
      icon: 'home',
      text: '主页'
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息'
    },
    {
      path: '/personal',
      component: Personal,
      title: '个人中心',
      icon: 'personal',
      text: '我的'
    },
  ]

  componentDidMount () {
    const userId = Cookies.get('userId')
    const {_id} = this.props.user
    if (userId && !_id) {
      this.props.getUserInfo()
    }
  }

	render () {

    const userId = Cookies.get('userId')
    if (!userId) {
      return <Redirect to='/login'/>
    } 

    const { user, unReadCount } = this.props

    if (!user._id) {
      return null
    } else {
      console.log(this.props.location.pathname)
    }

    const {navList} = this
    const path = this.props.location.pathname
    const currentNav = navList.find(nav => nav.path === path)

		return (
			<div>
        { currentNav ? <NavBar className='stick-header'>{currentNav.title}</NavBar> : null}
				<Switch>
          {
            navList.map((nav, index) => <Route path={nav.path} component={nav.component} key={index}/>)
          }
					<Route path='/userinfo' component={UserInfo}></Route>
          <Route path='/chat/:userId' component={Chat}/>

          <Route component={NotFound}/>
				</Switch>
        {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}></NavFooter> : null}
			</div>
		)
	}
}

export default connect(
  state => ({user: state.user, unReadCount: state.chat.unReadCount}),
  {getUserInfo}
  )(Main)