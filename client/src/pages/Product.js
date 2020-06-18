import React from 'react'
import '../styles/Product.scss'

import MyBreadcrumb from '../components/MyBreadcrumb'

function Product(props) {
  return (
    <>
      <div className="bg-white">
        <div className="container">
          <div className="product-banner"></div>
          <div className="product-main-left">
            <MyBreadcrumb />
            <h1 className="product-title">綠島進階深潛體驗</h1>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
