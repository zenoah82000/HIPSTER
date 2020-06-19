import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//新增訂單
import { memberCheckOutAsync } from '../../actions/order/order_Actions'

//確認框
import Swal from 'sweetalert2'

import '../../styles/ShoppingCar.scss'

import Mycart from '../../components/order/MyCart'

function ShoppingCar(props) {
  const{mycart,setMycart,deleteCart,sum}=props

  
  //訂單初始化
  const orderData = {
      
    orderItems: [],
  }
  let itemData = {}
  //前往結帳，送出訂單
  const checkOut = () => {
    if (mycart == null || mycart.length < 1) {
      Swal.fire({
        // title: 'Error!',
        text: '購物車是空的喔！',
        icon: 'warning',
        confirmButtonText: '確定',
      })
    } else {
      Swal.fire({
        // title: 'Error!',
        text: `確定商品總金額 NT$！${sum(mycart)}`,
        icon: 'info',
        confirmButtonText: '確定',
        showCancelButton: true,
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.value) {
          // for (let i = 0; i < localCart.length; i++) {
          //   console.log(localCart[i])
          //   itemData.orderItemId = localCart[i].id
          //   itemData.checkPrice = localCart[i].price
          //   itemData.checkQty = localCart[i].amount
          //   orderData.orderItems.push(itemData)
          //   itemData = {}
          // }
          // console.log(orderData)
          // props.memberCheckOutAsync(orderData)
          // orderData.orderItems = []
          // // 購物完清掉 localstorage 購物車
          // localStorage.removeItem('cart')
          // // window.location.href = '/member/checkout'
          props.history.push('/paymentDetail')
        }
      })
    }
  }
  
  const display =
    mycart != null && mycart.length >= 1 ? (
      <>
        <div className="mycartbox bg-white d-flex p-2 align-items-center">
          <div className="col-2">
            <input
              type="checkbox"
              className="mr-4"
              name="checkall"
              id="checkall"
            />
            <label for="checkall"><p>全選</p></label>
          </div>
          <div className="col-3">
            <p>活動名稱</p>
          </div>
          <div className="col-3">
            <p>活動日期</p>
          </div>
          <div className="col">
            <p>數量</p>
          </div>
          <div className="col text-right">
            <p>總價</p>
          </div>
        </div>
        <Mycart deleteCart={deleteCart} setMycart={setMycart} mycart={mycart} />
        <div className="totalbox bg-white p-2 mt-3 d-flex">
          <div className="col-6">使用優惠券</div>
          <div className="col-4 text-right total ">活動合計:<span className="total">NT${sum(mycart)}</span></div>
          <div className="col-2 text-right">
            <button
              className="button"
              onClick={() => {
                checkOut()
              }}
            >
              結算
            </button>
          </div>
        </div>
      </>
    ) : (
      <div className="empty text-center">
        <img
          className="emptyImg mb-3"
          src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
        />
        <p>購物車是空的!</p>
      </div>
    )

  return (
    <>
      <div className="container">
        <h1 className="py-4">購物車</h1>
        {display}
      </div>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ memberCheckOutAsync }, dispatch)
}
export default withRouter(connect(mapDispatchToProps)(ShoppingCar))
