import React from 'react'
import '../../styles/Payment.scss'

//引入自訂元件


function paymentDetail(props) {
  return (
    <>
      <div className="container mb-5">
        <div className="row">
        <div className= "prograssBar1 mt-5"></div>
          <div className="col-9">
            <div className=" mr-3">
            <div className="mt-3 paymentBox"></div>
            </div>
          </div>
          <div className="col-3">    
          <div className="mt-3">    
            <div className="totalPriceBox "></div>
            <div className="mt-3 buttonBox">
              <button>返回上一步</button>
              <button>下一步</button>
           </div>      
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default paymentDetail
