import React from 'react'
import '../styles/Product.scss'

import AsideBar from '../components/product/AsideBar'

function Product(props) {
  return (
    <>
      <div className="container product-content">
        <div className="row">
          <AsideBar />
          <main className="col-md-9 product-list">
            <div className="product-result">
              <h4>搜索結果</h4>
            </div>
            <div className="product-result-sort">
              <h4>排序：</h4>
              <span>
                <span className="gap">|</span>
                <a href="">
                  <i className="far fa-thumbs-up"></i>網站推薦
                </a>
              </span>
              <span>
                <span className="gap">|</span>
                <a href="">
                  <i class="fab fa-hotjar"></i> 熱門程度
                </a>
              </span>
              <span>
                <span className="gap">|</span>
                <a href="">
                  <i class="fas fa-star"></i>用戶評價
                </a>
              </span>
              <span>
                <span className="gap">|</span>
                <a href="">
                  <i class="fas fa-dollar-sign"></i>價格：低到高
                </a>
              </span>
            </div>
            <div className="product-list-search-info"></div>
            <div className="product-list-search-info"></div>
            <div className="product-list-search-info"></div>
            <div className="product-list-search-info"></div>
            <div className="product-list-search-info"></div>
            <div className="product-list-search-info"></div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Product
