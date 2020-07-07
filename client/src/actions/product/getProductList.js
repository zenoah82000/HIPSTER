//從資料庫獲得商品類別
export const getProductList = (payload) => ({
  type: 'GET_ProductList',
  payload,
})

export const getProductListAsync = (product) => {
  return async (dispatch) => {
    const request = new Request('http://127.0.0.1:5000/productList', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    // console.log(data)
    dispatch(getProductList(data))
  }
}
