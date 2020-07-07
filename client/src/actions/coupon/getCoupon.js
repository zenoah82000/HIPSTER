//得到使用者優惠券資料
export const getUserCouponDetail = (data) => ({
  type: 'GET_USERCOUPON',
  value: data,
})

export const getUserCouponDetaiAsync = (usercoupondata) => {
  return async (dispatch) => {
    const request = new Request(`http://localhost:5000/member/coupon`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('getUserCouponDetail-data', data.coupon)
    dispatch(getUserCouponDetail(data.coupon))
  }
}

//得到全部優惠券資料
export const getAllCouponDetail = (data) => ({
  type: 'GET_ALLCOUPON',
  value: data,
})

export const getAllCouponDetaiAsync = (allcoupondata) => {
  return async (dispatch) => {
    const request = new Request(`http://localhost:5000/all/coupon`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log('getallCouponDetail-data', data.coupon)
    dispatch(getAllCouponDetail(data.coupon))
  }
}

//新增優惠券
export const addUserCoupon = (data) => {
  console.log('Action addUserCoupon', data)
  return {
    type: 'ADD_UserCouponDATA',
    value: data,
  }
}

export const addUserCouponDataAsync = (addcouponData, callback) => {
  console.log('addcouponData', addcouponData)
  return async (dispatch) => {
    const request = new Request('http://localhost:5000/member/addcoupon', {
      method: 'POST',
      body: JSON.stringify(addcouponData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    // console.log('request', request)
    const response = await fetch(request)
    // console.log('response', response)
    const data = await response.json()
    console.log('伺服器回傳的json資料', data)

    dispatch(addUserCoupon(addcouponData))
    window.location.reload()
  }
}

//更新優惠券數量
export const updateUserCoupon = (data) => {
  console.log('Action addUserCoupon', data)
  return {
    type: 'UPDATE_USERCOUPON',
    value: data,
  }
}

export const updateUserCouponAsync = (updatecouponData, callback) => {
  console.log('updatecouponData', updatecouponData)
  return async (dispatch) => {
    const request = new Request('http://localhost:5000/couponUpdate', {
      method: 'POST',
      body: JSON.stringify(updatecouponData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    // console.log('request', request)
    const response = await fetch(request)
    // console.log('response', response)
    const data = await response.json()
    console.log('伺服器回傳的json資料', data)

    dispatch(updateUserCoupon(updatecouponData))
    window.location.reload()
  }
}
