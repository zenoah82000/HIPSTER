import { combineReducers } from 'redux'

const userCouponData = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERCOUPON':
      return action.value
    default:
      return state
  }
}

const couponReducer = combineReducers({
  userCouponData,
})
export { couponReducer }
