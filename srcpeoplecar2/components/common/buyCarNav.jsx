import React, { Component } from 'react'
import { Route,Link } from "react-router-dom"
import { connect } from "react-redux"
import { NavBar, Icon,SearchBar,InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';   //创建react-antd的内置from

const NavStyle = {
  position: "fixed",
  width: "100%",
  top: "0px",
  zIndex:10000
}

import style from "../../css/buycar.css"

class Index extends Component {
  constructor(props) {
    super(props)
    
  }
  render() {
  
    const { getFieldProps } = this.props.form;
    return (
      <NavBar
        mode="light"
        icon={<p style={{ display: "flex", alignItem: "center" }}><Link to="/chooseLocation"><span>{this.props.locations[0].name}</span><Icon type="down" /></Link></p>}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '0.16rem',width:"1rem" }} />
        ]}
        style={NavStyle}>
          <div className={style.searchCarInput}>
          <Icon type="search" size="xs" />
          <input type="text"/>
          </div>
         
          
        </NavBar>
    )
  }
}

const BasicInputExampleWrapper = createForm()(Index);

export default BasicInputExampleWrapper


