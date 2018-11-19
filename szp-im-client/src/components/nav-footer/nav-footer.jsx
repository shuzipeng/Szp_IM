import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item
class NavFooter extends Component {

  static proptypes = {
    navList: PropTypes.array.isRequired,
    unReadCount : PropTypes.number.isRequired
  }

  render () {
    const {navList, unReadCount} = this.props
    const path = this.props.location.pathname
    return (
     <TabBar>
      {
        navList.map((nav, index) => (
          <Item
            key={index}
            title={nav.text}
            badge={nav.path === '/message' ? unReadCount : 0}
            icon={{uri: require(`./images/${nav.icon}.png`)}}
            selectedIcon = {{uri: require(`./images/${nav.icon}-selected.png`)}}
            selected={path === nav.path}
            onPress={() => this.props.history.replace(nav.path)}
          />
        ))
      }
     </TabBar>
    )
  }
}

export default withRouter(NavFooter)

