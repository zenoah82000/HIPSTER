import React, { useState, useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import '../../styles/mContent/usercoupon.scss'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserCouponDetaiAsync } from '../../actions/coupon/getCoupon'

function CouponAllData(props) {
  // console.log('10行', window.location.pathname.indexOf('available'))
  const { userCouponData, getUserCouponDetaiAsync } = props
  useEffect(() => {
    getUserCouponDetaiAsync()
  }, [])
  console.log('uCoupon-props', props)
  console.log('userCouponData', userCouponData)
  console.log('userCouponData.coupon123', userCouponData[0])
  let couponList = userCouponData.map((item) => {
    return <option value={item.discountPercent}>{item.discountCode}</option>
  })

  return (
    <>
      <div class="container">
        <div class="row">
          <form>
            <div class="form-group row">
              <label for="couponControlSelect1">選擇優惠券</label>
              <select class="form-control" id="couponFormControlSelect1">
                {couponList}
              </select>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
const couponStateToProps = (store) => {
  return { userCouponData: store.couponReducer.userCouponData }
}

export default withRouter(
  connect(couponStateToProps, { getUserCouponDetaiAsync })(CouponAllData)
)
