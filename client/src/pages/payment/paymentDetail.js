import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../../styles/Payment.scss'

//引入自訂元件

function PaymentDetail(props) {
  const [validated, setValidated] = useState(false)
  //取得購物車的資料,個人資料
  const { sum, buyerinfo, userSuccess } = props

  //需要輸入的欄位
  let email, phone, lastName, firstName

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
        product: [...buyerinfo.product],
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
            <div className="col-9">
              <div className=" mr-3">
                <div className="p-5 mt-3 contentBox">
                  <div className="subTitle">
                    <p>聯絡資訊</p>
                  </div>
                  <div className="d-flex">
                    <div className="col-4 form-group mx-1">
                      <label for="inputSelect  ">稱謂</label>
                      <select class="form-control" id="inputSelect">
                        <option>先生</option>
                        <option>小姐</option>
                      </select>
                    </div>
                    <div className="col-4 form-group mx-1">
                      <label for="inputLastname  ">姓氏</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputLastname"
                        placeholder="Last name"
                        ref={(input) => (lastName = input)}
                        required
                      />
                    </div>
                    <div className="col-4 form-group mx-1">
                      <label for="inputFirstname  ">名字</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputFirstname"
                        placeholder="First name"
                        ref={(input) => (firstName = input)}
                        required
                      />
                    </div>
                    
                  </div>
                  <div className="col-6 form-group">
                    <label for="inputNumber  ">聯絡電話</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputNumber"
                      placeholder=""
                      ref={(input) => (phone = input)}
                      pattern="09\d{2}\-?\d{3}\-?\d{3}"
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label for="email">電子郵件</label>
                    <Form.Group>
                      <Form.Control
                        required
                        ref={(input) => (email = input)}
                        name="email"
                        id="email"
                        size="lg"
                        type="email"
                        placeholder="電子郵件地址"
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

            <div className="col-3">
              <div className="mt-3">
                <div className="priceBox ">
                  <div className="totalPrice">
                    <div className="d-flex justify-content-between">
                      <p>總價</p>
                      <p>NT${sum(buyerinfo.product)}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>折價金額</p>
                      <p>NT$100</p>
                    </div>
                  </div>
                  <div className="payPrice">
                    <div className="d-flex justify-content-between">
                      <p>結帳金額</p>
                      <p>NT${sum(buyerinfo.product)}</p>
                    </div>
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
