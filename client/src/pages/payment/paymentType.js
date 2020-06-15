import React from 'react'
import '../../styles/Payment.scss'

//引入自訂元件

function paymentType(props) {
  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="prograssBar2 mt-5"></div>
          <div className="col-9">
            <div className=" mr-3">
              <div className="p-5 mt-3 contentBox">
                <div className="subTitle">
                  <p>填寫付款資訊</p>
                </div>

                <div className="">
                  <div class="py-3">
                    請選擇付款方式
                    </div>
                  <div className="form-check p-3">
                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                    <label className="form-check-label" for="gridRadios1">  
                      Pay Pal
          </label>
                  </div>
                  <div className="form-check p-3">
                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                    <label className="form-check-label" for="gridRadios2">
                      信用卡/記帳卡
          </label>
                  </div>
                  <div className="form-check p-3">
                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" />
                    <label className="form-check-label" for="gridRadios3">
                      已保存的卡片資訊
          </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="mt-3">
              <div className="priceBox ">
                <div className="totalPrice">
                  <div className="d-flex justify-content-between ">
                    <p>總價</p>
                    <p>NT 1000</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>折價金額</p>
                    <p>NT 100</p>
                  </div>
                </div>
                <div className="payPrice">
                  <div className="d-flex justify-content-between">
                    <p>結帳金額</p>
                    <p>NT 900</p>
                  </div>
                </div>
              </div>
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
