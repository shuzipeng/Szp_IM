import React,{Component} from 'react'
import {
    NavBar, 
    WingBlank, 
    List, 
    InputItem,
    WhiteSpace,
    Button,
		Radio,
		Toast
} from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { register } from '../../redux/actions'
import Logo from '../../components/logo/logo'
import './register.less'

const ListItem = List.Item
class Register extends Component{

	state = {
		username: '',
		password: '',
		password2: '',
		type: 'male'
	}

	register = () => {
		this.props.register(this.state)
	}

	handleChange = (name, value) =>{
		this.setState({
			[name]: value
		})
	}

	toLogin = () =>{
		this.props.history.replace('/login')
	}

	render() {
		const {type} = this.state
		const {msg, redirectTo} = this.props.user

		if (redirectTo) {
			return <Redirect to={redirectTo} />
		}

		return (
			<div>
				<NavBar>Szp_IM</NavBar>
				<Logo />
				<WingBlank className='register-wingBlank'>
					<List>
						{msg ? Toast.info(msg) : null}
						<WhiteSpace />
						<InputItem onChange={value => { this.handleChange('username', value) }} placeholder='请输入用户名'>用户名:</InputItem>
						<WhiteSpace />
						<InputItem type='password' onChange={value => { this.handleChange('password', value) }}  placeholder='请输入密码'>密&nbsp;&nbsp;&nbsp;码:</InputItem>
						<WhiteSpace />
						<InputItem type='password' onChange={value => { this.handleChange('password2', value) }}  placeholder='请确认密码'>确认密码:</InputItem>
						<ListItem>
							<span>性&nbsp;&nbsp;&nbsp;别:</span>&nbsp;&nbsp;&nbsp;
							<Radio checked={type === 'male'} onChange={value => { this.handleChange('type', 'male') }}>男</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Radio checked={type === 'female'} onChange={value => { this.handleChange('type', 'female') }}>女</Radio>
						</ListItem>
						<WhiteSpace />
						<Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
						<WhiteSpace />
						<Button onClick={this.toLogin}>已有账户?</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}

export default connect(
	state => ({user: state.user}),{ register }
)(Register)