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
                  <i className="fab fa-hotjar"></i> 熱門程度
                </a>
              </span>
              <span>
                <span className="gap">|</span>
                <a href="">
                  <i className="fas fa-star"></i>用戶評價
                </a>
              </span>
              <span>
                <span className="gap">|</span>
                <a href="">
                  <i className="fas fa-dollar-sign"></i>價格：低到高
                </a>
              </span>
            </div>
            <div className="product-list-search-info">
              <a href="">
                <div className="row">
                  <div className="col-sm-5 col-lg-4">
                    <img src="" />
                  </div>
                  <div className="col-sm-7 col-lg-8">
                    <div className="product-detail">
                      <div className="product-label"></div>
                      <h3>
                        台灣澎湖跳島一日遊 |
                        探索浪漫七美＆絕美藍洞＆南方四島＆雙心石滬等 |
                        自選遊覽車或機車環島
                      </h3>
                      <p className="product-description"></p>
                      <div className="product-place">
                        <i className="fas fa-map-marker-alt"></i>
                        台灣 澎湖
                      </div>
                      <div className="product-time">
                        <i className="far fa-calendar"></i>
                        最早可使用日期：今日
                      </div>
                      <div className="product-footer">
                        <div className="product-star"></div>
                        <span className="divider">|</span>
                        <div className="product-price">
                          <span>TWD</span>
                          <h4>130</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
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
