import React from 'react'
import {withRouter,Link} from 'react-router-dom'
import '../../styles/Payment.scss'

//引入自訂元件

function paymentType(props) {
  const {mycart,setMycart,sum}=props

  const backPage=()=>{
    props.history.push('/paymentDetail')
    
  }
  const checkOut= ()=>{

    
    // 購物完清掉 localstorage 購物車
    localStorage.removeItem('cart')
    window.location.href = '/paymentFinish'
    // props.history.push('')
  }
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

                <div className="paymentBox">
                  <div class="p-3 borderBottom bgColor">
                    請選擇付款方式  
                    </div>
                  <div className=" p-3 borderBottom">
                    <input className="" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                    <label className="p-1 form-check-label" for="gridRadios1">  
                      Pay Pal
                  </label>
                  </div>
                  <div className=" p-3 borderBottom">
                    <input className="" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                    <label className="p-1 form-check-label" for="gridRadios2">
                      信用卡/記帳卡
                  </label>
                  </div>
                  <div className=" p-3">
                    <p>已保存的卡片資訊</p>
                    <div className="d-flex justify-content-between">
                    <label className="p-1 form-check-label" for="gridRadios3">
                    <input className="" type="radio" name="gridRadios" id="gridRadios3" value="option3" />                  
                      **** **** **** 0000
                     </label>
                     <a href="#">刪除</a>
                     </div>
                    <a href="#">+添加新卡</a>
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
                    <p>NT${sum(mycart)}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>折價金額</p>
                    <p>NT 100</p>
                  </div>
                </div>
                <div className="payPrice">
                  <div className="d-flex justify-content-between">
                    <p>結帳金額</p>
                    <p>NT${sum(mycart)}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 buttonBox">
                <button onClick={()=>{
                  backPage()
                }}>返回上一步</button>
                <button onClick={()=>{checkOut()}}>確認付款</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(paymentType)
