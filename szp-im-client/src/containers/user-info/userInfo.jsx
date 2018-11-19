import React, {Component} from 'react'
import {connect} from 'react-redux'
import { InputItem, NavBar, TextareaItem, Button, Picker, List, WingBlank, WhiteSpace, Toast} from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import { updateUser } from '../../redux/actions'
import HeaderSeletor from '../../components/header-selector/header-selector'
const pickerData = [
  {
    label: '白羊座',
    value: '白羊座'
  },
  {
    label: '金牛座',
    value: '金牛座'
  },
  {
    label: '双子座',
    value: '双子座'
  },
  {
    label: '巨蟹座',
    value: '巨蟹座'
  },
  {
    label: '狮子座',
    value: '狮子座'
  },
  {
    label: '处女座',
    value: '处女座'
  },
  {
    label: '天秤座',
    value: '天秤座'
  },
  {
    label: '天蝎座',
    value: '天蝎座'
  },
  {
    label: '射手座',
    value: '射手座'
  },
  {
    label: '摩羯座',
    value: '摩羯座'
  },
  {
    label: '水瓶座',
    value: '水瓶座'
  },
  {
    label: '双鱼座',
    value: '双鱼座'
  },
]

class UserInfo extends Component {

  state = {
    header:'',
    height:'',
    income:'',
    constellation:'',
    sign:'',
    msg: ''
  }

  setHeader = (header) => {
    this.setState({header})
  }

  handelChange (name, value) {
    if (Array.isArray(value)) {
      value = value[0]
    }
    this.setState({
      [name]: value
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }

  render () {
    const {msg, header} = this.props.user

	  if (header) {
      return <Redirect to='usermain'/>
    }
    
    return(
      <div>
       <NavBar>用户信息完善</NavBar>
       <WingBlank>
       {msg ? Toast.info(msg) : null}
       <HeaderSeletor setHeader={this.setHeader}></HeaderSeletor>
       <InputItem type='text' onChange={ value => { this.handelChange('height', value)} }>身高:</InputItem>
       <InputItem type='text' onChange={ value => { this.handelChange('income', value)} }>年收入:</InputItem>
       <Picker 
        data={pickerData} 
        title='请选择您的星座'  
        onChange={ value => { this.handelChange('constellation', value)}}
       >
          <List.Item arrow="horizontal">星座</List.Item>
       </Picker>
       <TextareaItem 
       title='个性签名' 
       rows={5} 
       placeholder='说点什么,让大家认识你'  
       onChange={ value => { this.handelChange('sign', value)} }/>
       <WhiteSpace />
       <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;&nbsp;存</Button>
       </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
  )(UserInfo)