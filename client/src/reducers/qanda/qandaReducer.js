import { combineReducers } from 'redux'

const userQandaData = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERQANDA':
      return action.value
    default:
      return state
  }
}

//新增QA
const adduserQandaData = (state = [], action) => {
  switch (action.type) {
    case 'ADD_UserQandaDATA':
      return action.value
    default:
      return state
  }
}

const qandaReducer = combineReducers({
  userQandaData,
  adduserQandaData,
})
export { qandaReducer }
