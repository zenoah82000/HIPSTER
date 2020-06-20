import { combineReducers } from 'redux'

// 新增訂單回傳資料
const memberCheckOutResponse = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_ORDER':
      return action.value
    default:
      return state
  }
}

const orderReducer = combineReducers({
  memberCheckOutResponse,
})
export { orderReducer }
