import React, { useEffect, useState } from 'react'
import '../../styles/ShoppingCar.scss'

import Mycart from '../../components/order/MyCart'

function ShoppingCar() {
  const [mycart, setMycart] = useState([])


  //取得購物車
  const localCart = JSON.parse(localStorage.getItem('cart'))
  async function getCartFromLocalStorage(){
    setMycart(localCart)
  }

  //把
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])
  
  return (
    <>
      <div className="container">
        <h1>購物車</h1>
        <div className="bg-white d-flex">
          <div className="col">
            <input type="checkbox" name="checkall" id="checkall" />
            <label for="checkall">全選</label>
          </div>
          <div className="col">
            <h6>活動</h6>
          </div>
          <div className="col">
            <h6>活動日期</h6>
          </div>
          <div className="col">
            <h6>數量</h6>
          </div>
          <div className="col">
            <h6>總價</h6>
          </div>
        </div>
        <div className="bg-white mt-2">
          <Mycart mycart={mycart}/>
        </div>
      </div>
    </>
  )
}
export default ShoppingCar
