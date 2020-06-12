import React, { useEffect, useState } from 'react'
import '../../styles/ShoppingCar.scss'

function ShoppingCar() {
  return (
    <>
      <div className="container">
        <h1>購物車</h1>
        <div className="bg-white d-flex">
          <input type="checkbox" name="checkall" id="checkall" />
          <label for="checkall">全選</label>
          <div>
            <h6>活動</h6>
          </div>
          <div>
            <h6>活動日期</h6>
          </div>
          <div>
            <h6>數量</h6>
          </div>
          <div>
            <h6>總價</h6>
          </div>
        </div>
      </div>
    </>
  )
}
export default ShoppingCar
