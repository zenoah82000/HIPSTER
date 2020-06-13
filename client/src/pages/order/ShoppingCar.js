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

  useEffect(() => {
    getCartFromLocalStorage()
  }, [])
  
  return (
    <>
      <div className="container">
        <h1 className="py-4">購物車</h1>
        <div className="bg-white d-flex p-2 align-items-center">
          <div className="col">
            <input type="checkbox" className="mr-4" name="checkall" id="checkall" />
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
          <div className="col text-right">
            <h6>總價</h6>
          </div>
        </div>
          <Mycart mycart={mycart}/>
          <div className="bg-white p-2 mt-3 d-flex">
            <div className="col-6">
              使用優惠券
            </div>
            <div className="col-6 text-right">
              <button>結算</button>
            </div>
            
          </div>
      </div>
    </>
  )
}
export default ShoppingCar
