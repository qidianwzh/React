import {
  INDEX_ADDLOCATION,
  INDEX_CHANGELOCATION,
  INDEX_CHANGELICENCEPLATE,
  INDEX_ADDCARLIST,
  BUYCAR_CHANGEHANDLE,
  BUYCAR_ORDERTYPE,
  BUYCAR_COLLECTSTATE
} from "./actions_type"
import State from "./state"

const reducer = (state = State, actions) => {
  const { type, text } = actions
  switch (type) {
    case INDEX_ADDLOCATION: {
      const arr = [...state.locations]
      arr.push(text)
      console.log(arr)
      return Object.assign({}, state, { locations: arr })
    } break;
    case INDEX_CHANGELOCATION: {
      return Object.assign({}, state, { locations: text })
    } break;
    case INDEX_CHANGELICENCEPLATE: {
      return Object.assign({}, state, { licencePlate: text })
    } break;
    case INDEX_ADDCARLIST: {
     let data= text.map(function(arr) {
          let oneArr=arr.map((i)=>{
             let iArr=i.carList.map((j)=>{
                  j.state=false
                  return j
              })
              i.carList=iArr
              return i
          })
          return oneArr
      });
      console.log(data)
      return Object.assign({}, state, { carList: data })
    } break;
    case BUYCAR_CHANGEHANDLE: {
    
      return Object.assign({}, state, { buyCarHandleFn: text })
    } break;
    case BUYCAR_ORDERTYPE: {
     
      return Object.assign({}, state, { orderType: text })
    } break;
    case BUYCAR_COLLECTSTATE: {
      let data= state.carList.map(function(arr) {
          let oneArr=arr.map((i)=>{
             let iArr=i.carList.map((j)=>{
                  if(j.carName==text.carName){
                    j.state=!j.state
                  }
                  return j
              })
              i.carList=iArr
              return i
          })
          return oneArr
      });
      return Object.assign({}, state, { carList: data })
    } break;
    default: {
      return state
    }
  }
}

export default reducer