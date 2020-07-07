import React, { useState, useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import '../../styles/couponalldata.scss'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserCouponDetaiAsync } from '../../actions/coupon/getCoupon'
import $ from 'jquery'

function CouponAllData(props) {
  const { userCouponData, getUserCouponDetaiAsync } = props
  let memberId = 0
  if (JSON.parse(localStorage.getItem('member'))) {
    memberId = JSON.parse(localStorage.getItem('member')).id
  } else {
    memberId = 0
  }
  useEffect(() => {
    getUserCouponDetaiAsync()
  }, [])

  let couponList = userCouponData.map((item) => {
    if (
      item.memberId == memberId &&
      Date.parse(item.startTime).valueOf() < Date.parse(new Date()).valueOf() &&
      Date.parse(item.endTime).valueOf() > Date.parse(new Date()).valueOf() &&
      item.memberCouponNum == 1
    ) {
      return (
        <option value={item.discountPercent} data-code={item.discountCode}>
          {item.discountCode}
        </option>
      )
    }
  })
  console.log('userCouponData', userCouponData)

  return (
    <>
      <div className="couponalldata-container">
        <div className="row">
          <form className="couponalldata-form">
            <div class="form-group row couponalldata-form">
              <label className="couponalldata-label" for="couponControlSelect1">
                選擇優惠券
              </label>
              <select
                className="form-control couponalldata-select"
                id="couponControlSelect1"
                onChange={(event) => {
                  props.onChange(event.target.value)
                  // console.log(
                  //   'event.target.value',
                  //   $('option:selected').attr('data-code')
                  // )
                  props.onBlur($('option:selected').attr('data-code'))
                }}
              >
                <option selected value="1">
                  choose coupon
                </option>
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
