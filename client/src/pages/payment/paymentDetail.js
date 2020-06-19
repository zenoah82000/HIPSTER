import React from 'react'
import {withRouter} from 'react-router-dom'
import '../../styles/Payment.scss'
import { GrNext } from 'react-icons/gr'

//引入自訂元件



function paymentDetail(props) {
  const {mycart,sum}=props
  const nextPage=()=>{
    props.history.push('/paymentType')
  }
  const backPage=()=>{
    props.history.push('/shoppingcar')
  }
  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="prograssBar1 mt-5"></div>
          <div className="col-9">
            <div className=" mr-3">
              <div className="p-5 mt-3 contentBox">
                <div className="subTitle">
                  <p>填寫附加資訊</p>
                </div>
                <div className="col-6 form-group">
                  <label for="inputEmail  ">電子郵件*</label>
                  <input type="email" class="form-control" id="inputEmail" placeholder="name@example.com" />
                </div>
                <div className="subTitle mt-5">
                  <p>聯絡資訊</p>
                </div>
                <div className="d-flex">
                  <div className="col-4 form-group mx-1">
                    <label for="inputSelect  ">稱謂</label>
                    <select class="form-control" id="inputSelect">
                      <option>先生</option>
                      <option>小姐</option>
                    </select>
                  </div>
                  <div className="col-4 form-group mx-1">
                    <label for="inputFirstname  ">名字(需與護照一致)</label>
                    <input type="email" className="form-control" id="inputFirstname" placeholder="First name" />
                  </div>
                  <div className="col-4 form-group mx-1">
                    <label for="inputLastname  ">姓氏(需與護照一致)</label>
                    <input type="email" className="form-control" id="inputLastname" placeholder="Last name" />
                  </div>
                </div>
                <div className="col-6 form-group">
                  <label for="inputNumber  ">聯絡電話*</label>
                  <input type="email" className="form-control" id="inputNumber" placeholder="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="mt-3">
              <div className="priceBox ">
                <div className="totalPrice">
                  <div className="d-flex justify-content-between">
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
                <button onClick={()=>{
                  nextPage()
                }}>下一步</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(paymentDetail)
