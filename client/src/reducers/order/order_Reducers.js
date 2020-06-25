import { combineReducers } from 'redux'
import { GiArcTriomphe } from 'react-icons/gi'

// 新增訂單回傳資料
const memberCheckOutResponse = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_ORDER':
      return action.value
    default:
      return state
  }
}
//購物車
const cartData = (state = [], action) => {
  switch (action.type) {
    case 'GET_CART':
      return action.value
    default:
      return state
  }
}
//願望清單
const wishData = (state = [], action) => {
  switch (action.type) {
    case 'GET_WISH':
      return action.value
    default:
      return state
  }
}
//買家資料
const buyerData = (state=[],action)=>{
  switch(action.type){
    case 'BUYER_DATA':
      return action.value
    default:
      return state
  }
}

const orderReducer = combineReducers({
  memberCheckOutResponse,
  cartData,
  wishData,
  buyerData
})
export { orderReducer }
