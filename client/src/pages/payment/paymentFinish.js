import React from 'react'

//引入自訂元件
import paymentTotal from '../../components/payment/paymentTotal'

function paymentFinish(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div>
              <img className="prograssBar"></img>
            </div>
          </div>
          <div className="col-3">
            <paymentTotal/>
          </div>
        </div>
      </div>
    </>
  )
}

export default paymentFinish
