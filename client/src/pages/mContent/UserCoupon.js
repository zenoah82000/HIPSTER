import React from 'react'
import { Link,NavLink,withRouter } from 'react-router-dom'
import '../../styles/mContent/usercoupon.scss'
function UserCoupon(props) {

  console.log(props);
  return (
    <>
      <div className="usercontainer">
        <h2 className="usertitle">我的優惠券</h2>
        <div className="input-group mb-3 mt-4 input-container mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="請輸入優惠碼"
          />
          <div className="input-group-append">
            <button
              className="btn buttonstyle"
              type="submit"
              id="button-addon2"
            >
              兌換
            </button>
          </div>
        </div>
        <div className="d-flex coupon-bar border-bottom">
          <div className="tabcontainer"><NavLink to={`./available`}  activeClassName="currentcoupon" className="coupontab-a">可使用</NavLink>
          </div>
          <div className="tabcontainer"><NavLink to={`./expired`}  activeClassName="currentcoupon" className="coupontab-a">已過期</NavLink>
          </div>
        </div>
      </div>
      <div className="tab-pane">
        <div className="table-head hidden-xs">
          <div class="row">
            <div class="col-3">折扣券</div>
            <div class="col-4">使用效期</div>
            <div class="col-5">適用規則</div>
          </div>
        </div>
        <div class="coupon-listview">
          <div class="row">
            <div class="col-sm-3">
              <div class="coupon">
                <span>FUN 618</span>
              </div>
              <div class="coupon-code">CATHAY300</div>
            </div>
            <div class="col-sm-4">
              <ul class="list-unstyled">
                <li>訂購日期：2019/07/01~2020/06/30</li>
                <li>使用日期：2019/07/01~2020/08/31</li>
              </ul>
            </div>
            <div class="col-sm-5">
              <ul class="list-unstyled">
                <li>訂單金額：2,937 TWD</li>
                <li>適用平台：WEB,MWEB,ANDROID,IOS</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="coupon-listview">
          <div class="row">
            <div class="col-sm-3">
              <div class="coupon">
                <span>5% off</span>
              </div>
              <div class="coupon-code">CTBC952020</div>
            </div>
            <div class="col-sm-4">
              <ul class="list-unstyled">
                <li>訂購日期：2019/07/01~2020/06/30</li>
                <li>使用日期：2019/07/01~2020/08/31</li>
              </ul>
            </div>
            <div class="col-sm-5">
              <ul class="list-unstyled">
                <li>訂單金額：500 TWD</li>
                <li>適用平台：WEB,MWEB,ANDROID,IOS</li>
                <li>行程類別：文青咖啡廳</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="coupon-listview">
          <div class="row">
            <div class="col-sm-3">
              <div class="coupon">
                <span>TWD 312</span>
              </div>
              <div class="coupon-code">CATHAY300</div>
            </div>
            <div class="col-sm-4">
              <ul class="list-unstyled">
                <li>訂購日期：2019/07/01~2020/06/30</li>
                <li>使用日期：2019/07/01~2020/08/31</li>
              </ul>
            </div>
            <div class="col-sm-5">
              <ul class="list-unstyled">
                <li>訂單金額：2,937 TWD</li>
                <li>適用平台：WEB,MWEB,ANDROID,IOS</li>
                <li>
                  行程類別：一日遊,多日旅遊,司機／交通,半日遊,私人導遊,點對點接送
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(UserCoupon)
