import React,{Component} from 'react'
import {
    NavBar, 
    WingBlank, 
    List, 
    InputItem,
    WhiteSpace,
    Button,
		Toast
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions'

import Logo from '../../components/logo/logo'

class Login extends Component{

	state = {
		username: '',
		password: '',
		msg: ''
	}

	login = () => {
		this.props.login(this.state)
	}

	handleChange = (name, value) =>{
		this.setState({
			[name]: value
		})
	}

	toRegister = () =>{
		this.props.history.replace('/register')
	}

	render() {
		const {msg, redirectTo} = this.props.user

		if (redirectTo) {
			return <Redirect to={redirectTo} />
		}

		return (
			<div>
				<NavBar>Szp_IM</NavBar>
				<Logo />
				<WingBlank>
					<List>
					{msg ? Toast.info(msg) : null}
						<WhiteSpace />
						<InputItem onChange={value => { this.handleChange('username', value) }} placeholder='请输入用户名'>用户名:</InputItem>
						<WhiteSpace />
						<InputItem type='password' onChange={value => { this.handleChange('password', value) }}  placeholder='请输入密码'>密&nbsp;&nbsp;&nbsp;码:</InputItem>
						<WhiteSpace />
						<Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
						<WhiteSpace />
						<Button onClick={this.toRegister}>还没有账户?</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}

export default connect(
	state => ({user: state.user}),{login}
)(Login)