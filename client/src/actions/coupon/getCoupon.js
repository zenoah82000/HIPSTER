//得到優惠券資料
export const getUserCouponDetail = (data) => ({
  type: 'GET_USERCOUPON',
  value: data,
})

export const getUserCouponDetaiAsync = (usercoupondata) => {
  return async (dispatch) => {
    const request = new Request(`http://localhost:5000/member/coupon/2`, {
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
