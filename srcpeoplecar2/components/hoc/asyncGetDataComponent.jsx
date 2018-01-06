import React, { Component } from "react";

export default function asyncComponent(getDataComponent, argData) {
  //(组件,请求数据地址)
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      
      const getDataFn = (i) => {
        // console.log(i)
        const {url,arg,type}=i
        return new Promise((resolve, reject) => {
          // 封装的fetch的post方法
          if (type == "post") {

            fetch(url, { method: "post", body: arg }).then((data) => {
              return data.json()
            }).then((data) => {
              console.log(data)
              resolve(data)
              
            }).catch((err)=>{
              reject(err)
            })
          } else {

            fetch(url).then((data) => {
              return data.json()
            }).then((data) => {
             console.log(data)//请求到数据之后传给 getDataAsync().then((data))
              resolve(data)
              
            }).catch((err)=>{
              reject(err)
            })
          }
        })

      }
      if (argData!= undefined) {
          const getDataAsync=async function(){
            // console.log(argData)//{url: "/cityList"}
            let arr=[]
            for(var i=0;i<argData.length;i++){
              const getIData=await getDataFn(argData[i])
              arr.push(getIData)
            }
             return arr
          }
          getDataAsync().then((data)=>{
            // console.log(data)
            this.setState({
              asyncData: data, //城市数据
              Component: getDataComponent //调用时传的形参
            })
          }).catch((err)=>{
              
          })
      }
      this.state = {
        asyncData: null,
        Component: null
      };
    }

    render() {
      // console.log(222)
      const C = this.state.Component;

      return C ? <C {...this.props} getData={this.state.asyncData} /> : null;
    }
  }

  return AsyncComponent;
}