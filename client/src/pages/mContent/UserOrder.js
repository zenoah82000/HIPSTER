import React, { useState, useEffect } from 'react'

import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { BsTrash } from 'react-icons/bs'

import Swal from 'sweetalert2'

import '../../styles/order.scss'

function UserOrder() {
  const [orderlist, setOrderlist] = useState([123, 123])

  useEffect(() => {}, [])
  const display =
    orderlist.length != 0 ? (
      <div className="orderlistbox ">
        <div className="row">
          {orderlist.map((item) => {
            return (
              <>
                <div className="card order-box">
                  <div className="card-header order-title d-flex">
                    <div className="col">訂單編號</div>
                    <div className="col">購買時間</div>
                  </div>
                  <div className="card-body order-body d-flex">
                    <div className="productimg">
                      <img src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg" />
                    </div>
                    <div>
                    <div className="productname"><p>日本火車票</p></div>
                    <div>數量:</div>
                    <div>活動時間:</div>
                    </div>
                  </div>
                  <div className="card-footer order-footer d-flex">
                  <div>購買金額:<span>NT$300</span></div>
                  <button className="order-button">取消整筆訂單</button>
                    
                  </div>
                </div>
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
