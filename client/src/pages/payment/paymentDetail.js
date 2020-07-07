import React, { useState, useEffect } from 'react'

import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../../styles/Payment.scss'

import OrderDetail from '../../components/order/OrderDetail'

//引入自訂元件

function PaymentDetail(props) {
  const [validated, setValidated] = useState(false)
  //取得購物車的資料,個人資料
  const { sum, buyerinfo, userSuccess } = props

  const [paymentDetailok, setPaymentDetailok] = useState(false)

  //需要輸入的欄位
  let email, phone, lastName, firstName
  useEffect(() => {
    email.value = buyerinfo.email || ''
    phone.value = buyerinfo.phone || ''
    lastName.value = buyerinfo.lastName || ''
    firstName.value = buyerinfo.firstName || ''
  }, [])
  //下一頁(填寫付款資訊)
  const nextPage = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
    } else if (form.checkValidity() === true) {
      e.preventDefault()
      let data = {
        email: email.value,
        phone: phone.value,
        lastName: lastName.value,
        firstName: firstName.value,
        ...buyerinfo,
      }
      props.dispatch({ type: 'BUYER_DATA', value: data })
      props.history.push('/paymentType')
    }
    setValidated(true)
  }
  //上一頁(返回購物車)
  const backPage = () => {
    if (buyerinfo.product) {
      props.dispatch({ type: 'GET_CART', value: buyerinfo.product })
      localStorage.setItem('cart', JSON.stringify(buyerinfo.product))
      props.history.push('/shoppingcar')
    }
    props.history.push('/shoppingcar')
  }
  return (
    <>
      <OrderDetail
        sum={sum}
        paymentDetailok={paymentDetailok}
        setPaymentDetailok={setPaymentDetailok}
      />
      <Form
        name="checkout"
        noValidate
        validated={validated}
        onSubmit={(e) => {
          nextPage(e)
        }}
      >
        <div className="container mb-5">
          <div className="row">
            <div className="prograssBar1 mt-5"></div>
            <div className="col-12 col-md-9">
              <div className="payment-mr">
                <div className="p-5 mt-3 contentBox">
                  <div className="paytitle-border">
                    <div className="subTitle">
                      <p>聯絡資訊</p>
                    </div>
                  </div>

                  <div className="">
                    <Form.Row>
                      <Form.Group as={Col} sm={12} md={6}>
                        <Form.Control
                          required
                          name="lastName"
                          size="lg"
                          type="text"
                          placeholder="姓氏"
                          ref={(input) => (lastName = input)}
                        />
                        <Form.Control.Feedback>正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          請輸入姓氏
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} sm={12} md={6}>
                        <Form.Control
                          required
                          name="firstName"
                          size="lg"
                          type="text"
                          placeholder="名字"
                          ref={(input) => (firstName = input)}
                          // onChange={(e) => getformInfo(e, 'firstName')}
                        />
                        <Form.Control.Feedback>正確!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          請輸入名字
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>

                    <Form.Group>
                      <Form.Control
                        required
                        id="mobile"
                        name="mobile"
                        size="lg"
                        type="text"
                        placeholder="行動電話或家用電話"
                        ref={(input) => (phone = input)}
                        pattern="^09[0-9]{2}-?[0-9]{3}-?[0-9]{3}$|^\(?\d{2,3}\)?-?\d{4}-?\d{4}$"
                        // onChange={(e) => getformInfo(e, 'mobile')}
                      />
                      <Form.Control.Feedback>正確!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        請輸入正確的電話號碼
                      </Form.Control.Feedback>
                      <br />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        required
                        ref={(input) => (email = input)}
                        name="email"
                        id="email"
                        size="lg"
                        type="email"
                        placeholder="電子郵件地址"
                        ref={(input) => (email = input)}
                        pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{3,6}(?:\.[a-z]{2})?)$"
                        // onChange={(e) => getformInfo(e, 'email')}
                      />
                      <Form.Control.Feedback>正確!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        請輸入email
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="mt-3">
                <div className="priceBox ">
                  <input
                    className="checkout-info-button"
                    value="檢視訂單資料"
                    type="button"
                    onClick={() => {
                      setPaymentDetailok(true)
                    }}
                  />
                  <div className="totalPrice">
                    <div className="d-flex justify-content-between">
                      <p>總價</p>
                      <p>
                        NT$
                        {sum(buyerinfo.product)
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>折價金額</p>
                      <p>
                        -NT$
                        {buyerinfo.sumless
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                      </p>
                    </div>
                  </div>
                  <div className="payPricebox d-flex justify-content-between">
                    <p>結帳金額</p>
                    <p className="payPrice">
                      NT$
                      {buyerinfo.sumdiscount
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                    </p>
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
                  <button type="submit">下一步</button>
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
  connect(mapStateToProps, mapDispatchToProps)(PaymentDetail)
)
