import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import $ from 'jquery'
import { connect } from 'react-redux'

//確認框
import Swal from 'sweetalert2'
import { Modal } from 'react-bootstrap'

import '../../styles/ShoppingCar.scss'

import Mycart from '../../components/order/MyCart'
import CouponAllData from '../../components/coupon/CouponAllData'

function ShoppingCar(props) {
  const { mycart, buyerinfo, deleteCart, sum, userSuccess } = props
  let checkdiv

  //請先登入視窗
  const [login, setLogin] = useState(false)
  //結帳視窗
  const [checkoutok, setCheckoutok] = useState(false)

  //結帳視窗
  function MyCartDetail(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="modal-body">
          <div className="cartdetail-box">
            <div className="cartdetail-title">
              <p>訂單確認</p>
            </div>
            <hr />
            <div className="cartdetail-product-box">
              {mycart.map((item) => {
                return (
                  <>
                    <div className="cartdetail-product">
                      <div className="cartdetail-img">
                        <img
                          src={`http://localhost:5000/images/product/${item.productImg}`}
                        />
                      </div>
                      <div className="cartdetail-productinfo">
                        <p
                          className="cartdetail-productname"
                          title={item.productName}
                        >
                          {item.productName}
                        </p>
                        <p className="cartdetail-productamount">
                          數量:{item.amount}
                        </p>
                        <p className="cartdetail-productprice">
                          價格:NT$
                          {item.productPrice
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                        </p>
                        <p className="cartdetail-productdate">
                          日期:{item.date}
                        </p>
                      </div>
                      <div className="cartdetail-productsubtotal">
                        NT$
                        {(item.productPrice * item.amount)
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
            <hr />
            <div className="cartdetail-footer">
              <div className="cartdetail-subtotal">
                <p>總計:</p>
                <span>
                  NT$
                  {sum(mycart)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                </span>
              </div>
              <div className="cartdetail-coupon">
                <p>優惠碼{discountcode ? discountcode : '(未使用)'}:</p>
                <span>
                  -NT$
                  {Math.round(sum(mycart) * (1 - discount))
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                </span>
              </div>
              <div className="cartdetail-total">
                <p>結帳金額:</p>
                <span>
                  NT$
                  {Math.round(sum(mycart) * discount)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                </span>
              </div>
            </div>
            <hr />
            <div className="cartdetail-button">
              <button
                onClick={() => {
                  checkOutSend()
                }}
                className="cartdetail-button-ok"
              >
                確定送出
              </button>
              <button
                onClick={() => {
                  setCheckoutok(false)
                }}
                className="cartdetail-button-cancel"
              >
                取消
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
  //設置折扣
  const [discount, setDiscount] = useState(1)
  const [discountcode, setDiscountcode] = useState('')
  console.log('discountcode', discountcode)

  let discountline
  if (discount < 1) {
    discountline = (
      <div className="row justify-content-between">
        <div className="reduceTotal">折扣金額:</div>
        <div className="total">
          -NT$
          {Math.round(sum(mycart) * (1 - discount))
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

  //確認訂單
  const checkOut = () => {
    //判斷是否登入
    if (!userSuccess) {
      setLogin(true)
    } else {
      setCheckoutok(true)
    }
  }
  const checkOutSend = () => {
    setCheckoutok(false)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '送出成功，轉至結帳頁面',
      showConfirmButton: false,
      timer: 800,
    }).then(() => {
      let buydata = {
        product: [...mycart],
      }
      buydata.sumdiscount = Math.round(sum(mycart) * discount)
      buydata.sumless = Math.round(sum(mycart) * (1 - discount))
      buydata.discountcode = discountcode
      props.dispatch({ type: 'BUYER_DATA', value: buydata })
      props.dispatch({ type: 'GET_CART', value: [] })
      localStorage.removeItem('cart')
      props.history.push('/paymentDetail')
    })
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
        <div className="checkbox-footer">
          <div
            id="checkdiv"
            ref={(div) => (checkdiv = div)}
            className="totalbox bg-white d-flex"
          >
            <div className="cart-bottom-left">
              <CouponAllData
                onChange={(couponvalue) => setDiscount(couponvalue)}
                onBlur={(code) => setDiscountcode(code)}
              />
            </div>
            <div className="cart-bottom-mid">
              {discountline}
              <div className="row justify-content-between">
                <div>{mycart.length}個活動合計:</div>
                <span className="total">
                  NT$
                  {Math.round(sum(mycart) * discount)
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
      <MyCartDetail show={checkoutok} onHide={() => setCheckoutok(false)} />
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
