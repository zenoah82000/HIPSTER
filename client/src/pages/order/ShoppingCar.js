import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { memberCheckOutAsync } from '../../actions/order/order_Actions'

//確認框
import Swal from 'sweetalert2'

import '../../styles/ShoppingCar.scss'

import Mycart from '../../components/order/MyCart'

function ShoppingCar(props) {
  const [mycart, setMycart] = useState([])

  //取得購物車
  const localCart = JSON.parse(localStorage.getItem('cart'))
  async function getCartFromLocalStorage() {
    setMycart(localCart)
  }

  //購物車金額加總
  const sum = (items) => {
    let total = 0
    if (items != null) {
      for (let i = 0; i < items.length; i++) {
        total += items[i].amount * items[i].price
      }
    }
    return total
  }
  //訂單初始化
  const orderData = {
    orderItems: [],
  }
  let itemData = {}
  //前往結帳，送出訂單
  const checkOut = () => {
    if (localCart == null || localCart.length < 1) {
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
        if (result.value === true) {
          for (let i = 0; i < localCart.length; i++) {
            console.log(localCart[i])
            itemData.orderItemId = localCart[i].id
            itemData.checkPrice = localCart[i].price
            itemData.checkQty = localCart[i].amount
            orderData.orderItems.push(itemData)
            itemData = {}
          }
          console.log(orderData)
          props.memberCheckOutAsync(orderData)
          orderData.orderItems = []
          // 購物完清掉 localstorage 購物車
          localStorage.removeItem('cart')
          // window.location.href = '/member/checkout'
          props.history.push('/paymentDetail')
        }
      })
    }
  }
  const display =
    mycart != null && mycart.length >= 1 ? (
      <>
        <div className="bg-white d-flex p-2 align-items-center">
          <div className="col">
            <input
              type="checkbox"
              className="mr-4"
              name="checkall"
              id="checkall"
            />
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
        <Mycart mycart={mycart} />
        <div className="bg-white p-2 mt-3 d-flex">
          <div className="col-6">使用優惠券</div>
          <div className="col-6 text-right">
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
      <h2>購物車是空的</h2>
    )
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

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
