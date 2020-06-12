import React, { useEffect, useState } from 'react'
import '../styles/ShoppingCar.scss'



function ShoppingCar() {
  

  return (
    <>
      <div className="container d-flex">
                <input type="checkbox" name="checkall" id="checkall" />
                <label for="checkall">全選</label>
                <div className="col">
                  <h6>數量</h6>
                </div>
                <div className="col">
                  <h6>金額</h6>
                </div>
            </div>
    
    </>
  )
}
export default ShoppingCar

