import React from "react"
import ReactDom from "react-dom"
import Router from "./router/index"
import {Provider} from "react-redux"
import store from "./redux"
import 'antd-mobile/dist/antd-mobile.css';
import './css/reset.css'
import './css/com.css'
ReactDom.render(
  <Provider store={store}>
    <Router />
  </Provider>  
  ,document.getElementById("root"))


