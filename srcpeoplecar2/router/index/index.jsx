import React, { Component } from 'react'
import {
  Route,
  Switch
} from "react-router-dom"
import Index from "../../components/index/index.jsx"
import ChooseLocation from "../../components/index/chooseLocation"
import ChooseLicencePlate from "../../components/index/chooseLicencePlate"

// 高阶组件
import AsyncGetDataComponent from "../../components/hoc/asyncGetDataComponent"
import getLocation from "../../components/hoc/getLocation"
const renderRouter=()=>{
  return (
    <Switch>
        <Route exact path='/' component={Index}/>
        <Route exact path='/chooseLocation' component={ChooseLocation}/>
        <Route exact path='/chooseLicencePlate' component={ChooseLicencePlate}/>
    </Switch>
  )
}

export default renderRouter