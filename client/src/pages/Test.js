import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserCouponDetaiAsync } from '../actions/coupon/getCoupon'
import CouponAllData from '../components/coupon/CouponAllData'

// import '../../styles/sidebar.scss'

function Test() {
  return (
    <>
      <CouponAllData />
    </>
  )
}

export default Test
