import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa'
import { connect } from 'react-redux'

function CountdownProduct(props) {
  // 設置倒數計時: 結束時間 - 當前時間
  //控制關注愛心class

  const { item, wishlist, addWishlistCheck } = props
  //商品區塊>關注
  // const [heart, setheart] = useState(wishlist.includes(item.productId))
  // console.log(heart)
  // const heartClass = heart ? 'activity-follow active' : 'activity-follow'

  const [thistime, setthistime] = useState('')

  const thistimedata = () => {
    var time = new Date()
    var nowTime = time.getTime() // 獲取當前毫秒數
    setthistime(nowTime)
  }

  const countdowntime = (datatime) => {
    // 當前時間

    var endTime = new Date(datatime) //結束轉毫秒

    // 倒數計時: 差值
    var offsetTime = (endTime - thistime) / 1000 // ** 以秒為單位
    var sec = parseInt(offsetTime % 60) // 秒
    var min = parseInt((offsetTime / 60) % 60) // 分 ex: 90秒
    var hr = parseInt(offsetTime / 60 / 60) // 時
    // console.log('開始時間', time)
    // console.log('結束時間', endTime)
    // console.log('相差', offsetTime, '秒')
    // console.log('相差', hr, '時', min, '分', sec, '秒')

    return (
      <>
        <span className="large">{hr}</span>時
        <span className="large">{min}</span>分
        <span className="large">{sec}</span>秒
      </>
    )
  }

  useEffect(() => {
    setInterval(() => {
      thistimedata()
    }, 1000)
  }, [])

  return (
    <>
      <a href={`/product/${item.productId}`}>
        <p className="countdown-num">
          {[countdowntime(item.productEndingDate)]}
        </p>
        <div className="countdown-main-cont">
          <div className="countdown-picture">
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
          <div className="countdown-title">
            <p>{item.productName}</p>
          </div>
          <div className="countdown-local">
            <p>
              <FaMapMarkerAlt />
              {item.productAddress}
            </p>
          </div>
          <div className="home-countdown-price">
            <p>
              NT$
              {item.productPrice
                .toString()
                .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}
            </p>
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
export default connect(mapStateToProps, mapDispatchToProps)(CountdownProduct)
