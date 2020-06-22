import { combineReducers } from 'redux'

const blogList = (state = [], action) => {
  switch (action.type) {    
    case 'GET_BLOGDATA':
      return action.payload.value
    default:
      return state
  }
}

export const blogReducer = combineReducers({
  blogList,
})
