import React from 'react'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
function OrderDetail(props) {
    const {paymentDetailok,setPaymentDetailok,sum,buyerinfo}=props

  return (
    <>
      <Modal 
        show={paymentDetailok}
        onHide={()=>{setPaymentDetailok(false)}}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="modal-body">
          <div className="paymentdetail-box">
            <div className="paymentdetail-title">
              <p>訂單資料</p>
            </div>
            <hr />
            <div className="paymentdetail-product-box">
              {buyerinfo.product.map((item) => {
                return (
                  <>
                    <div className="paymentdetail-product">
                      <div className="paymentdetail-img">
                        <img
                          src={`http://localhost:5000/images/product/${item.productImg}`}
                        />
                      </div>
                      <div className="paymentdetail-productinfo">
                        <p className="paymentdetail-productname">
                          {item.productName}
                        </p>
                        <p className="paymentdetail-productamount">
                          數量:{item.amount}
                        </p>
                        <p className="paymentdetail-productprice">
                          價格:NT${item.productPrice.toString()
                      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
                        </p>
                      </div>
                      <div className="paymentdetail-productsubtotal">NT${(item.productPrice*item.amount).toString()
                      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}</div>
                    </div>
                  </>
                )
              })}
            </div>
            <hr />
            <div className="paymentdetail-footer">
              <div className="paymentdetail-subtotal">
                <p>總計:</p>
                <span>NT${sum(buyerinfo.product).toString()
                      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}</span>
              </div>
              <div className="paymentdetail-coupon">
                <p>
                  優惠碼{buyerinfo.discountcode ? buyerinfo.discountcode : '(未使用)'}:
                </p>
                <span>-NT${buyerinfo.sumless.toString()
                      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}</span>
              </div>
              <div className="paymentdetail-total">
                <p>結帳金額:</p>
                <span>NT${buyerinfo.sumdiscount.toString()
                      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}</span>
              </div>
            </div>
            <hr/>
            <div className="paymentdetail-button">
            <button className="paymentdetail-button-check" onClick={()=>{
              setPaymentDetailok(false)
            }}>確認</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
const mapStateToProps = (store) => {
    return {
      mycart: store.orderReducer.cartData,
      buyerinfo: store.orderReducer.buyerData,
    }
  }
  const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
