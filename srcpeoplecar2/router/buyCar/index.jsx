import React, { Component } from 'react'
import {
  Route,
  Switch
} from "react-router-dom"

import BuyCar from "../../components/buyCar/buyCar.jsx"
import Content from "../../components/buyCar/content.jsx"
import Order from "../../components/buyCar/order.jsx"
import Brand from "../../components/buyCar/brand.jsx"


// 高阶组件
import AsyncGetDataComponent from "../../components/hoc/asyncGetDataComponent"
import getLocation from "../../components/hoc/getLocation"
const renderRouter=()=>{
  return (
    <Switch>
        
        
        <Route path='/' render={childrenRouter}/>
    </Switch>
  )
}

const childrenRouter=()=>{
  return (
    <div>

        <BuyCar />
       
       <Switch>
        <Route path='/buycar/content' component={Content}/>
        <Route path='/buycar/order' component={Order}/>
        <Route path='/buycar/brand' component={Brand}/>
      </Switch> 
    </div>
    
  )
}


export default renderRouter