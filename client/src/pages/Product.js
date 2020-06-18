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
            {/* product head */}
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
            <div className="product-time">
              <p>活動時間:2020-05-30</p>
            </div>
            {/* product head */}
            <ul className="product-info-icon">
              <li>
                <i class="far fa-circle"></i>
                <div>不予更改</div>
              </li>
              <li>
                <i class="far fa-circle"></i>
                <div>可出示手機電子憑證或列印的紙本憑證</div>
              </li>
              <li>
                <i class="far fa-circle"></i>
                <div>僅限指定日期使用</div>
              </li>
              <li>
                <i class="far fa-circle"></i>
                <div>必須兌換實體票券</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
