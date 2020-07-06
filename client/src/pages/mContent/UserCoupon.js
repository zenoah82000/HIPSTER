import React, { useState, useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import '../../styles/mContent/usercoupon.scss'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getUserCouponDetaiAsync,
  addUserCouponDataAsync,
} from '../../actions/coupon/getCoupon'

function UserCoupon(props) {
  const { userCouponData, getUserCouponDetaiAsync } = props
  const { adduserCouponData, addUserCouponDataAsync } = props
  const memberId = JSON.parse(localStorage.getItem('member')).id
  const [discountCode, setdiscountCode] = useState([])

  useEffect(() => {
    //getUserCouponDetaiAsync()
  }, [userCouponData])

  useEffect(() => {
    //addUserCouponDataAsync()
    getUserCouponDetaiAsync()
  }, [])

  // console.log('uCoupon-props', props)

  // console.log('userCouponData', userCouponData)
  // console.log('userCouponData.coupon123', userCouponData[0])

  //原本的
  // const addGiviData = async () => {
  //   const GiviFormData = {
  //     memberId,
  //     discountCode,
  //   }
  //   console.log('GiviFormData', GiviFormData)
  //   props.addUserCouponDataAsync(GiviFormData)
  // }

  //新的
  const addGiviData = async () => {
    const GiviFormData = {
      memberId,
      discountCode,
    }
    Swal.fire({
      title: '確定新增此優惠券?',
      icon: 'question',
      showCancelButton: true,
      html:
        '<h5 class="alert-side">折扣代碼: ' +
        GiviFormData.discountCode +
        '</h5>',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.value) {
        props.addUserCouponDataAsync(GiviFormData)
        Swal.fire({
          title: '優惠券新增成功',
          icon: 'success',
        }).then(() => {
          props.history.go(0)
        })
      }
    })
  }

  // console.log('discountCode', discountCode)
  // console.log('adduserCouponData', adduserCouponData)

  let couponList = userCouponData.map((item) => {
    if (
      item.memberId == memberId &&
      Date.parse(item.startTime).valueOf() < Date.parse(new Date()).valueOf() &&
      Date.parse(item.endTime).valueOf() > Date.parse(new Date()).valueOf() &&
      item.memberCouponNum == 1
    ) {
      return (
        <div className="tab-pane">
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
                  <li>優惠折扣：{Math.round(item.discountPercent * 100)}折</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  })

  let outdodatecouponList = userCouponData.map((item) => {
    if (item.memberId == memberId) {
      if (
        Date.parse(item.endTime).valueOf() < Date.parse(new Date()).valueOf() ||
        item.memberCouponNum == 0
      )
        return (
          <div className="tab-pane">
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
                    <li>
                      優惠折扣：{Math.round(item.discountPercent * 100)}折
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
    }
  })

  return (
    <>
      {props.match.params.type === 'available' ? (
        <>
          <div className="usercontainer">
            <h2 className="usertitle">我的優惠券</h2>
            <div className="input-group mb-3 mt-4 input-container mx-auto">
              <input
                name="addCode"
                type="text"
                className="form-control"
                placeholder="請輸入優惠碼"
                onChange={(event) => setdiscountCode(event.target.value)}
              />
              <input name="memberId" type="hidden" value="2"></input>
              <div className="input-group-append">
                <button
                  className="btn buttonstyle"
                  type="submit"
                  id="button-addon2"
                  onClick={() => {
                    addGiviData()
                  }}
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
                  不適用
                </NavLink>
              </div>
            </div>
          </div>
          <div className="tab-pane">
            <div className="table-head ">
              <div class="row">
                <div class="col-3">折扣券</div>
                <div class="col-4">使用效期</div>
                <div class="col-5">適用規則</div>
              </div>
            </div>
          </div>
          {couponList}
        </>
      ) : (
        <>
          <div className="usercontainer">
            <h2 className="usertitle">我的優惠券</h2>
            <div className="input-group mb-3 mt-4 input-container mx-auto">
              <input
                name="addCode"
                type="text"
                className="form-control"
                placeholder="請輸入優惠碼"
                onChange={(event) => setdiscountCode(event.target.value)}
              />
              <input name="memberId" type="hidden" value="2"></input>
              <div className="input-group-append">
                <button
                  className="btn buttonstyle"
                  type="submit"
                  id="button-addon2"
                  onClick={() => {
                    addGiviData()
                  }}
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
                  不適用
                </NavLink>
              </div>
            </div>
          </div>
          <div className="tab-pane">
            <div className="table-head ">
              <div class="row">
                <div class="col-3">折扣券</div>
                <div class="col-4">使用效期</div>
                <div class="col-5">適用規則</div>
              </div>
            </div>
          </div>
          {outdodatecouponList}
        </>
      )}
    </>
  )
}
const couponStateToProps = (store) => {
  return {
    userCouponData: store.couponReducer.userCouponData,
    adduserCouponData: store.couponReducer.adduserCouponData,
  }
}

export default withRouter(
  connect(couponStateToProps, {
    getUserCouponDetaiAsync,
    addUserCouponDataAsync,
  })(UserCoupon)
)
