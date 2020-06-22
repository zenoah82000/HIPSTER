import { combineReducers } from 'redux'

const productData = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ProductCategory':
      return action.value
    default:
      return state
  }
}

const productReducer = combineReducers({
  productData,
})
export { productReducer }
