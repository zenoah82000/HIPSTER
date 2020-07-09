import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FaStar, FaHeart, FaMapMarkerAlt } from 'react-icons/fa'
import { connect } from 'react-redux'

function FeaturedProduct(props) {
  const { item, wishlist, addWishlistCheck } = props
  const member = JSON.parse(localStorage.getItem('member')) || ''
  // //商品區塊>關注

  //精選商品>星數顯示
  const start1 = (
    <>
      <FaStar className="start" />
      <FaStar className="" />
      <FaStar className="" />
      <FaStar className="" />
      <FaStar className="" />
    </>
  )
  const start2 = (
    <>
      <FaStar className="start" />
      <FaStar className="start" />
      <FaStar className="" />
      <FaStar className="" />
      <FaStar className="" />
    </>
  )
  const start3 = (
    <>
      <FaStar className="start" />
      <FaStar className="start" />
      <FaStar className="start" />
      <FaStar className="" />
      <FaStar className="" />
    </>
  )
  const start4 = (
    <>
      <FaStar className="start" />
      <FaStar className="start" />
      <FaStar className="start" />
      <FaStar className="start" />
      <FaStar className="" />
    </>
  )
  const start5 = (
    <>
      <FaStar className="start" />
      <FaStar className="start" />
      <FaStar className="start" />
      <FaStar className="start" />
      <FaStar className="start" />
    </>
  )
  const startdisplay = (value) => {
    if (value == 1) {
      return start1
    } else if (value == 2) {
      return start2
    } else if (value == 3) {
      return start3
    } else if (value == 4) {
      return start4
    } else if (value == 5) {
      return start5
    }
  }

  return (
    <>
      <a href={`/product/${item.productId}`}>
        <div className="activity-main-cont">
          <div className="activity-picture">
            <div
              className={
                wishlist.findIndex(
                  (value) => value.productId == item.productId
                ) != -1
                  ? 'activity-follow active'
                  : 'activity-follow'
              }
              onClick={(e) => {
                addWishlistCheck(e, item)
              }}
            >
              <FaHeart />
            </div>
            <img
              src={`http://localhost:5000/images/product/${item.productImg}`}
            />
          </div>
          <div className="activity-title">
            <p>{item.productName}</p>
          </div>
          <div className="activity-local">
            <p>
              <FaMapMarkerAlt />
              {item.productAddress}
            </p>
          </div>
          <div className="home-activity-star">
            <div className="start-group">{startdisplay(item.star)}</div>
          </div>
        </div>
      </a>
    </>
  )
}
const mapStateToProps = (store) => {
  return {
    wishlist: store.orderReducer.wishData,
  }
}
const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProduct)
