import React, { Component } from 'react'
import { Route,Link } from "react-router-dom"
import { connect } from "react-redux"
import { NavBar, Icon,Flex } from 'antd-mobile';
import  Nav from "../common/indexNav"
import  Foot from "../common/foot"
import $ from "jquery"
import style from "../../css/buycar.css"

import store,{actions,INDEX_ADDCARLIST,BUYCAR_CHANGEHANDLE,BUYCAR_ORDERTYPE} from "../../redux"

import asyncGetDataComponent from "../hoc/asyncGetDataComponent"  //数据劫持高阶组件（封装的fetch请求，保证数据成功后，渲染组件）
import getLocation from "../hoc/getLocation"                      //获取地理位置高阶组件

import BuyCarNav from "../common/buyCarNav"
// 需要这步，你要npm 这个，
import PropTypes from 'prop-types';
class Index extends Component {
   // 这一步是重点
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props)
    console.log(props.getData[1])
  //  将汽车数据存到redux中
    store.dispatch(actions[INDEX_ADDCARLIST](props.getData[1]))
    store.dispatch(actions[BUYCAR_CHANGEHANDLE](this.changeHandle.bind(this)))
    
    this.state={
      type:"",
      state:true
    }
  }
   handle(i){
    this.router=this.context.router
    if(this.state.type==i){
      if(this.state.state){
        this.setState({
          type:i,
          state:!this.state.state
        })
       
        switch(i){
          case "px":{
            
            this.router.history.push("/buycar/order")
          }break
          case "pp":{
            this.router.history.push("/buycar/brand")
            
          }break
        }
       }
       else{
        this.changeHandle()
       }
    }else{
      
      this.setState({
        type:i,
        state:false
      })
      switch(i){
        case "px":{  
          this.router.history.push("/buycar/order")
        }break
        case "pp":{
          this.router.history.push("/buycar/brand")
        }break
      }
    }
     
  }
  changeHandle(){
    this.router=this.context.router
    this.router.history.push("/buycar/content")
    this.setState({
      type:"",
      state:!this.state.state
    })
  }
  
  render() {
    return (
    <div>
     <BuyCarNav {...this.props}/>
     {/* 筛选部分 */}
     <Flex className={style.select}>
        <Flex.Item>
         <p onClick={()=>{this.handle("px")}}>排序<Icon type={this.state.type=="px"?"up":"down"} size="xs" /></p>
        </Flex.Item>
        <Flex.Item>
         <p onClick={()=>{this.handle("pp")}}>品牌<Icon type={this.state.type=="pp"?"up":"down"} size="xs" /></p>
        </Flex.Item>
        <Flex.Item>
         <p onClick={()=>{this.handle("jg")}}>价格<Icon type={this.state.type=="jg"?"up":"down"} size="xs" /></p>
        </Flex.Item>
        <Flex.Item>
         <p onClick={()=>{this.handle("sx")}}>筛选<Icon type={this.state.type=="sx"?"up":"down"} size="xs" /></p>
        </Flex.Item>
      </Flex>
      
      {this.props.children}
    </div>)
  }
}


const select = (state) => {

  return { ...state }
}

// 高阶组件，做地理信息的获取
const resultComponent=getLocation(connect(select)(Index))

// 高阶组件，做渲染拦截，在保证请求到数据后，进行renderComponent
const asyncDataComponent=asyncGetDataComponent(resultComponent,[{url:"/cityList"},{url:"/carList"}])

export default asyncDataComponent



