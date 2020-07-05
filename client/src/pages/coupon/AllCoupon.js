import React, { useState, useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import '../../styles/allcoupon.scss'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllCouponDetaiAsync } from '../../actions/coupon/getCoupon'
import $ from 'jquery'

function AllCoupon(props) {
  // console.log('10行', window.location.pathname.indexOf('available'))
  const { allCouponData, getAllCouponDetaiAsync } = props
  useEffect(() => {
    getAllCouponDetaiAsync()
  }, [])
  console.log('props', props)
  console.log('allcoupon', allCouponData)
  //   const copyboard = (element) => {
  //     // var copyText = $(this).attr('className')
  //     console.log('element', element)
  //     // console.log('this', this)
  //     var el = $(
  //       '<input style="position: absolute; bottom: -120%" type="text" value="' +
  //         element +
  //         '"/>'
  //     ).appendTo('body')
  //     el[0].select()
  //     document.execCommand('copy')
  //     el.remove()
  //     alert('複製成功', '123')
  //   }
  let couponList = allCouponData.map((item) => {
    if (
      Date.parse(item.startTime).valueOf() < Date.parse(new Date()).valueOf() &&
      Date.parse(item.endTime).valueOf() > Date.parse(new Date()).valueOf()
    )
      return (
        <div className="coupon-item">
          <div
            className="coupon-intro"
            data-code={item.discountCode}
            // onClick={() => {
            //   copyboard($('div.coupon-intro').attr('data-code'))
            //   console.log(
            //     '#root > div > div > div:nth-child(1) > div.coupon-intro',
            //     // $(this).attr('data-code')
            //     $('event.target').closest('div').attr('data-code')
            //   )
            // }}
          >
            <h4>活動名稱：{item.discountName}</h4>
            <ul>
              <li id={item.discountCode}>折扣碼：{item.discountCode}</li>
              <li>開始時間：{item.startTime}</li>
              <li>結束時間：{item.endTime}</li>
            </ul>
            <input
              type="hidden"
              name={item.discountCode}
              value={item.discountCode}
              id={item.discountCode}
            ></input>
          </div>
          <div className="allcoupon-value">
            {Math.round(item.discountPercent * 100)}折
          </div>
        </div>
      )
  })

  return (
    <>
      <div className="allcoupons container">
        <h1 className="h3 my-4">優惠券總攬</h1>
        <div className="row justify-content-around">{couponList}</div>
      </div>
    </>
  )
}
const couponStateToProps = (store) => {
  return { allCouponData: store.couponReducer.allCouponData }
}

export default withRouter(
  connect(couponStateToProps, { getAllCouponDetaiAsync })(AllCoupon)
)
