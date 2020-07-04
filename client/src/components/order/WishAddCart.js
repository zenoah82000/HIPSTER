import React, { useState } from 'react'

import { GrFormAdd } from 'react-icons/gr'
import { GrFormSubtract } from 'react-icons/gr'
function WishAddCart(props) {
  const { addCart, addcartdata, setAddcartstatus } = props
  //加入購物車數量
  const [addcartamount, setAddcartamount] = useState(1)
  //加入購物車日期
  const [addcartdate, setAddcartdate] = useState('')
  //日期提示
  let isdate,date
  //增加到購物車
  const wishAddCart = () => {
    if(date.value){
      const newWish = { ...addcartdata }
      newWish.date = addcartdate
      newWish.amount = addcartamount
      addCart(newWish)
      setAddcartamount(1)
      setAddcartdate('')
      setAddcartstatus(false)
    }else{
      isdate.innerHTML='請選擇日期！'
    }
    
  }
  //數量
  const changeAmount = (type) => {
    switch (type) {
      case 'add':
        setAddcartamount(addcartamount + 1)
        break
      case 'dec':
        if (addcartamount <= 1) {
          setAddcartamount(1)
        } else {
          setAddcartamount(addcartamount - 1)
        }
    }
  }
  return (
    <>
      <div className="wish-addcartbox">
        <div className="wish-choosedate">
          <h6>選擇日期</h6>
          <input
            ref={input=>date=input}
            className="wish-date"
            type="date"
            min="2020-07-01"
            max="2020-08-01"
            value={addcartdate}
            onChange={(e) => {
              setAddcartdate(e.target.value)
            }}
          />
          <div className="wish-isdate" ref={div=>isdate = div}></div>
        </div>
        <div className="wish-chooseamount">
          <h6>選擇數量</h6>
          <div className="wish-amountbox">
            <span className="wish-price">單價NT${addcartdata.productPrice.toString()
                      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}</span>
            <GrFormSubtract
              className={
                addcartamount == 1 ? 'subtract subtractopt' : 'subtract'
              }
              onClick={() => {
                changeAmount('dec')
              }}
            />

            <input className="wish-amount" value={addcartamount} readOnly />
            <GrFormAdd
              className="amountadd"
              onClick={() => {
                changeAmount('add')
              }}
            />
          </div>
        </div>
        <div className="wish-total">
          <h6>費用</h6>
          <p>NT${(addcartdata.productPrice * addcartamount).toString()
                      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}</p>
        </div>
        <div className="wish-choosebutton">
          <button
            className="wish-button-ok"
            onClick={() => {
              wishAddCart()
            }}
          >
            確定
          </button>
          <button
            className="wish-button-cancel"
            onClick={() => {
              setAddcartstatus(false)
              setAddcartamount(1)
              setAddcartdate('')
            }}
          >
            取消
          </button>
        </div>
      </div>
    </>
  )
}

export default WishAddCart
