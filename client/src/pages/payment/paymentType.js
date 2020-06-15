import React from 'react'
import '../../styles/Payment.scss'

//引入自訂元件

function paymentType(props) {
  return (
    <>
      <div className="container mb-5">
        <div className="row">
        <div className= "prograssBar2 mt-5"></div>
          <div className="col-9">
            <div className=" mr-3">
            <div className="mt-3 contentBox"></div>
            </div>
          </div>
          <div className="col-3">    
          <div className="mt-3">    
            <div className="totalPriceBox "></div>
            <div className="mt-3 buttonBox">
              <button>返回上一步</button>
              <button>確認付款</button>
           </div>      
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default paymentType
