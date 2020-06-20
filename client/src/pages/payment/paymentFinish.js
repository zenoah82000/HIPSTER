import React from 'react'
import {Link} from 'react-router-dom'
import '../../styles/Payment.scss'
import {BsCheckCircle  } from "react-icons/bs";

//引入自訂元件


function paymentFinish(props) {
  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="mt-5 prograssBar3"></div>
          <div className="p-5 mt-3 contentBox">  
          <h1 className="mb-4"><BsCheckCircle/><span className="h2 pl-2">付款完成</span></h1>
          <p className="mb-4">感謝使用文青地圖，預定憑證及使用詳情將寄至您的電子信箱xxxxxx@gmail.com</p>
          <div className="bgColor p-4">
            <ul className="list-unstyled ">
              <li className= "py-2">預定編號:0000000000</li>
              <li className= "pt-2">預定日期: 2020年5月24日 9:20PM  </li>
            </ul>
          </div>
          <button className="paymentButton"><Link to="/memberuser/order">查看訂單</Link></button>
          </div>      
        </div>
      </div>
    </>
  )
}

export default paymentFinish
