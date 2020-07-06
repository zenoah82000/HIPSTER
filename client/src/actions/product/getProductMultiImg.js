//從資料庫獲得商品類別
export const getProductMultiImg = (payload) => ({
  type: 'GET_ProductMultiImg',
  payload,
})

export const getProductMultiImgAsync = (productId) => {
  return async (dispatch) => {
    const request = new Request(
      `http://127.0.0.1:5000/productImgs/${productId}`,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )

    const response = await fetch(request)
    const data = await response.json()
    console.log(data)
    dispatch(getProductMultiImg(data))
  }
}
