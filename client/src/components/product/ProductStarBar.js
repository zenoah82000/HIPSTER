import React from 'react'
import '../../styles/product/ProductStarBar.scss'

function ProductStarBar(props) {
  return (
    <>
      <div className="product-star-bar">
        <div className="product-star-box">
          <p>
            <i className="fas fa-star"></i>
            <span className="product-star-scores"> 4.8 </span>
            <a href="#review" className="product-comment-num">
              (4則評論)
            </a>
            <span className="separator"></span>
          </p>
          <span className="product-bought-num"> 100+ 人參加過</span>
        </div>
        <div className="product-wish-list">
          <i class="far fa-heart"></i>
          <span>心願清單</span>
        </div>
      </div>
    </>
  )
}

export default ProductStarBar
