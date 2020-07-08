import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../styles/Payment.scss'
import { BsCheckCircle } from 'react-icons/bs'

//引入自訂元件

function paymentFinish(props) {
  //取得買家資訊
  const { buyerinfo, sum } = props
  //前往訂單
  const nextOrder = () => {
    props.history.push('/memberuser/order')
  }
  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="mt-5 prograssBar3"></div>
          <div className="p-5 mt-3 contentBox">
            <h1 className="mb-4">
              <BsCheckCircle />
              <span className="h2 pl-2">付款完成</span>
            </h1>
            <p className="infoemailbox">
              感謝使用文青地圖，預定憑證及使用詳情將寄至您的電子信箱
              <span className="infoemail">{buyerinfo.email}</span>
            </p>
            <div className="orderdetail">
              <div className="orderdetail-title d-flex justify-content-between">
                <h4>訂單明細</h4>
                <div>
                  <h6 className="">
                    訂單編號:{buyerinfo.orderId ? buyerinfo.orderId : ''}
                  </h6>
                  <h6 className="">
                    購買日期:{buyerinfo.buytime ? buyerinfo.buytime : ''}
                  </h6>
                </div>
              </div>
              <hr />
              {buyerinfo.product
                ? buyerinfo.product.map((item) => {
                    return (
                      <>
                        <div className="d-flex productbox">
                          <div className="productimgbox mr-2">
                            <img
                              className="productimg"
                              src={`http://localhost:5000/images/product/${item.productImg}`}
                            />
                          </div>
                          <div className="productinfo align-items-center">
                            <p className="infoname">{item.productName}</p>
                            <p className="infoprice">NT${item.productPrice}</p>
                            <p className="infodate">預定日期: {item.date}</p>
                          </div>
                        </div>
                        <hr />
                      </>
                    )
                  })
                : ''}
            </div>
            <div className="paymentfinish-footer">
              <div className="paymentfinish-subtotal">
                <p>總計:</p>
                <span>
                  NT$
                  {sum(buyerinfo.product)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                </span>
              </div>
              <div className="paymentfinish-coupon">
                <p>
                  優惠碼
                  {buyerinfo.discountcode ? buyerinfo.discountcode : '(未使用)'}
                  :
                </p>
                <span>
                  -NT$
                  {buyerinfo.sumless
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                </span>
              </div>
              <div className="paymentfinish-total">
                <p>結帳金額:</p>
                <span>
                  NT$
                  {buyerinfo.sumdiscount
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                </span>
              </div>
            </div>
            <button
              className="paymentButton"
              onClick={() => {
                nextOrder()
              }}
            >
              查看訂單
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (store) => {
  return {
    buyerinfo: store.orderReducer.buyerData,
  }
}
const mapDispatchToProps = null
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(paymentFinish)
)
