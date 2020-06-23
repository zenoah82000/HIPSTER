import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import $ from 'jquery'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//新增訂單
import { memberCheckOutAsync } from '../../actions/order/order_Actions'

//確認框
import Swal from 'sweetalert2'

import '../../styles/ShoppingCar.scss'

import Mycart from '../../components/order/MyCart'

function ShoppingCar(props) {
  const { mycart, deleteCart, sum, userSuccess } = props
  let checkdiv
  //訂單初始化
  const orderData = {
    orderItems: [],
  }
  let itemData = {}
  //前往結帳，送出訂單
  const checkOut = () => {
    //判斷是否登入
    if (!userSuccess) {
      alert('請登入')
    } else if (mycart == null || mycart.length < 1) {
      Swal.fire({
        // title: 'Error!',
        text: '購物車是空的喔！',
        icon: 'warning',
        confirmButtonText: '確定',
        confirmButtonColor: 'rgba(104, 142, 103, 0.8)',
      })
    } else {
      Swal.fire({
        // title: 'Error!',
        text: `確定商品總金額 NT$！${sum(mycart)}`,
        icon: 'info',
        confirmButtonText: '確定',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonColor: 'rgba(104, 142, 103, 0.8)',
      }).then((result) => {
        if (result.value) {
          props.history.push('/paymentDetail')
        }
      })
    }
  }
  useEffect(() => {
    if (checkdiv) {
      let pageHeight = $(window).innerHeight()
      let navTop = $('#checkdiv').offset().top
      if (navTop > pageHeight) $('#checkdiv').addClass('checkfix')
      $(window).scroll(function () {
        let scrollTop = $(this).scrollTop()
        pageHeight = $(this).innerHeight()
        if (pageHeight + scrollTop <= navTop) {
          $('#checkdiv').addClass('checkfix')
        } else {
          $('#checkdiv').removeClass('checkfix')
        }
      })
    }
  }, [mycart])

  const display =
    mycart.length != null && mycart.length >= 1 ? (
      <>
        <div className="cart-title">
          <div className="productname">
            <p>活動名稱</p>
          </div>
          <div className="productright">
            <div className="productdate">
              <p>活動日期</p>
            </div>
            <div className="productamount">
              <p>數量</p>
            </div>
            <div className="producttoal">
              <p>總價</p>
            </div>
          </div>
        </div>
        <Mycart deleteCart={deleteCart} mycart={mycart} />
        <div id="checkdiv" ref={div=>checkdiv=div} className="totalbox bg-white p-2 mt-3 d-flex">
          <div className="col-6">使用優惠券</div>
          <div className="col-4 text-right total ">
            活動合計:<span className="total">NT${sum(mycart)}</span>
          </div>
          <div className="col-2 text-right">
            <button
              className="button"
              onClick={() => {
                checkOut()
              }}
            >
              結帳
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

const mapStateToProps = (store) => {
  return {
    mycart: store.orderReducer.cartData,
  }
}

export default withRouter(connect(mapStateToProps)(ShoppingCar))
