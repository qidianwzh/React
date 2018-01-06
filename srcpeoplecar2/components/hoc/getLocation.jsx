import React, { Component } from 'react'
import $ from "jquery"
import store, { actions, INDEX_ADDLOCATION,INDEX_CHANGELOCATION } from "../../redux"


export default (Com) => {
  return class extends Component {
    constructor(props) {
      super(props)
      console.log(this)

      this.state={
        Component:null
      }
  
      $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', () => {
       //通过调用新浪IP地址库接口查询用户当前所在国家、省份、城市、运营商信息
       let locations = store.getState().locations
       let getLocation=null
      //  根据获取到的地理位置，找出数据中对应的地理数据对象
      console.log(props.getData)
       if(props.getData[0]!=undefined){
        //  所有城市数据
       
        props.getData[0].every((i)=> {
          getLocation=i.city.find((i)=>{
            
            return i.name.includes(remote_ip_info.city)
          })
         
          if(getLocation){
            return false
          }else{
            return true
          }
        });

        // 如果选择城市的数组已经存在第一个值
        if (locations.length > 0) {
          let arr = locations.map((i, index) => {
            if (index == 0) {
              return getLocation
            } else {
              return i
            }
          })
          store.dispatch(actions[INDEX_CHANGELOCATION](arr))
          
          this.setState({
            Component:Com
          })
        }else{
          
          store.dispatch(actions[INDEX_ADDLOCATION](getLocation))
          this.setState({
            Component:Com
          })
        } 
       }
      });
    }
    render() {
      let Com=this.state.Component
      // console.log(Com)
      return Com?<Com {...this.props}/>:null
    }
  }
}




