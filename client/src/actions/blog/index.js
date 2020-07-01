//取得文章列表資料
export const getBlogData = (payload) => {
  return { type: 'GET_BLOGDATA', payload }
}

export const getBlogDataAsync = () => {
  return async function getTotalFromServer(dispatch) {
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

// //取得文章評論
// export const getBlogCommentsData = data => ({
//   type: 'GET_BLOGCOMMENTSDATA',
//   value: data,
// })

// export const getBlogCommentsDataAsync = (blogCommentsData, callback) => {
//   console.log(blogCommentsData)
//   return async dispatch => {
//     const request = new Request('http://localhost:5000/blog/comments', {
//       method: 'GET',
//       headers: new Headers({
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       }),
//     })

//     // console.log(JSON.stringify(blogCommentsData))

//     const response = await fetch(request)
//     const data = await response.json()

//     dispatch(getBlogCommentsData(data))
//   }
// }

// //新增評論

// export const addContentCommentsData = data => ({
//   type: 'ADD_CONTENTCOMMENTSDATA',
//   value: data,
// })

// export const addContentCommentsDataAsync = (commentsData, callback) => {
//   console.log(commentsData)
//   return async dispatch => {
//     const request = new Request('http://localhost:5000/blog/addComments', {
//       method: 'POST',
//       body: commentsData,
//     })

//     const response = await fetch(request)
//     const data = await response.json()
//     console.log('res data', data)

//     dispatch(addContentCommentsData(data))

//     // callback()
//   }
// }

//新增文章
export const addBlogContentData = payload => ({
  type: 'ADD_BLOGCONTENTDATA',
  payload,
})

// 傳入的是FormData則不需要設定header
export const addBlogContentDataAsync = (addArticleFd) => {
  console.log('action中的addArticleFd',addArticleFd)
  return async dispatch => {
    const request = new Request('http://localhost:5000/blogadd', {
      method: 'POST',
      body: addArticleFd,
    })

    const response = await fetch(request)
    const payload = await response.json()
    console.log('res payload', payload)

    dispatch(addBlogContentData(payload))
  }
}

//更新文章
export const editContentData = payload => ({
  type: 'EDIT_CONTENTDATA',
  payload,
})
export const editContentDataAsync = (editArticleFd) => {
  console.log('action中的editArticleFd',editArticleFd)

  return async dispatch => {
    const request = new Request('http://localhost:5000/blogEdit', {
      method: 'POST',
      body: editArticleFd,
    })

    const response = await fetch(request)
    const payload = await response.json()
    console.log('res payload', payload)

    dispatch(editContentData(payload))
  }
}

//刪除文章
export const deleteContentData = payload => ({
  type: 'DELETE_CONTENTDATA',
  payload,
})
export const deleteContentDataAsync = (deleteArticleFd) => {
  console.log('action中的deleteArticleFd',deleteArticleFd)

  return async dispatch => {
    const request = new Request('http://localhost:5000/blogDelete', {
      method: 'POST',
      body: deleteArticleFd,
    })

    const response = await fetch(request)
    const payload = await response.json()
    console.log('res payload', payload)

    dispatch(deleteContentData(payload))
  }
}
