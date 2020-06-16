export const memberCheckOut = (data) => ({
  type: 'NEW_ORDER',
  value: data,
})

//新增訂單
export const memberCheckOutAsync = (orderData) => {
  orderData = JSON.stringify(orderData)
  return async (dispatch) => {

    const request = new Request(`http://127.0.0.1:5000/member/checkout`, {
      method: 'POST',
      body: orderData,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    dispatch(memberCheckOut(data))
    // window.location.href = '/member/checkout'
  }
}
