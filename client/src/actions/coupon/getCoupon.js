//從賣家那裏得到優惠券的使用資料
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
    console.log(data)
    dispatch(getUserCouponDetail(data))
  }
}
