import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import $ from 'jquery'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//新增訂單
import { memberCheckOutAsync } from '../../actions/order/order_Actions'

//確認框
import Swal from 'sweetalert2'
import { Modal, Button, Form } from 'react-bootstrap'

import '../../styles/ShoppingCar.scss'

import Mycart from '../../components/order/MyCart'
import CouponAllData from '../../components/coupon/CouponAllData'

function ShoppingCar(props) {
  const { mycart, buyerinfo, deleteCart, sum, userSuccess } = props
  let checkdiv
  console.log(mycart)

  //請先登入視窗
  const [login, setLogin] = useState(false)
  //結帳視窗
  const [checkoutok, setCheckoutok] = useState(false)

  //設置折扣
  const [discount, setDiscount] = useState(1)

  let discountline
  if (discount < 1) {
    discountline = (
      <div className="row justify-content-between">
        <div className="reduceTotal">折扣金額:</div>
        <div className="total">
          -NT$
          {(sum(mycart) * (1 - discount))
            .toString()
            .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
        </div>
      </div>
    )
  } else {
    discountline = (
      <div className="row justify-content-between">
        <div className="reduceTotal">折扣金額:</div>
        <div className="total">0</div>
      </div>
    )
  }

  //請登入視窗
  function Checklogin(props) {
    return (
      <Modal
        className="SignOk"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="SignOk-bg">
          <p className="SignOk-title">請先登入</p>
          <div
            className="SignOkbtn"
            onClick={() => {
              setLogin(false)
            }}
          >
            確認
          </div>
        </Modal.Body>
      </Modal>
    )
  }
  //結帳視窗

  //前往結帳，送出訂單
  const checkOut = () => {
    //判斷是否登入
    if (!userSuccess) {
      setLogin(true)
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
        text: `確定商品總金額 NT$！${sum(mycart) * discount}`,
        icon: 'info',
        confirmButtonText: '確定',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonColor: 'rgba(104, 142, 103, 0.8)',
      }).then((result) => {
        if (result.value) {
          let buydata = {
            product: [...mycart],
          }
          props.dispatch({ type: 'BUYER_DATA', value: buydata })
          props.dispatch({ type: 'GET_CART', value: [] })
          localStorage.removeItem('cart')
          props.history.push('/paymentDetail')
        }
      })
    }
  }
  useEffect(() => {
    //捲動事件
    if (checkdiv) {
      $('#checkdiv').removeClass('checkfix')
      let scrollTop = $(window).scrollTop()
      let pageHeight = $(window).innerHeight()
      let checktop = $('#checkdiv').offset().top
      if (pageHeight + scrollTop > checktop) {
        $('#checkdiv').removeClass('checkfix')
      } else {
        $('#checkdiv').addClass('checkfix')
      }
      $(window).scroll(function () {
        scrollTop = $(this).scrollTop()
        if (pageHeight + scrollTop <= checktop) {
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
        <div
          id="checkdiv"
          ref={(div) => (checkdiv = div)}
          className="totalbox bg-white d-flex"
        >
          <div className="cart-bottom-left">
            <CouponAllData
              onChange={(couponvalue) => setDiscount(couponvalue)}
            />
          </div>
          <div className="cart-bottom-mid">
            {discountline}
            <div className="row justify-content-between">
              <div>{mycart.length}個活動合計:</div>
              <span className="total">
                NT$
                {(sum(mycart) * discount)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
              </span>
            </div>
          </div>
          <div className="cart-bottom-right">
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
        <Link className="emptylink" to="/productlist">
          快去選擇喜愛的活動吧!
        </Link>
      </div>
    )

  return (
    <>
      <Checklogin show={login} onHide={() => setLogin(false)} />
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
    buyerinfo: store.orderReducer.buyerData,
  }
}

export default withRouter(connect(mapStateToProps)(ShoppingCar))
