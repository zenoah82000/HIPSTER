import { combineReducers } from 'redux'

const userCouponData = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERCOUPON':
      return action.value
    default:
      return state
  }
}

//新增優惠券
const adduserCouponData = (state = [], action) => {
  switch (action.type) {
    case 'ADD_UserCouponDATA':
      return action.value
    default:
      return state
  }
}

const couponReducer = combineReducers({
  userCouponData,
  adduserCouponData,
})
export { couponReducer }
