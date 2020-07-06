import React, { useState } from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import '../../styles/Payment.scss'

import { FaCcMastercard, FaCcVisa } from 'react-icons/fa'

//引入自訂元件

function PaymentType(props) {
  const { sum, buyerinfo } = props

  //驗證表單
  const [validated, setValidated] = useState(false)
  //讀取會員
  const member =JSON.parse(localStorage.getItem('member'))
  //取得付款資訊
  const getpaymentType =(e)=>{
    let paymentType = {
      paymentType:e.target.id,
      ...buyerinfo
    }
    props.dispatch({ type: 'BUYER_DATA', value: paymentType })
    
  }
  //訂單初始化
  const orderData = {
    orderMemberId: member.id,
    orderItems: [],
  }
  let itemData = {}
  //訂單送出
  const checkoutAsync = async (order) => {
    const request = new Request('http://localhost:5000/member/checkout', {
      method: 'post',
      body: JSON.stringify(order),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    const orderId = { ...buyerinfo }
    orderId.orderId = data.orderId
    orderId.buytime = data.buytime
    props.dispatch({ type: 'BUYER_DATA', value: orderId })
  }
  const backPage = () => {
    props.history.push('/paymentDetail')
  }
  const checkOut = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
    } else if (form.checkValidity() === true) {
      e.preventDefault()
      let total = sum(buyerinfo.product)
      buyerinfo.product.forEach((item, i) => {
        itemData.productId = item.productId
        itemData.date = item.date
        itemData.name = item.productName
        itemData.checkPrice = item.productPrice
        itemData.checkQty = item.amount
        itemData.checkSubtotal = +item.productPrice * +item.amount
        orderData.orderItems.push(itemData)
        itemData = {}
      })
      //取得額外資訊
      orderData.total = total
      orderData.email = buyerinfo.email
      orderData.lastName=buyerinfo.lastName
      orderData.firstName=buyerinfo.firstName
      orderData.phone=buyerinfo.phone
      orderData.sumdiscount=buyerinfo.sumdiscount
      orderData.sumless=buyerinfo.sumless
      orderData.discountcode=buyerinfo.discountcode
      orderData.paymentType=buyerinfo.paymentType
      //訂單資料傳資料庫
      checkoutAsync(orderData)
      //跳轉頁面
      props.history.push('/paymentFinish')
    }
    setValidated(true)
  }
  //卡片輸入判斷
  const cardInput = (e) => {
    let length = $(e.currentTarget).val().length
    let maxlength = $(e.currentTarget).attr('maxlength')
    if (length == maxlength) {
      $(e.currentTarget).parent().next().find('.cardInput').focus() //要注意是不是同層
    } else {
      $(e.currentTarget).focus()
    }
  }
  return (
    <>
      <Form
        name="checkcard"
        noValidate
        validated={validated}
        onSubmit={(e) => {
          checkOut(e)
        }}
      >
      <div className="container mb-5">
        <div className="row">
          <div className="prograssBar2 mt-5"></div>
          <div className="col-9">
            <div className=" mr-3">
              <div className="p-5 mt-3 contentBox">
                <div className="paytitle-border">
                  <div className="subTitle">
                    <p>輸入信用卡資訊</p>
                  </div>
                </div>
                <Form.Group>
                <Form.Check
                  required
                  inline
                  name="card"
                  label="MasterCard"
                  type="radio"
                  id="MasterCard"
                  onChange={(e) => {
                    getpaymentType(e)
                    // $('#master').fadeToggle()
                    // $('#visa').fadeOut()
                  }}
                />
                <FaCcMastercard id="master" size="25px" display="none" />
                <Form.Check
                  required
                  inline
                  name="card"
                  label="VISA"
                  type="radio"
                  id="VISA"
                  onChange={(e) => {
                    getpaymentType(e)
                  }}
                />
                <FaCcVisa id="visa" size="25px" display="none" />
              </Form.Group>
                <Form.Row>
                  <Form.Group as={Col} xs={3} sm={3} md={3}>
                    <Form.Control
                      required
                      className="cardInput"
                      name="cardNumber"
                      size="lg"
                      type="text"
                      placeholder="0000"
                      maxlength="4"
                      pattern="[0-9]{4}"
                      onKeyUp={(e) => {
                        cardInput(e)
                      }}
                      // onBlur={(e) => getformInfo(e, 'cardNumber')}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={3} sm={3} md={3}>
                    <Form.Control
                      required
                      className="cardInput"
                      name="cardNumber"
                      size="lg"
                      type="text"
                      placeholder="0000"
                      maxlength="4"
                      pattern="[0-9]{4}"
                      onKeyUp={(e) => {
                        cardInput(e)
                      }}
                      // onBlur={(e) => getformInfo(e, 'cardNumber')}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={3} sm={3} md={3}>
                    <Form.Control
                      required
                      className="cardInput"
                      name="cardNumber"
                      size="lg"
                      type="text"
                      placeholder="0000"
                      maxlength="4"
                      pattern="[0-9]{4}"
                      onKeyUp={(e) => {
                        cardInput(e)
                      }}
                      // onBlur={(e) => getformInfo(e, 'cardNumber')}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={3} sm={3} md={3}>
                    <Form.Control
                      required
                      className="cardInput"
                      name="cardNumber"
                      size="lg"
                      type="text"
                      placeholder="0000"
                      maxlength="4"
                      pattern="[0-9]{4}"
                      onKeyUp={(e) => {
                        cardInput(e)
                      }}
                      // onBlur={(e) => getformInfo(e, 'cardNumber')}
                    />
                  </Form.Group>
                  <Form.Control.Feedback>正確!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    請輸入卡號
                  </Form.Control.Feedback>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} xs={3} sm={4} md={4}>
                    <Form.Control
                      required
                      name="valid"
                      size="lg"
                      type="text"
                      maxlength="5"
                      placeholder="MM/YY"
                      pattern="^\d{2}\/\d{2}$"
                    />
                    <Form.Control.Feedback>正確!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      請輸入到期月年
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={3} sm={3} md={3}>
                    <Form.Control
                      required
                      name="ccv"
                      size="lg"
                      type="text"
                      placeholder="安全碼"
                      maxlength="3"
                      pattern="^\d{3}$"
                    />
                    <Form.Control.Feedback>正確!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      請輸入安全碼
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={6} sm={5} md={5}>
                    <Form.Control
                      required
                      name="owner"
                      size="lg"
                      type="text"
                      placeholder="卡片持有人"
                      pattern="^\D+$"
                      // onChange={(e) => getformInfo(e, 'owner')}
                    />
                    <Form.Control.Feedback>正確!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      請輸入卡片持有人
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="mt-3">
              <div className="priceBox ">
                <div className="totalPrice">
                  <div className="d-flex justify-content-between ">
                    <p>總價</p>
                    <p>NT${sum(buyerinfo.product).toString()
                          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>折價金額</p>
                    <p>{buyerinfo.sumless.toString()
                          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}</p>
                  </div>
                </div>
                <div className="payPricebox d-flex justify-content-between">
                 
                    <p >結帳金額</p>
                    <p className="payPrice">NT${buyerinfo.sumdiscount
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}</p>
                  
                </div>
              </div>
              <div className="mt-3 buttonBox">
                <button
                  onClick={() => {
                    backPage()
                  }}
                >
                  返回上一步
                </button>
                <button
                type='submit'
                >
                  確認付款
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Form>
    </>
  )
}
const mapStateToProps = (store) => {
  return {
    mycart: store.orderReducer.cartData,
    buyerinfo: store.orderReducer.buyerData,
  }
}
const mapDispatchToProps = null
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PaymentType)
)
