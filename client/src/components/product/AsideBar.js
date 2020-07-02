import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import Calendar from 'react-calendar'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Collapse } from '@material-ui/core'
import InputRange from 'react-input-range'

import '../../styles/product/AsideBar.scss'
// import 'react-input-range/lib/css/index.css'

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
  let searchParams = new URLSearchParams(props.location.search)

  const { loc, cat, productCatogryData, getProductCategoryAsync } = props

  const [categorySection, setCategorySection] = useState([])
  const [value, setValue] = useState({ min: 32, max: 10000 })
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }

  console.log(searchParams.toString())
  console.log(typeof searchParams)
  console.log(searchParams.entries())

  //類別選項收闔
  function AddcategorySection(category) {
    if (categorySection.includes(category)) {
      let index = categorySection.indexOf(category)
      categorySection.splice(index, 1)
    } else {
      categorySection.push(category)
    }
    const data = [...categorySection]
    setCategorySection(data)
  }
  function checkcategory(item) {
    if (categorySection.includes(item)) {
      return 'checkbox-dropdown-list active'
    } else {
      return 'checkbox-dropdown-list'
    }
  }
  function checkloc(i = 0) {
    if (loc) {
      if (
        loc.includes(1) &&
        loc.includes(2) &&
        loc.includes(3) &&
        loc.includes(4)
      ) {
        return true
      } else if (loc.includes(i)) {
        return true
      }
      return false
    }
    return false
  }

  useEffect(() => {
    getProductCategoryAsync()
  }, [])

  //生成類別
  const display = productCatogryData.map((item, index) => {
    if (item.categoryParentId === 0) {
      return (
        <>
          <div>
            <div
              key={item.categoryName}
              className="drop-title"
              onClick={() => {
                // setActiveClass(!activeClass)
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
              <li className="checkbox" key={item.categoryId}>
                <i className="far fa-square"></i>
                全部
              </li>
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
        <div className="aside-wrapper-filter-box">
          <h3 onClick={handleChange} style={{ cursor: 'pointer' }}>
            地區
          </h3>
          <Collapse in={checked} timeout={200}>
            <ul className="checkbox-dropdown-list active">
              <li
                className={
                  checkloc() ? 'checkbox px-0 checked' : 'checkbox px-0 '
                }
                key="全部"
                onClick={() => {
                  searchParams.get('loc')
                    ? searchParams.get('loc') === '1,2,3,4'
                      ? searchParams.delete('loc')
                      : searchParams.set('loc', '1,2,3,4')
                    : searchParams.append('loc', '1,2,3,4')

                  props.history.push(`?${searchParams.toString()}`)
                }}
              >
                <i
                  className={
                    checkloc() ? 'far fa-check-square' : 'far fa-square'
                  }
                ></i>
                全部
              </li>

              <li className="checkbox px-0" key="北部">
                <i className="far fa-square"></i> 北部
              </li>
              <li className="checkbox px-0" key="中部">
                <i className="far fa-square"></i> 中部
              </li>
              <li className="checkbox px-0" key="南部">
                <i className="far fa-square"></i> 南部
              </li>
              <li className="checkbox px-0" key="東部">
                <i className="far fa-square"></i> 東部
              </li>
              <li className="checkbox px-0" key="外島">
                <i className="far fa-square"></i> 外島
              </li>
            </ul>
          </Collapse>
        </div>
        <Dropdown>
          <Dropdown.Toggle
            className="aside-wrapper-filter-box"
            drop={'down'}
            variant={'success'}
          >
            <h3>篩選日期</h3>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Calendar />
          </Dropdown.Menu>
        </Dropdown>

        <div className="aside-wrapper-filter-box" style={{ cursor: 'default' }}>
          <h3>價格</h3>
          <div className="price-area">
            {value.min} ~ {value.max}
          </div>
          <div className="range">
            <InputRange
              maxValue={10000}
              minValue={32}
              value={value}
              onChange={(value) => setValue(value)}
              onChangeComplete={(value) => console.log(value)}
            />
          </div>
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
export default withRouter(
  connect(mapStateToProps, {
    getProductCategoryAsync,
  })(AsideBar)
)
