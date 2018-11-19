/**
 * 选择用户头像的UI组件
 */

import React,{Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {

  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  state = {
    icon: null
  }

  constructor(props) {
    super(props)
    this.hearderList = []
    for (let i = 0; i < 10; i++) {
      this.hearderList.push({
        text: '头像'+ (i + 1),
        icon: require(`../../assets/images/headers/头像${i + 1}.jpg`)
      })
    }
  }

  handelClick = ({text, icon}) => {
    this.setState({icon})
    this.props.setHeader(text)
  }

   render () {
    const listHeader = !this.state.icon ? "请选择头像" : (
      <div>
        已选择头像:&nbsp;&nbsp;&nbsp;&nbsp;<img  src={this.state.icon} style={{width:'25px',height:'25px'}} alt=''/>
      </div>  
    )

     return (
       <List renderHeader={() => listHeader}>
          <Grid data={this.hearderList} 
                columnNum={5}
                onClick={this.handelClick}
                />
       </List>
     )
   }
 }