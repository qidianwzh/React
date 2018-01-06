import {createStore} from "redux"

export * from "./actions_type"

import Reducer from "./reducer"
export * from "./actions"
export default new createStore(Reducer)
