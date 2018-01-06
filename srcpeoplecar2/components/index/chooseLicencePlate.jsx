import React, { Component } from 'react'
import { Route, Link } from "react-router-dom"
import { connect } from "react-redux"
import { NavBar, Icon, Flex } from 'antd-mobile';
import store,{actions,INDEX_CHANGELICENCEPLATE} from "../../redux"
import Foot from "../common/foot"
import $ from "jquery"
import style from "../../css/index.css"
import ChooseNav from "../common/chooseNav"
class ChooseLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      provinceList: [],
      cityList: [],
      showCityList:[],
      classState:null
    }
    fetch("/provinceCity").then((data) => {
      return data.json()
    }).then((data) => {
      console.log(data)
      this.setState({
        provinceList: data.provinceArr,
        cityList: data.city,
        classState:data.provinceArr[0].province[0].id,
        showCityList:data.city[data.provinceArr[0].province[0].id]
      })
    })

    console.log($("title").html("选择页"))
  }
  // 点击省份，样式添加与删除
  provinceHandle(e,item){
      
      const data=this.state.cityList[item.id]
      if(data){
        this.setState({
          showCityList:data,
          classState:item.id
        })
      }else{
        this.setState({
          showCityList:[{name:"无数据"}],
          classState:item.id
        })
      }
     
  }
  // 点击字母设置滚动条位置
  scrollHandle(e,i,index){
  //  设置滚动条的高度
    this.refs.province.scrollTop=this.refs[i.letter].offsetTop-90

    // 设置省份为当前字母下的第一个省份
    console.log(index)
    console.log(this.state.provinceList[index].province[0].id)
    console.log(this.state.cityList[this.state.provinceList[index].province[0].id])
    
    this.setState({
        classState:this.state.provinceList[index].province[0].id,
        showCityList:this.state.cityList[this.state.provinceList[index].province[0].id]
      })
  }
  // 选择城市
  chooseCityHandle(i){
       store.dispatch(actions[INDEX_CHANGELICENCEPLATE](i.name))
  }
  render() {
    // 渲染省份
    const $province = this.state.provinceList.map((i, index) => {
      return <section key={index}>
        <h4 ref={i.letter}>{i.letter}</h4>
        <ul>
          {i.province.map((j, index) => <li key={index} className={this.state.classState==j.id?style.activeColor:null} onClick={(e)=>this.provinceHandle(e,j)}>{j.name}</li>)}
        </ul>
      </section>
    })
    // 渲染城市
    const $city=this.state.showCityList.map((i,index)=>{
      return(
        <li key={index} onClick={()=>{this.chooseCityHandle(i)}}>{i.name}</li>
      )
    })
    // 渲染字母
    const $letter=this.state.provinceList.map((i, index) => {
      return  <li key={index} onClick={(e)=>{this.scrollHandle(e,i,index)}}>{i.letter}</li>
    })
    
    return (
      <div className={style.licencePlate}>
        <ChooseNav title="选择上牌城市" {...this.props} />
        <section className={style.cityAddressLicen}>
          <Flex wrap="wrap">
            <p>{this.props.licencePlate}</p>
          </Flex>
        </section>
        <main className={style.licencePlateMain}>
          <aside className={style.licencePlateAside} ref="province">
              {$province}
          </aside>
          
          <ul className={style.licencePlateCity}>
              {$city}
          </ul>
          <ul className={style.licencePlateLetter}>
            {$letter}
          </ul>
          
        </main>
      </div>)
  }
}


const select = (state) => {
  return { ...state }
}

export default connect(select)(ChooseLocation)



