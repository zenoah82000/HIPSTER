import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import Calendar from 'react-calendar'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Collapse } from '@material-ui/core'
import InputRange from 'react-input-range'

import '../../styles/product/AsideBar.scss'

import { getProductCategoryAsync } from '../../actions/product/getProductCategory'
import { element } from 'prop-types'

function AsideBar(props) {
  // const getProductCategoryAsync = async (productCategory) => {
  //   const request = new Request('http://127.0.0.1:5000/productCategory', {
  //     method: 'GET',
  //     headers: new Headers({
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }),
  //   })

  //   const response = await fetch(request)
  //   const data = await response.json()
  //   console.log(data)
  // }

  const { productCatogryData, getProductCategoryAsync } = props

  const [activeClass, setActiveClass] = useState(true)
  const [categorySection, setCategorySection] = useState([])
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }

  async function AddcategorySection(category) {
    if (categorySection.includes(category)) {
      let index = categorySection.indexOf(category)
      await categorySection.splice(index, 1)
    } else {
      await categorySection.push(category)
    }
    setCategorySection(categorySection)
  }

  useEffect(() => {
    getProductCategoryAsync()
  }, [])

  function checkcategory(item) {
    if (categorySection.includes(item)) {
      console.log('categorySection', categorySection)
      return 'checkbox-dropdown-list active'
    } else {
      console.log('categorySection', categorySection)
      return 'checkbox-dropdown-list'
    }
  }

  const display = productCatogryData.map((item, index) => {
    if (item.categoryParentId === 0) {
      return (
        <>
          <div>
            <div
              key={item.categoryName}
              className="drop-title"
              onClick={() => {
                setActiveClass(!activeClass)
                AddcategorySection(item.categoryName)
                console.log(categorySection)
              }}
            >
              <h5>{item.categoryName}</h5>
            </div>
            <ul
              className={
                checkcategory(item.categoryName)
                // categorySection.includes(item.categoryName)
                //   ? 'checkbox-dropdown-list active'
                //   : 'checkbox-dropdown-list'
              }
              key={item.categoryId}
            >
              {productCatogryData.map((category, i) => {
                if (category.categoryParentId === item.categoryId) {
                  return (
                    <>
                      <li className="checkbox" key={category.categoryName}>
                        <i className="far fa-square"></i>
                        {category.categoryName}
                      </li>
                    </>
                  )
                }
              })}
            </ul>
          </div>
        </>
      )
    }
  })

  return (
    <>
      <aside className="aside-wrapper col-md-3">
        <div className="aside-wrapper-filter-box">
          <h3>所有商品類別</h3>
          {display}
        </div>
        <Dropdown>
          <Dropdown.Toggle className="aside-wrapper-filter-box" drop={'down'}>
            <h3>篩選出發日期</h3>
          </Dropdown.Toggle>
          <Dropdown.Menu></Dropdown.Menu>
        </Dropdown>
        <div className="aside-wrapper-filter-box" onClick={handleChange}>
          <h3>導覽語言</h3>
          <Collapse in={checked} timeout={200}>
            <ul className="checkbox-dropdown-list active">
              <li className="checkbox px-0" key="all">
                <i className="far fa-square"></i>全部
              </li>
              <li className="checkbox px-0" key="Chinese">
                <i className="far fa-square"></i>中文
              </li>
              <li className="checkbox px-0" key="English">
                <i className="far fa-square"></i>English
              </li>
              <li className="checkbox px-0" key="Japanese">
                <i className="far fa-square"></i>日本語
              </li>
            </ul>
          </Collapse>
        </div>
        <div className="aside-wrapper-filter-box">
          <h3>行程時間</h3>
          <ul className="checkbox-dropdown-list active">
            <li className="checkbox px-0" key="0-1">
              <i className="far fa-square"></i> 0 - 1 小時
            </li>
            <li className="checkbox px-0" key="1-3">
              <i className="far fa-square"></i> 1 - 3 小時
            </li>
            <li className="checkbox px-0" key="3-5">
              <i className="far fa-square"></i> 3 - 5 小時
            </li>
            <li className="checkbox px-0" key="5++">
              <i className="far fa-square"></i> 5 小時以上
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

// 將redux中的store的state(狀態)
// 對應到這個元件中的props中
const mapStateToProps = (store) => {
  return { productCatogryData: store.productReducer.productCatogryData }
}

// 高階元件的樣式，必要的
export default connect(mapStateToProps, {
  getProductCategoryAsync,
})(AsideBar)
