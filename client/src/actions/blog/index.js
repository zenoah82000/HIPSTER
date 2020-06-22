export const getBlogData = (payload) => {
  return { type: 'GET_BLOGDATA', payload }
}

export const getBlogDataAsync = (payload) => {
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
    const data = await response.json()
    // console.log(data)
    // 設定資料
    console.log('getBlogDataAsync中的data',data)

    dispatch(getBlogData({ value: data.rows }))
  }
}
