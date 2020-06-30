//得到QA資料
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

//新增QA
export const addUserQanda = (data) => ({
  type: 'ADD_UserQandaDATA',
  value: data,
})

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
    console.log('request', request)
    const response = await fetch(request)
    console.log('response', response)
    const data = await response.json()
    console.log('伺服器回傳的json資料', data)

    dispatch(addUserQandaDataAsync(data))
  }
}
