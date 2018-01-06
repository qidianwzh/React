import React, { Component } from 'react'
import { Route, Link } from "react-router-dom"
import { connect } from "react-redux"
import { NavBar, Icon, Flex, List } from 'antd-mobile';

import Foot from "../common/foot"
import $ from "jquery"

const Item = List.Item;
const Brief = Item.Brief;
import style from "../../css/buycar.css"

import store, { actions, INDEX_ADDLOCATION,BUYCAR_COLLECTSTATE } from "../../redux"

import asyncGetDataComponent from "../hoc/asyncGetDataComponent"  //数据劫持高阶组件（封装的fetch请求，保证数据成功后，渲染组件）
import getLocation from "../hoc/getLocation"                      //获取地理位置高阶组件



class Content extends Component {
  constructor(props) {
    super(props)

    this.orderByHandle()
  }
  componentWillReceiveProps(props) {

    this.setState({
      carList: this.dataHandle(props.carList)
    })

  }

  dataHandle(data) {
    console.log(data)
    let result = []
    data.forEach((arr) => {

      let resultArr = []

      arr.forEach((i) => {

        const filterArr = i.carList.filter((i) => {
          if (i.price != "") {
            return true
          }
        })
        resultArr.push(...filterArr)
      })
      result.push(...resultArr)
    })
    // console.log(result)
    return result
  }
  // 根据价格筛选
  orderByPrice() {
    if (this.props.orderType.reg == "+") {
      let arr = [...this.dataHandle(this.props.carList)]
      arr.sort((a, b) => {
        return parseInt(a.price) < parseInt(b.price) ? 1 : -1
      })
      console.log(arr)
      console.log(this)
      this.state = {
        carList: arr
      }
    } else {
      let arr = [...this.dataHandle(this.props.carList)]
      arr.sort((a, b) => {
        return parseInt(a.price) > parseInt(b.price) ? 1 : -1
      })

      this.state = {
        carList: arr
      }
    }
  }
  // 根据品牌筛选
  orderByBrand() {
    let arr = [...this.props.carList]
    let carArr = []
    arr.forEach((i) => {
      i.forEach((i) => {
        if (i.carClass == this.props.orderType.reg) {
          carArr = i.carList
        }
      })
    })
    const filterArr = carArr.filter((i) => {
      if (i.price != "") {
        return true
      }
    })
    console.log(filterArr)
    this.state = {
      carList: filterArr
    }

  }
  orderByHandle() {
    // 进行排序，还是进行默认渲染
    if (this.props.orderType) {
      switch (this.props.orderType.type) {
        case "px": {
          this.orderByPrice()
        } break;
        case "pp": {
          this.orderByBrand()
        } break;
      }
    } else {
      this.state = {
        carList: this.dataHandle(this.props.carList)
      }
    }
  }
  // componentDidMount(){
  //   this.stateSet=true
  // }

  everyHandle(e,i) {
    console.log(e.target)

    // let resultArr=this.state.carList.map((j)=>{
    //     if(j.carName==i.carName){
    //       j.state=!j.state
    //     }
    //     return j
    // })

    // this.setState({

    //   carList:resultArr
    // })

    store.dispatch(actions[BUYCAR_COLLECTSTATE](i))

  }

  render() {

    const $el = this.state.carList.map((i, index) => {
      return <List renderHeader={() => i.carName} key={index} className={"my-list " + style.selfList}>
        <Item >
          <div className={style.love}>
            <span>{i.price}</span>
            
            <Icon type={i.state?"check-circle-o":"cross-circle"} size='sm' onClick={(e) => { this.everyHandle(e, i) }} />
          </div>
        </Item>
      </List>

    })
    return (
      <div className={style.main}>
        <main>
          {$el}
        </main>
        <Foot />
      </div>
    )
  }
}


const select = (state) => {
  console.log(state)
  return { ...state }
}


export default connect(select)(Content)



