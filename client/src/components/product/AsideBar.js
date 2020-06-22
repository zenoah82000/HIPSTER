import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import Calendar from 'react-calendar'

import '../../styles/product/AsideBar.scss'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProductCategoryAsync } from '../../actions/product/getProductCategory'

function AsideBar(props) {
  useEffect(() => {
    getProductCategoryAsync()
  }, [])
  return (
    <>
      <aside className="aside-wrapper col-md-3">
        <div className="aside-wrapper-filter-box">
          <h3>所有商品類別</h3>
          <div>
            <div className="drop-title">
              <h5>戶外活動</h5>
            </div>
            <ul className="checkbox-dropdown-list">
              <li className="checkbox">
                <i className="far fa-square"></i>1
              </li>
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
            </ul>
          </div>
          <div>
            <div className="drop-title">
              <h5>戶外活動</h5>
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
              <h5>戶外活動</h5>
            </div>
            <ul className="checkbox-dropdown-list active">
              <li className="checkbox">
                <i className="far fa-square"></i>1
              </li>
              <li className="checkbox">
                <i className="far fa-square"></i>1
              </li>
              <li className="checkbox">
                <i className="far fa-square"></i>1
              </li>
              <li className="checkbox">
                <i className="far fa-square"></i>1
              </li>
            </ul>
          </div>
          <div>
            <div className="drop-title">
              <h5>戶外活動</h5>
            </div>
            <ul className="checkbox-dropdown-list">
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
              <li className="checkbox">1</li>
            </ul>
          </div>
        </div>
        <Dropdown>
          <Dropdown.Toggle className="aside-wrapper-filter-box" drop={'down'}>
            <h3>篩選出發日期</h3>
          </Dropdown.Toggle>
          <Dropdown.Menu></Dropdown.Menu>
        </Dropdown>
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
            <li className="type-li active">0~1小時</li>
            <li className="type-li active">1~3小時</li>
            <li className="type-li active">3~5小時</li>
            <li className="type-li active">5小時以上</li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default AsideBar
