import { 
  INDEX_ADDLOCATION,
  INDEX_CHANGELOCATION,
  INDEX_CHANGELICENCEPLATE ,
  INDEX_ADDCARLIST,
  BUYCAR_CHANGEHANDLE,
  BUYCAR_ORDERTYPE,
  BUYCAR_COLLECTSTATE
} from "./actions_type"

export const actions = {
  [INDEX_ADDLOCATION]: (item) => {
    console.log(item)
    return {
      type: INDEX_ADDLOCATION,
      text: item
    }
  },
  [INDEX_CHANGELOCATION]: (item) => {
   
    return {
      type: INDEX_CHANGELOCATION,
      text: item
    }
  },
  [INDEX_CHANGELICENCEPLATE]: (item) => {
    
     return {
       type: INDEX_CHANGELICENCEPLATE,
       text: item
     }
   },
   [INDEX_ADDCARLIST]: (item) => {
    
     return {
       type: INDEX_ADDCARLIST,
       text: item
     }
   },
   [BUYCAR_CHANGEHANDLE]: (item) => {
    
     return {
       type: BUYCAR_CHANGEHANDLE,
       text: item
     }
   },
   [BUYCAR_ORDERTYPE]: (item) => {
    
     return {
       type: BUYCAR_ORDERTYPE,
       text: item
     }
   },
   [BUYCAR_COLLECTSTATE]: (item) => {
    
     return {
       type: BUYCAR_COLLECTSTATE,
       text: item
     }
   }
}