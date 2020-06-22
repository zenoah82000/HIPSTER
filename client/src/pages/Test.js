import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserCouponDetaiAsync } from '../actions/coupon/getCoupon'

// import '../../styles/sidebar.scss'

function Test(props) {
  const { userCouponData, getUserCouponDetaiAsync } = props
  useEffect(() => {
    getUserCouponDetaiAsync()
  }, [])

  console.log('coupon-props:', props)
  console.log('userCouponData', userCouponData)
  // console.log('getUserCouponDetaiAsync', getUserCouponDetaiAsync(props))

  // let couponData = props.couponlist.map(function (item) {
  //   return <h1>{item.couponId}</h1>
  // })
  // return <>{couponData}</>
  return <></>
}

const couponStateToProps = (store) => {
  return { userCouponData: store.couponReducer.userCouponData }
}

// 指示dispatch要綁定哪些action creators
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ getUserCouponDetaiAsync }, dispatch)
// }

export default connect(couponStateToProps, { getUserCouponDetaiAsync })(Test)
