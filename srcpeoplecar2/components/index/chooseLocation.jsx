import React, { Component } from 'react'
import { Route, Link } from "react-router-dom"
import { connect } from "react-redux"
import { NavBar, Icon, Flex } from 'antd-mobile';
import store,{actions,INDEX_ADDLOCATION,INDEX_CHANGELOCATION} from "../../redux"
import Foot from "../common/foot"
import $ from "jquery"
import style from "../../css/index.css"
import ChooseNav from "../common/chooseNav"
import asyncGetDataComponent from "../hoc/asyncGetDataComponent"  //数据劫持高阶组件（封装的fetch请求，保证数据成功后，渲染组件）
import getLocation from "../hoc/getLocation"                      //获取地理位置高阶组件
class ChooseLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cityList: this.props.getData[0],
      el:[]
    }
    // fetch("/cityList").then((data) => {
    //   return data.json()
    // }).then((data) => {
    //   this.setState({
    //     cityList: data
    //   })
    // })

    console.log($("title").html("chooseLicencePlate"))
  }
  // 选择城市
  chooseHandle(e,item){
      if(!this.props.locations.includes(item)){
        store.dispatch(actions[INDEX_ADDLOCATION](item))
        e.target.className+=" "+style.chooseCityClass
      }else{
        let arr=[...this.props.locations]
        arr.splice(arr.indexOf(item),1)
        store.dispatch(actions[INDEX_CHANGELOCATION](arr))
        e.target.className=style.cityList
      }
     
  }
  // 将已选城市删除掉
  deleteHandle(item){
    // 采用jq的方式
    // $("#"+item.id).attr("class",style.cityList)

    // 采用ref操作dom的方式
    this.refs[item.id].className=style.cityList
    let arr=[...this.props.locations]
        arr.splice(arr.indexOf(item),1)
        store.dispatch(actions[INDEX_CHANGELOCATION](arr))
  }
  render() {
    // 渲染城市列表
    const $el = this.state.cityList.map((i, index) => {
      const $li = i.city.map((j, jIndex) => {
        return <p key={j.id} ref={j.id} id={j.id} className={style.cityList} onClick={(e)=>{this.chooseHandle(e,j)}}>{j.name}</p>
      })
      return <section key={index} className={style.sectionList} id="cityList">
        <h4 >{i.letter}</h4>
        <Flex wrap="wrap">
          {$li}
        </Flex>
      </section>
    })

    
    // 渲染已经选中的城市
    const $p=this.props.locations.map((i,index)=>{
        return (
          <p key={index}  onClick={(e)=>{this.deleteHandle(i)}}>{i.name}</p>  
        )
    })
    return (
      <div className={style.chooseCity}>
        <ChooseNav title="选择城市" {...this.props}/> 
        <section className={style.carAddress}>
          <span>您的上牌地址</span>
          <aside><Link to="/chooseLicencePlate"> {this.props.licencePlate}<Icon type="right" /></Link></aside>
        </section>
        {/* 渲染选择的 */}
        <section className={style.cityAddress}>
          <h4 >您已选择城市</h4>
          <Flex wrap="wrap">
            {$p}
          </Flex>
        </section>
        <div>
          {$el}
        </div>
      </div>)
  }
}


const select = (state) => {
  return { ...state }
}

// 高阶组件，做地理信息的获取

const resultComponent=getLocation(connect(select)(ChooseLocation))

// 高阶组件，做渲染拦截，在保证请求到数据后，进行renderComponent

const asyncDataComponent=asyncGetDataComponent(resultComponent,[{url:"/cityList"}])



export default asyncDataComponent



