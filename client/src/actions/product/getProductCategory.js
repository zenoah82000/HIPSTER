//從資料庫獲得商品類別
export const getProductCategory = (data) => ({
  type: 'GET_ProductCategory',
  value: data,
})

export const getProductCategoryAsync = (productCategory) => {
  return async (dispatch) => {
    const request = new Request('http://127.0.0.1:5000/productCategory', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log(data)
    dispatch(getProductCategory(data))
  }
}
