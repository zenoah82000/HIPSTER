import React from 'react'
import '../styles/Product.scss'

function Product(props) {
  return (
    <>
      <div className="container product-content">
        <div className="row">
          <aside className="aside-wrapper col-md-3">
            <div className="aside-wrapper-filter-box">
              <h3>所有商品類別</h3>
              <div>
                <div className="drop-title">
                  <h4>戶外活動</h4>
                </div>
                <ul className="checkbox-dropdown-list">
                  <li className="checkbox">1</li>
                  <li className="checkbox">1</li>
                  <li className="checkbox">1</li>
                  <li className="checkbox">1</li>
                </ul>
              </div>
              <div>
                <div className="drop-title">
                  <h4>戶外活動</h4>
                </div>
                <ul className="checkbox-dropdown-list">
                  <li className="checkbox">1</li>
                  <li className="checkbox">1</li>
                  <li className="checkbox">1</li>
                  <li className="checkbox">1</li>
                </ul>
              </div>
              <div>
                <div className="drop-title">
                  <h4>戶外活動</h4>
                </div>
                <ul className="checkbox-dropdown-list active">
                  <li className="checkbox">1</li>
                  <li className="checkbox">1</li>
                  <li className="checkbox">1</li>
                  <li className="checkbox">1</li>
                </ul>
              </div>
              <div>
                <div className="drop-title">
                  <h4>戶外活動</h4>
                </div>
                <ul className="checkbox-dropdown-list">
                  <li className="checkbox">1</li>
                  <li className="checkbox">1</li>
                  <li className="checkbox">1</li>
                  <li className="checkbox">1</li>
                </ul>
              </div>
            </div>
            <div className="aside-wrapper-filter-box">
              <h3>導覽語言</h3>
              <ul className="checkbox-dropdown-list">
                <li className="type-li active">全部</li>
                <li className="type-li active">中文</li>
                <li className="type-li active">English</li>
                <li className="type-li active">日本語</li>
              </ul>
            </div>
            <div className="aside-wrapper-filter-box">
              <h3>行程時間</h3>
              <ul className="checkbox-dropdown-list">
                <li className="type-li active">全部</li>
                <li className="type-li active">中文</li>
                <li className="type-li active">English</li>
                <li className="type-li active">日本語</li>
              </ul>
            </div>
          </aside>
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
