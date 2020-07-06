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
    case 'GET_ProductInfo':
      return action.payload
    default:
      return state
  }
}

const productMultiImg = (state = [], action) => {
  switch (action.type) {
    case 'GET_ProductMultiImg':
      return action.payload
    default:
      return state
  }
}

const productReducer = combineReducers({
  productCatogryData,
  productListData,
  productMultiImg,
})
export { productReducer }
