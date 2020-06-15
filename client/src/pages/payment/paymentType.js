import React from 'react'

//引入自訂元件
import paymentTotal from '../../components/payment/paymentTotal'

function paymentType(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="mt-5 prograssBar2"></div>
            <div></div>
          </div>
          <div className="col-3">
            <paymentTotal />
          </div>
        </div>
      </div>
    </>
  )
}

export default paymentType
