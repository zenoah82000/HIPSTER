import React, { useState } from 'react'
import $ from 'jquery'
import QRcode from 'qrcode.react'

import { Modal} from 'react-bootstrap'
function MyOder(props) {
  const { item, orderlist } = props

  //檢視憑證狀態
  const [proof, setProof] = useState(false)
  //憑證資料
  const [proofdata, setProofdata] = useState([])

  //訂單詳情資料
  const [detaildata, setDetaildata] = useState([])
  //訂單詳情狀態
  const [detail, setDetail] = useState(false)

  //展開判斷
  const [unfoldtext, setUnfoldtext] = useState('展開更多')

  //判斷商品數量
  const productamount = orderlist.orderdetails.filter(
    (value) => value.orderId === item.orderId
  )

  //商品展開判斷
  const unfold = (e) => {
    if (unfoldtext === '展開更多') {
      $(e.target)
        .closest('.order-body')
        .css('maxHeight', productamount.length * 200 + 'px')
      setUnfoldtext('收起')
    } else {
      $(e.target).closest('.order-body').css('maxHeight', '145px')
      setUnfoldtext('展開更多')
    }
  }

  //傳入訂單詳情
  const showdetail = (item) => {
    setDetaildata(item)
    setDetail(true)
  }
  //訂單詳情modal
  function Orderdetail(props) {
    return (
      <Modal
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
              <div className="detail-paytype">
                <p>付款方式:</p>
                <span>{detaildata.paymentTypeId}</span>
              </div>
              <div className="detail-subtotal">
                <p>總計:</p>
                <span>NT${detaildata.orderTotal}</span>
              </div>
              <div className="detail-coupon">
                <p>
                  優惠碼{detaildata.coupon ? detaildata.coupon : '(未使用)'}:
                </p>
                <span>-NT${detaildata.discount}</span>
              </div>
              <div className="detail-total">
                <p>付款金額:</p>
                <span>NT${detaildata.paymentTotal}</span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
  //檢視憑證視窗
  function Orderproof(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="modal-body">
          <div className="prooftitle">
            <h6>{proofdata.productName}</h6>
            <hr />
            <div className="proofqrcode">
              <QRcode value={item.orderId + proofdata.productId} size="100" />
            </div>
            <hr />
            <div className="proofinfo">
              <p>使用者:{item.contact}</p>
              <p>數量:{proofdata.checkQty}</p>
              <p>使用日期:{proofdata.date}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
  //傳入憑證詳情
  const showproof = (item) => {
    setProofdata(item)
    setProof(true)
  }
  return (
    <>
      <Orderdetail show={detail} onHide={() => setDetail(false)} />
      <Orderproof show={proof} onHide={() => setProof(false)} />
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
              {item.paymentTotal
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
            .filter((value) => value.orderId === item.orderId)
            .map((value, index) => {
              return (
                <>
                  {/* index有兩個就加上展開 */}
                  {index == 1 ? (
                    <input
                      type="button"
                      className="unfold"
                      value={unfoldtext}
                      onClick={(e) => {
                        unfold(e)
                      }}
                    />
                  ) : (
                    ''
                  )}
                  <div className="d-flex product-box">
                    <div className="productimg mr-3">
                      <img
                        src={`http://localhost:5000/images/product/${value.productImg}`}
                      />
                    </div>
                    <div className="oderproductinfo">
                      <div className="productname">
                        <p>{value.productName}</p>
                      </div>
                      <div className="productamount">
                        <p>數量:{value.checkQty}</p>
                      </div>
                      <div className="productprice">
                        <p>
                          價格:NT$
                          {value.checkPrice
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                        </p>
                      </div>
                      <div className="productdate">
                        <p>活動時間:{value.date}</p>
                      </div>
                    </div>
                    <div className="oderbutton">
                      <button
                        onClick={() => {
                          showproof(value)
                        }}
                      >
                        檢視憑證
                      </button>
                    </div>
                  </div>
                </>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default MyOder
