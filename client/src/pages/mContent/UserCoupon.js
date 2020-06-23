import React, { useState, useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import '../../styles/mContent/usercoupon.scss'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserCouponDetaiAsync } from '../../actions/coupon/getCoupon'

function UserCoupon(props) {
  // console.log('10行', window.location.pathname.indexOf('available'))
  const { userCouponData, getUserCouponDetaiAsync } = props
  useEffect(() => {
    getUserCouponDetaiAsync()
  }, [])
  console.log('uCoupon-props', props)

  console.log('userCouponData', userCouponData)
  console.log('userCouponData.coupon123', userCouponData[0])
  let couponList = userCouponData.map((item) => {
    return (
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
                <span>{item.discountCode}</span>
              </div>
              <div class="coupon-code">{item.discountName}</div>
            </div>
            <div class="col-sm-4">
              <ul class="list-unstyled">
                <li>開始日期：{item.startTime}</li>
                <li>截止日期：{item.endTime}</li>
              </ul>
            </div>
            <div class="col-sm-5">
              <ul class="list-unstyled">
                <li>可用數量：{item.memberCouponNum}</li>
                <li>優惠代碼：{item.discountCode}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <>
      {props.match.params.type === 'available' ? (
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
              <div className="tabcontainer">
                <NavLink
                  to={`./available`}
                  activeClassName="currentcoupon"
                  className="coupontab-a"
                >
                  可使用
                </NavLink>
              </div>
              <div className="tabcontainer">
                <NavLink
                  to={`./expired`}
                  activeClassName="currentcoupon"
                  className="coupontab-a"
                >
                  已過期
                </NavLink>
              </div>
            </div>
          </div>
          {couponList}
        </>
      ) : (
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
            <div className="tabcontainer">
              <NavLink
                to={`./available`}
                activeClassName="currentcoupon"
                className="coupontab-a"
              >
                可使用
              </NavLink>
            </div>
            <div className="tabcontainer">
              <NavLink
                to={`./expired`}
                activeClassName="currentcoupon"
                className="coupontab-a"
              >
                已過期
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
const couponStateToProps = (store) => {
  return { userCouponData: store.couponReducer.userCouponData }
}

export default withRouter(
  connect(couponStateToProps, { getUserCouponDetaiAsync })(UserCoupon)
)
