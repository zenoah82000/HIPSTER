import React, { useState, useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import '../../styles/couponalldata.scss'
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
  const [discountPercent, setdiscountPercent] = useState([])
  console.log('discountPercent', discountPercent)
  let couponList = userCouponData.map((item) => {
    return <option value={item.discountPercent}>{item.discountCode}</option>
  })

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
                id="couponFormControlSelect1"
                onChange={(event) => setdiscountPercent(event.target.value)}
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
