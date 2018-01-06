import React, { Component } from 'react'
import { Route,Link } from "react-router-dom"
import { connect } from "react-redux"
import { NavBar, Icon,Flex } from 'antd-mobile';
import  Nav from "../common/indexNav"
import  Foot from "../common/foot"
import $ from "jquery"
import store,{actions,INDEX_ADDLOCATION} from "../../redux"
import asyncGetDataComponent from "../hoc/asyncGetDataComponent"  //数据劫持高阶组件（封装的fetch请求，保证数据成功后，渲染组件）
import getLocation from "../hoc/getLocation"                      //获取地理位置高阶组件
class Index extends Component {
  constructor(props) {
    super(props)
   
  }
  render() {
    return (
    <div>
      <Nav {...this.props}/>
      <Foot />
      {this.props.children}
    </div>)
  }
}


const select = (state) => {

  return { ...state }
}

export default asyncGetDataComponent(getLocation(connect(select)(Index)),[{url:"/cityList"}])



