import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../styles/Payment.scss'
import { BsCheckCircle } from 'react-icons/bs'

//引入自訂元件

function paymentFinish(props) {
  //取得買家資訊
  const { buyerinfo } = props
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
            <p className="mb-4">
              感謝使用文青地圖，預定憑證及使用詳情將寄至您的電子信箱
              {buyerinfo.email}
            </p>
            <div className="bgColor p-4">
              <ul className="list-unstyled ">
                <li className="py-2">訂單編號:0000000000</li>
                {buyerinfo.product.map((item) => {
                  return (
                    <>
                      <li className="pt-2">活動日期: 2020年5月24日 9:20PM </li>
                    </>
                  )
                })}
              </ul>
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
