import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../styles/Payment.scss'
import { GrNext } from 'react-icons/gr'
import { BsExclamationCircle } from 'react-icons/bs'

//引入自訂元件

function paymentDetail(props) {
  //取得購物車的資料,個人資料
  const { sum, buyerinfo } = props

  //需要輸入的欄位
  let email, phone, lastName, firstName

  //下一頁(填寫付款資訊)
  const nextPage = () => {
    if (
      email.value == '' ||
      phone.value == '' ||
      lastName.value == '' ||
      firstName.value == ''
    ) {
      return
    }
    let data = {
      email: email.value,
      phone: phone.value,
      lastName: lastName.value,
      firstName: firstName.value,
      product:[...buyerinfo.product]
    }
    props.dispatch({ type: 'BUYER_DATA', value: data })
    props.history.push('/paymentType')
  }
  //上一頁(返回購物車)
  const backPage = () => {
    console.log(buyerinfo)
    props.history.push('/shoppingcar')
  }
  return (
    <>
      <form
        action=""
        method=""
        onSubmit={() => {
          return false
        }}
      >
        <div className="container mb-5">
          <div className="row">
            <div className="prograssBar1 mt-5"></div>
            <div className="col-9">
              <div className=" mr-3">
                <div className="p-5 mt-3 contentBox">
                  <div className="subTitle">
                    <p>填寫附加資訊</p>
                  </div>
                  <div className="col-6 form-group">
                    <label for="inputEmail  ">電子郵件*</label>
                    <input
                      ref={(input) => {
                        const email = input
                      }}
                      type="email"
                      class="form-control"
                      id="inputEmail"
                      placeholder="name@example.com"
                      required
                      ref={(input) => (email = input)}
                    />
                  </div>
                  <div className="subTitle mt-5">
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
                      <label for="inputFirstname  ">名字(需與護照一致)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputFirstname"
                        placeholder="First name"
                        ref={(input) => (firstName = input)}
                        required
                      />
                    </div>
                    <div className="col-4 form-group mx-1">
                      <label for="inputLastname  ">姓氏(需與護照一致)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputLastname"
                        placeholder="Last name"
                        ref={(input) => (lastName = input)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-6 form-group">
                    <label for="inputNumber  ">聯絡電話*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputNumber"
                      placeholder=""
                      ref={(input) => (phone = input)}
                    
                    />
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
                      <p>NT 100</p>
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
                  <button
                    type="submit"
                    onClick={() => {
                      nextPage()
                    }}
                  >
                    下一步
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
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
  connect(mapStateToProps, mapDispatchToProps)(paymentDetail)
)
