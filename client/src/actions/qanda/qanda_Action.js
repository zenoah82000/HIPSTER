//得到使用者QA資料
export const getUserQandaDetail = (data) => ({
  type: 'GET_USERQANDA',
  value: data,
})

export const getUserQandaAsync = (userqamdadata) => {
  return async (dispatch) => {
    const request = new Request(`http://localhost:5000/member/qanda`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('getUserQA', data.qalist)
    dispatch(getUserQandaDetail(data.qalist))
  }
}

//得到產品QA資料
export const getProductQandaDetail = (data) => ({
  type: 'GET_PRODUCTQANDA',
  value: data,
})

export const getProductQandaAsync = (userqamdadata) => {
  return async (dispatch) => {
    const request = new Request(`http://localhost:5000/product/qanda`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('getProductQA', data.qalist)
    dispatch(getProductQandaDetail(data.qalist))
  }
}

//新增QA
export const addUserQanda = (data) => {
  return {
    type: 'ADD_UserQandaDATA',
    value: data,
  }
}

export const addUserQandaDataAsync = (addqandaData, callback) => {
  console.log('addqandaData', addqandaData)
  return async (dispatch) => {
    const request = new Request('http://localhost:5000/member/addqa', {
      method: 'POST',
      body: JSON.stringify(addqandaData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    // console.log('request', request)
    const response = await fetch(request)
    // console.log('response', response)
    const data = await response.json()
    // console.log('伺服器回傳的json資料', data)

    dispatch(addUserQanda(addqandaData))
    // window.location.reload()
  }
}
