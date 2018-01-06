import React, { Component } from 'react'
import { Route,Link } from "react-router-dom"
import { connect } from "react-redux"
import { NavBar, Icon, } from 'antd-mobile';
import style from "../../css/index.css"



class Index extends Component {
  constructor(props) {
    super(props)
    
    this.state={
      title:"选择城市"
    }
  }
  render() {
    return (
      <NavBar
      mode="dark"
      icon={<p className={style.NavStyle} ><Icon type="left" onClick={()=>{this.props.history.go(-1)}} /><span className={style.chooseNavTitle}>{this.props.title}</span></p>}
     className={style.chooseNav}
    />
    )
  }
}


const select = (state) => {
  return { ...state }
}

export default connect(select)(Index)



