import React, { useState, useEffect } from 'react'

import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { BsTrash } from 'react-icons/bs'

import Swal from 'sweetalert2'

import '../../styles/order.scss'
import { GrOrderedList } from 'react-icons/gr'

function UserOrder() {
  const [orderlist, setOrderlist] = useState([])
  const [loading, setLoading] = useState(false)

  const getOrderlistAsync = async () => {
    const request = new Request('http://localhost:5000/oreder/2', {
      method: 'get',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    setOrderlist(data)
  }
  useEffect(() => {
    getOrderlistAsync()
  }, [])

  // 渲染後載入商品
  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      if (orderlist.status) {
        setLoading(false)
      }
    }, 500)
  }, [orderlist])

  const display =
    orderlist.length != 0 ? (
      <div className="orderlistbox ">
        <div className="row">
          {orderlist.order.map((item) => {
            return (
              <>
                <div className="card order-box">
                  <div className="card-header order-title d-flex">
                    <div className="col">訂單編號:{item.orderId}</div>
                    <div className="col">購買時間:{item.created_at}</div>
                  </div>
                  <div className="card-body order-body">
                    {orderlist.orderdetails
                      .filter((value) => value.orderId == item.orderId)
                      .map((value) => {
                        return (
                          <>
                          <div className="d-flex product-box border-bottom">
                            <div className="productimg mr-3">
                              <img src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg" />
                            </div>
                            <div>
                              <div className="productname">
                                <p>{value.productName}</p>
                              </div>
                              <div>
                                <p>數量:{value.checkQty}</p>
                              </div>
                              <div>
                                <p>價格:{value.checkPrice}</p>
                              </div>
                              <div>
                                <p>活動時間:{value.date}</p>
                              </div>
                            </div>
                            </div>
                          </>
                        )
                      })}
                  </div>
                  <div className="card-footer order-footer d-flex justify-content-end">
                    <div>
                      購買金額:<span>NT${item.orderTotal}</span>
                    </div>
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
        {loading ? <h2>載入中</h2> : display}
      </div>
    </>
  )
}

export default UserOrder
