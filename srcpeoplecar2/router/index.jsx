import React, { Component } from 'react'
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Route,Switch} from "react-router-dom"

import Index from "./index/index.jsx"  
import buyCar from "./buyCar/index.jsx"  
const baseRouter=()=>{
  return (
  <Router basename="/">
      <Switch>
          <Route path='/buycar' render={buyCar}/>
          <Route path='/' render={Index}/>
        </Switch> 
  </Router> )
}




export default baseRouter