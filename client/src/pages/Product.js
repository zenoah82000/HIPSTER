import React from 'react'
import '../styles/Product.scss'

function Product(props) {
  return (
    <>
      <div className="aside-wrapper">
        <div className="aside-wrapper-title">
          <h2>所有商品類別</h2>
          <div>
            <div className="drop-title">
              <h3>戶外活動</h3>
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
              <h3>戶外活動</h3>
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
              <h3>戶外活動</h3>
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
              <h3>戶外活動</h3>
            </div>
            <ul className="checkbox-dropdown-list">
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
            </ul>
          </div>
        </div>
        <div className="aside-wrapper-title">
          <h2>導覽語言</h2>
          <ul className="cate-ul">
            <li className="type-li active">全部</li>
            <li className="type-li active">中文</li>
            <li className="type-li active">English</li>
            <li className="type-li active">日本語</li>
          </ul>
        </div>
        <div className="aside-wrapper-title">
          <h2>行程時間</h2>
          <ul className="cate-ul">
            <li className="type-li active">全部</li>
            <li className="type-li active">中文</li>
            <li className="type-li active">English</li>
            <li className="type-li active">日本語</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Product