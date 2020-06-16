import React from 'react'

function AsideBar(props) {
  return (
    <>
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
    </>
  )
}

export default AsideBar
