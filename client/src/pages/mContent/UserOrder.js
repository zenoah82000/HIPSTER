import React, { useState, useEffect } from 'react'

import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { BsTrash } from 'react-icons/bs'

import Swal from 'sweetalert2'

import '../../styles/order.scss'

function UserOrder() {
  const [orderlist, setOrderlist] = useState([])

  const display =
    orderlist != null && orderlist.length >= 1 ? (
      <div className="orderlistbox ">
        <div className="row">
          {orderlist.map((item) => {
            return (
              <>
                
              </>
            )
          })}
        </div>
      </div>
    ) : (
      <div className="empty text-center">
        <img
          className="emptyImg mb-3"
          src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
        />
        <p>暫時未有活動處理預訂記錄</p>
        <p>探索精彩活動並體驗輕鬆的網上預訂流程</p>
      </div>
    )
  return (
    <>
      <div className="usercontainer">
        <h2 className="usertitle">我的訂單</h2>

        {display}
      </div>
    </>
  )
}

export default UserOrder
