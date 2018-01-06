import React, { Component } from 'react'
import { Route,Link } from "react-router-dom"
import { connect } from "react-redux"
import { NavBar, Icon,Flex,List } from 'antd-mobile';
import  Nav from "../common/indexNav"
import  Foot from "../common/foot"
import $ from "jquery"
import style from "../../css/buycar"
const Item = List.Item;
const Brief = Item.Brief;
import store,{actions,INDEX_ADDLOCATION,BUYCAR_ORDERTYPE} from "../../redux"
import asyncGetDataComponent from "../hoc/asyncGetDataComponent"  //数据劫持高阶组件（封装的fetch请求，保证数据成功后，渲染组件）
import getLocation from "../hoc/getLocation"                      //获取地理位置高阶组件

// 需要这步，你要npm 这个，
import PropTypes from 'prop-types';
class Index extends Component {
   // 这一步是重点
   static contextTypes = {
    router: PropTypes.object.isRequired
  };


  constructor(props) {
    super(props)
    
    this.state={
      type:""
    }
  }
  handle(e,i){
    this.setState({
      type:i
    })
    let obj={
      type:"px",
      reg:i
    }
    store.dispatch(actions[BUYCAR_ORDERTYPE](obj))

    console.log(this.props)
    this.props.buyCarHandleFn()
  }
  render() {
    return (
      <div className={style.main}>
        <main>
        <List className={"my-list"}>
          <Item  onClick={(e)=>{this.handle(e,"+")}}><span style={this.state.type=="+"?{color:"red"}:{color:"black"}}>价格最高</span></Item>
          <Item  onClick={(e)=>{this.handle(e,"-")}}><span style={this.state.type=="-"?{color:"red"}:{color:"black"}}>价格最低</span></Item>
        </List>
        </main>
        
      </div>
    )  
  }
}


const select = (state) => {

  return { ...state }
}



export default connect(select)(Index)



