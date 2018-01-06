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
    console.log(this.props.carList)
     
      this.testState=true
       this.initData(this.props)
  }
  componentWillReceiveProps(props){
    
    this.initData(props)
  }
  initData(props){
   
    let arr=[]
    props.carList.forEach(function(i) {
        let iArr=i.map((j)=>{
                    return j.carClass
                })
        arr.push(...iArr)
    });
    console.log(arr)
    if(this.testState){
      this.state={
        type:"",
        carList:arr
      }
    }else{
      this.setState({
        type:"",
        carList:arr
      })
    }
    
  }
  componentDidMount(){
    this.testState=false
  }
  // 每次点击执行
  handle(e,index,i){
    this.setState({
      type:index
    })
    let obj={
      type:"pp",
      reg:i
    }
    store.dispatch(actions[BUYCAR_ORDERTYPE](obj))

    
    this.props.buyCarHandleFn()
  }
  render() {
   let $el=this.state.carList.map((i,index)=>{
        return <List className={"my-list"} key={index}>
                <Item  onClick={(e)=>{this.handle(e,index,i)}}><span style={this.state.type==index?{color:"red"}:{color:"black"}}>{i}</span></Item>
              </List>
    })
    return (
      <div className={style.main}>
        <main>
          {$el}
        </main>
        
      </div>
    )
  }
}


const select = (state) => {

  return { ...state }
}



export default connect(select)(Index)



