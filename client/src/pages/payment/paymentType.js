import React from 'react'
import { connect } from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import '../../styles/Payment.scss'

//引入自訂元件

function paymentType(props) {
  const {mycart,sum,buyerinfo}=props

  //訂單初始化
  const orderData = {
    orderMemberId: '2',
    orderItems: [],
  }
  let itemData = {}
  //訂單送出
  const checkoutAsync= async(order)=>{
    const request = new Request('http://localhost:5000/member/checkout', {
      method: 'post',
      body:JSON.stringify(order),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
  }
  const backPage=()=>{
    props.history.push('/paymentDetail')

    
  }
  const checkOut= ()=>{
    
    let total =sum(mycart)
    mycart.forEach((item,i)=>{
      itemData.productId=mycart[i].id
      itemData.date = mycart[i].date
      itemData.name = mycart[i].name
      itemData.checkPrice= mycart[i].price
      itemData.checkQty = mycart[i].amount
      itemData.checkSubtotal = +mycart[i].price * +mycart[i].amount
      orderData.orderItems.push(itemData)
      itemData={}
    })
    //取得總額跟信箱
    orderData.total=total
    orderData.email=buyerinfo.email
    //訂單資料傳資料庫
    checkoutAsync(orderData)
    // 購物完清掉 localstorage 購物車
    props.dispatch({type:'GET_CART',value:[]})
    localStorage.removeItem('cart')
    // window.location.href = '/paymentFinish'
    props.history.push('/paymentFinish')
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
const mapStateToProps = store=>{
  return{
    mycart:store.orderReducer.cartData,
    buyerinfo: store.orderReducer.buyerData,
  }
}
const mapDispatchToProps = null
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(paymentType))
