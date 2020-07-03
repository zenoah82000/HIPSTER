import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import { Modal, Button, Form } from 'react-bootstrap'

import '../../styles/order.scss'

function UserOrder() {
  const [orderlist, setOrderlist] = useState([])

  const [loading, setLoading] = useState(false)
  //詳細資料狀態
  const [detail, setDetail] = useState(false)
  //詳細資料
  const [detaildata, setDetaildata] = useState([])
  //目前頁數
  const [currentPage, setCurrentPage] = useState(1)
  //每頁的資料
  const [datapage, setDatapage] = useState([])
  //讀取會員資料
  const member =JSON.parse(localStorage.getItem('member'))
 

  const getOrderlistAsync = async () => {
    const request = new Request(`http://localhost:5000/member/order/${member.id}`, {
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

  //點擊頁數重新取得資料
  useEffect(() => {
    getdatapage()
  }, [currentPage])

  // 渲染後載入商品
  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      if (orderlist.status) {
        setLoading(false)
        getdatapage()
      }
    }, 500)
  }, [orderlist])

  //商品展開判斷
  const unfold = (e) => {
    if (e.target.value == '展開更多') {
      $(e.target).closest('.order-body').css('maxHeight', '1000px')
      e.target.value = '收起'
    } else {
      $(e.target).closest('.order-body').css('maxHeight', '145px')
      e.target.value = '展開更多'
    }
  }
  //把資料分頁
  const getdatapage = () => {
    let perPage = orderlist.perPage
    let page = currentPage
    if (orderlist.order) {
      const newdata = orderlist.order.slice(
        (page - 1) * perPage,
        page * perPage
      )
      setDatapage(newdata)
    }
  }
  //頁碼
  const creatpage = () => {
    let pages = []
    for (let i = 1; i <= orderlist.totalPages; i++) {
      pages.push(
        <li
          onClick={() => {
            setCurrentPage(i)
          }}
          key={i}
          className={currentPage == i ? 'active' : ''}
        >
          {i}
        </li>
      )
    }
    return pages
  }
  //傳入訂單詳情
  const showdetail = (item) => {
    setDetaildata(item)
    setDetail(true)
  }
  //訂單詳情
  function Orderdetail(props) {
    return (
      <Modal className="modal-border"
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="modal-body">
          <div className="orderdetailbox">
            <div className="ordercontact">
              <h6>聯絡人資訊</h6>
              <p>姓名:{detaildata.contact}</p>
              <p>電話:{detaildata.mobile}</p>
              <p>信箱:{detaildata.email}</p>
            </div>
            <hr />
            <div className="orderpayinfo">
              <h6>付款資訊</h6>
              <p>付款方式:</p>
              <p>小計</p>
              <p>優惠碼</p>
              <p>總計</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
  const display = orderlist.order ? (
    <div className="orderlistbox ">
      <div className="row">
        {datapage.map((item) => {
          return (
            <>
              <div className="card order-box">
                <div className="card-header order-title">
                  <div className="orderid">
                    <h6>訂單編號:{item.orderId}</h6>
                  </div>
                  <div className="ordertime">
                    <h6>購買時間:{item.created_at}</h6>
                  </div>
                  <div className="orderstatus">
                    <h6>已付款</h6>
                  </div>
                  <div className="ordertotal">
                    <h6>
                      付款金額:NT$
                      {item.orderTotal
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                    </h6>
                    <input
                      type="button"
                      className="order-detail"
                      value="訂單詳情"
                      onClick={() => {
                        showdetail(item)
                      }}
                    />
                  </div>
                </div>
                <div className="card-body order-body unfoldbox">
                  {orderlist.orderdetails
                    .filter((value) => value.orderId == item.orderId)
                    .map((value, index) => {
                      return (
                        <>
                          {/* index有兩個就加上展開 */}
                          {index == 1 ? (
                            <input
                              type="button"
                              className="unfold"
                              value="展開更多"
                              onClick={(e) => {
                                unfold(e)
                              }}
                            />
                          ) : (
                            ''
                          )}
                          <div className="d-flex product-box border-bottom align-items-center">
                            <div className="productimg mr-3">
                              <img src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg" />
                            </div>
                            <div className="oderproductinfo">
                              <div className="productname">
                                <p>{value.productName}</p>
                              </div>
                              <div>
                                <p>數量:{value.checkQty}</p>
                              </div>
                              <div>
                                <p>
                                  價格:NT$
                                  {value.checkPrice
                                    .toString()
                                    .replace(
                                      /(\d)(?=(\d{3})+(?:\.\d+)?$)/g,
                                      '$1,'
                                    )}
                                </p>
                              </div>
                              <div>
                                <p>活動時間:{value.date}</p>
                              </div>
                            </div>
                            <div className="oderbutton"><button>檢視憑證</button></div>
                          </div>
                        </>
                      )
                    })}
                </div>
              </div>
            </>
          )
        })}
      </div>
      <ul className="orderpage ">{creatpage()}</ul>
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
      <Orderdetail show={detail} onHide={() => setDetail(false)} />
      <div className="usercontainer">
        <h2 className="usertitle">我的訂單</h2>
        {loading ? <h2>載入中</h2> : display}
      </div>
    </>
  )
}

export default UserOrder
