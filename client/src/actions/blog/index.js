//取得文章列表資料
export const getBlogData = (payload) => ({ 
  type: 'GET_BLOGDATA', payload
})

export const getBlogDataAsync = ()=>{
  return async (dispatch)=>{
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/blog', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const payload = await response.json()
    // console.log(payload)
    // 設定資料
    console.log('getBlogDataAsync中的payload',payload)

    dispatch(getBlogData(payload.rows))
  }
}

//新增文章
export const addBlogData = payload => ({
  type: 'ADD_BLOGCONTENTDATA',
  payload,
})

// 傳入的是FormData則不需要設定header
export const addBlogDataAsync = (addArticleFd) => {
  console.log('action中的addArticleFd',addArticleFd)
  return async dispatch => {
    const request = new Request('http://localhost:5000/blogadd', {
      method: 'POST',
      body: addArticleFd,
    })

    const response = await fetch(request)
    const payload = await response.json()
    console.log('res payload', payload)

    dispatch(addBlogData(payload))
  }
}

//更新文章
export const editBlogData = payload => ({
  type: 'EDIT_CONTENTDATA',
  payload,
})
export const editBlogDataAsync = (editArticleFd) => {
  console.log('action中的editArticleFd',editArticleFd)

  return async dispatch => {
    const request = new Request('http://localhost:5000/blogEdit', {
      method: 'POST',
      body: editArticleFd,
    })

    const response = await fetch(request)
    const payload = await response.json()
    console.log('res payload', payload)

    dispatch(editBlogData(payload))
  }
}

//刪除文章
export const deleteBlogData = payload => ({
  type: 'DELETE_CONTENTDATA',
  payload,
})
export const deleteBlogDataAsync = (deleteArticleFd) => {
  console.log('action中的deleteArticleFd',deleteArticleFd)

  return async dispatch => {
    const request = new Request('http://localhost:5000/blogDelete', {
      method: 'POST',
      body: deleteArticleFd,
    })

    const response = await fetch(request)
    const payload = await response.json()
    console.log('res payload', payload)

    dispatch(deleteBlogData(payload))
  }
}

//取得文章評論
export const getBlogCommentsData = payload => ({
  type: 'GET_BLOGCOMMENTSDATA', payload,
})

export const getBlogCommentsDataAsync = (blogCommentsData) => {
  console.log(blogCommentsData)
  return async dispatch => {
    const request = new Request('http://localhost:5000/blogComment', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    // console.log(JSON.stringify(blogCommentsData))

    const response = await fetch(request)
    const payload = await response.json()

    dispatch(getBlogCommentsData(payload.rows))
  }
}

//新增文章評論
export const addBlogCommentsData = payload => ({
  type: 'ADD_BLOGCOMMENTSDATA',
  payload,
})

export const addBlogCommentsDataAsync = (addBlogCommentFd) => {
  console.log(addBlogCommentFd)
  return async dispatch => {
    const request = new Request('http://localhost:5000/blogAddComment', {
      method: 'POST',
      body: addBlogCommentFd,
    })

    const response = await fetch(request)
    const payload = await response.json()
    console.log('res payload', payload)

    dispatch(addBlogCommentsData(payload))
  }
}