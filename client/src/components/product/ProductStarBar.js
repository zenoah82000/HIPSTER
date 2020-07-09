import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import '../../styles/product/ProductStarBar.scss'

function ProductStarBar(props) {
  const {
    wishlist,
    addwishlist,
    deletewishlist,
    product,
    commentNum,
    star,
  } = props
  // console.log(product)
  const member = JSON.parse(localStorage.getItem('member')) || ''
  const addWish = () => {
    if (member.id) {
      if (
        wishlist.findIndex((value) => value.productId == product.productId) !=
        -1
      ) {
        deletewishlist(product)
      } else {
        addwishlist(product)
      }
    } else {
      alert('請先登入')
    }
  }
  return (
    <>
      <div className="product-star-bar">
        <div className="product-star-box">
          <p>
            <i className="fas fa-star"></i>
            <span className="product-star-scores"> {product.star} </span>
            <a href="#review" className="product-comment-num">
              ({commentNum}則評論)
            </a>
            <span className="separator"></span>
          </p>
          <span className="product-bought-num"> 100+ 人參加過</span>
        </div>
        <div
          className="product-wish-list"
          onClick={() => {
            addWish()
          }}
        >
          {wishlist.findIndex(
            (value) => value.productId == product.productId
          ) != -1 ? (
            <FontAwesomeIcon icon={fas.faHeart} className="active" />
          ) : (
            <FontAwesomeIcon icon={far.faHeart} className="" />
          )}
          <span>願望清單</span>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (store) => {
  return {
    wishlist: store.orderReducer.wishData,
  }
}
const mapDispatchToProps = null
export default connect(mapStateToProps, mapDispatchToProps)(ProductStarBar)
