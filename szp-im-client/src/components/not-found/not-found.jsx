import React, { Component } from 'react'
import { Button } from 'antd-mobile'

class NotFound extends Component {
  render () {
    return (
      <div>
        <div style={{marginTop: 50}}>
          <h2>似乎来到了不存在的世界...</h2>
          <Button 
            type="primary"
            onClick={() => this.props.history.replace('/')}
          >
          回到已知世界
          </Button>
        </div>
      </div>
    )
  }
}

export default NotFound