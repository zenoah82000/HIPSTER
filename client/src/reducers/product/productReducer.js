import { combineReducers } from 'redux'

const productCatogryData = (state = [], action) => {
  switch (action.type) {
    case 'GET_ProductCategory':
      return action.payload
    default:
      return state
  }
}

const productListData = (state = [], action) => {
  switch (action.type) {
    case 'GET_ProductList':
      return action.payload
    default:
      return state
  }
}

const productReducer = combineReducers({
  productCatogryData,
  productListData,
})
export { productReducer }
