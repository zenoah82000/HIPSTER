import React from 'react'

//引入自訂元件
import paymentTotal from '../../components/payment/paymentTotal'

function paymentDetail(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="mt-5 prograssBar1"></div>
            <div className="mt-3 paymentBox"></div>
          </div>
          <div className="col-3">
            <paymentTotal />
          </div>
        </div>
      </div>
    </>
  )
}

export default paymentDetail
