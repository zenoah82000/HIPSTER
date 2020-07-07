//從資料庫獲得商品類別
export const getProductInfo = (payload) => ({
  type: 'GET_ProductInfo',
  payload,
})

export const getProductInfoAsync = (productId) => {
  return async (dispatch) => {
    const request = new Request(`http://127.0.0.1:5000/product/${productId}`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    // console.log(data)
    dispatch(getProductInfo(data))
  }
}
