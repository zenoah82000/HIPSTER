import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FaStar, FaHeart, FaMapMarkerAlt } from 'react-icons/fa'
import { connect } from 'react-redux'

function FeaturedProduct(props) {
  const { item } = props

  // //商品區塊>關注
  const [heart, setheart] = useState(false)
  const heartClass = heart ? 'activity-follow active' : 'activity-follow'

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
      <Link to={`/product/${item.productId}`}>
        <div className="activity-main-cont">
          <div className="activity-picture">
            <div
              className={heartClass}
              onClick={(event) => {
                event.preventDefault()
                setheart(!heart)
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
            <div className="start-group">{startdisplay(item.rating)}</div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default FeaturedProduct
