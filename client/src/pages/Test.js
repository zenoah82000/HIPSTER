import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProductQanda from '../components/qanda/ProductQanda'
import { updateUserCouponAsync } from '../actions/coupon/getCoupon'

// import '../../styles/sidebar.scss'

function Test(props) {
  const { updateUserCoupon, updateUserCouponAsync } = props
  let memberCouponNum = 0
  let id = 156
  const updateGiviData = async () => {
    const GiviFormData = {
      memberCouponNum,
      id,
    }
    console.log('GiviFormData', GiviFormData)
    props.updateUserCouponAsync(GiviFormData)
  }

  return (
    <>
      <button
        className="btn buttonstyle"
        id="button-addon2"
        onClick={() => {
          updateGiviData()
        }}
      >
        UPDATE
      </button>
    </>
  )
}

const couponStateToProps = (store) => {
  return {
    updateUserCoupon: store.couponReducer.updateUserCoupon,
  }
}

export default withRouter(
  connect(couponStateToProps, {
    updateUserCouponAsync,
  })(Test)
)
