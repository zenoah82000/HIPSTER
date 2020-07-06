import { combineReducers } from 'redux'

//取得文章列表資料
const blogData = (state = [], action) => {
  switch (action.type) {    
    case 'GET_BLOGDATA':
      return action.payload
    default:
      return state
  }
}

//新增文章
const addBlogData = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_BLOGCONTENTDATA':
      return action.payload
    default:
      return state
  }
}

//更新文章
const editBlogData = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_CONTENTDATA':
      return action.payload
    default:
      return state
  }
}

//刪除文章
const deleteBlogData = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_CONTENTDATA':
      return action.payload
    default:
      return state
  }
}

//取得文章評論資料
const blogCommentsData = (state = [], action) => {
  switch (action.type) {
    case 'GET_BLOGCOMMENTSDATA':
      return action.payload
    default:
      return state
  }
}

//新增文章評論
const addBlogCommentsData = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOGCOMMENTSDATA':
      return action.payload
    default:
      return state
  }
}

export const blogReducer = combineReducers({
  blogData,
  addBlogData,
  editBlogData,
  deleteBlogData,
  blogCommentsData,
  addBlogCommentsData,
})
