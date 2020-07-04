import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Collapse } from '@material-ui/core'
import InputRange from 'react-input-range'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

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
  const [checked2, setChecked2] = useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }
  const categorylist = [...productCatogryData]
  // console.log(searchParams.toString())
  // console.log(loc, cat)
  // console.log(
  //   loc.splice(
  //     loc.findIndex((element) => element === 1),
  //     1
  //   )
  // )
  // console.log(typeof searchParams)
  // console.log(searchParams.entries())

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
  function checkCatChildForItem(arr) {
    let flag = false
    if (cat) {
      for (let i = 0; i < arr.length; i++) {
        if (!![...cat].includes(arr[i])) {
          flag = true
        }
      }
    }

    return flag
  }
  function checkcategory(item) {
    if (categorySection.includes(item)) {
      return true
    } else {
      return false
    }
  }

  //確認篩選種類
  function checkcat(item, itemParent) {
    if (searchParams.get('cat')) {
      if (cat.includes(item) || cat.includes(itemParent)) {
        let paramsIndex = cat.findIndex((element) => element === item)
        let paramsParentIndex = cat.findIndex(
          (element) => element === itemParent
        )

        if (searchParams.get('cat') === item) {
          searchParams.delete('cat')
        } else {
          if (paramsIndex !== -1) {
            cat.splice(paramsIndex, 1).join()
            searchParams.set('cat', cat.join())
          }
          if (paramsParentIndex !== -1) {
            if (searchParams.get('cat') === itemParent) {
              searchParams.delete('cat')
            } else {
              cat.splice(paramsParentIndex, 1).join()
              searchParams.set('cat', cat.join())
            }
          }
        }
      } else {
        cat.push(item)
        searchParams.set('cat', cat.join())
      }
    } else {
      searchParams.append('cat', item)
    }
  }

  //確認篩選地點
  function checkloc(item) {
    if (searchParams.get('loc')) {
      if (searchParams.get('loc').includes(item)) {
        let paramsIndex = loc.findIndex((element) => element === item)
        loc.splice(paramsIndex, 1).join()
        // console.log()
        // console.log(paramsIndex)
        if (searchParams.get('loc') === item) {
          searchParams.delete('loc')
        } else {
          searchParams.set('loc', loc.join())
        }
      } else {
        loc.push(item)
        searchParams.set('loc', loc.join())
      }
    } else {
      searchParams.append('loc', item)
    }
  }

  //確認篩選子種類
  function checkCatChild(arr) {
    let flag = true
    for (let i = 0; i < arr.length; i++) {
      if (!searchParams.get('cat').includes(arr[i])) {
        flag = false
      }
    }
    return flag
  }

  //刪掉子種類
  function deleteCatChild(arr) {
    for (let i = 0; i < arr.length; i++) {
      let index = [...cat].indexOf(arr[i].toString())
      if (index === -1) {
        continue
      } else {
        cat.splice(index, 1)
        searchParams.set('cat', cat.join())
      }
      if (searchParams.get('cat') == '') {
        searchParams.delete('cat')
      }
    }
  }

  //增加子種類
  function addCatChild(arr) {
    deleteCatChild(arr)
    for (let i = 0; i < arr.length; i++) {
      cat.push(arr[i])
    }
    searchParams.set('cat', cat.join())
  }

  useEffect(() => {
    getProductCategoryAsync()
  }, [])

  //生成類別
  const display = categorylist.map((item, index) => {
    if (item.categoryParentId === 0) {
      const categoryChild = categorylist
        .filter((e, i) => e.categoryParentId === item.categoryId)
        .map((it, ind) => {
          return it.categoryId.toString()
        })

      return (
        <>
          <div>
            <div
              key={item.categoryName}
              className={
                checkCatChildForItem(categoryChild) ||
                categorySection.includes(item.categoryName)
                  ? 'drop-title active'
                  : 'drop-title'
              }
              onClick={() => {
                checkCatChildForItem(categoryChild)
                  ? setCategorySection([])
                  : AddcategorySection(item.categoryName)
                // console.log(categorySection)
              }}
            >
              <h5>
                {item.categoryName}
                {categorySection.includes(item.categoryName) ||
                checkCatChildForItem(categoryChild) ? (
                  <FontAwesomeIcon
                    icon={fas.faAngleUp}
                    style={{ fontSize: '18px' }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={fas.faAngleDown}
                    style={{ fontSize: '18px' }}
                  />
                )}
              </h5>
            </div>
            <ul
              className={
                checkcategory(item.categoryName) ||
                checkCatChildForItem(categoryChild)
                  ? 'checkbox-dropdown-list active'
                  : 'checkbox-dropdown-list'
              }
              key={item.categoryId}
            >
              {categorylist.map((category, i) => {
                if (
                  category.categoryParentId === 0 &&
                  category.categoryId === item.categoryId
                ) {
                  return (
                    <>
                      <li
                        className="checkbox"
                        key={item.categoryId}
                        onClick={() => {
                          searchParams.get('cat')
                            ? checkCatChild(categoryChild)
                              ? deleteCatChild(categoryChild)
                              : addCatChild(categoryChild)
                            : searchParams.append('cat', categoryChild.join())
                          searchParams.set('page', 1)
                          props.history.push(`?${searchParams.toString()}`)
                        }}
                      >
                        {searchParams.get('cat') ? (
                          checkCatChild(categoryChild) ? (
                            <FontAwesomeIcon icon={fas.faCheckSquare} />
                          ) : (
                            <FontAwesomeIcon icon={far.faSquare} />
                          )
                        ) : (
                          <FontAwesomeIcon icon={far.faSquare} />
                        )}{' '}
                        全部
                      </li>
                    </>
                  )
                } else if (category.categoryParentId === item.categoryId) {
                  return (
                    <>
                      <li
                        className="checkbox"
                        key={category.categoryName}
                        onClick={() => {
                          checkcat(
                            category.categoryId.toString(),
                            category.categoryParentId.toString()
                          )
                          searchParams.set('page', 1)
                          props.history.push(`?${searchParams.toString()}`)
                        }}
                        value={category.categoryName}
                      >
                        {searchParams.get('cat') ? (
                          searchParams
                            .get('cat')
                            .includes(category.categoryId.toString()) ? (
                            <FontAwesomeIcon icon={fas.faCheckSquare} />
                          ) : (
                            <FontAwesomeIcon icon={far.faSquare} />
                          )
                        ) : (
                          <FontAwesomeIcon icon={far.faSquare} />
                        )}{' '}
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
            {checked ? (
              <FontAwesomeIcon icon={fas.faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={fas.faCaretDown} />
            )}
          </h3>

          <Collapse in={checked} timeout={200}>
            <ul className="checkbox-dropdown-list active">
              <li
                className="checkbox px-0 "
                key="全部"
                onClick={() => {
                  searchParams.get('loc')
                    ? searchParams.get('loc') === '1,2,3,4,5'
                      ? searchParams.delete('loc')
                      : searchParams.set('loc', '1,2,3,4,5')
                    : searchParams.append('loc', '1,2,3,4,5')
                  searchParams.set('page', 1)
                  props.history.push(`?${searchParams.toString()}`)
                }}
              >
                {searchParams.get('loc') ? (
                  searchParams.get('loc').includes('1') &&
                  searchParams.get('loc').includes('2') &&
                  searchParams.get('loc').includes('3') &&
                  searchParams.get('loc').includes('4') &&
                  searchParams.get('loc').includes('5') ? (
                    <FontAwesomeIcon icon={fas.faCheckSquare} />
                  ) : (
                    <FontAwesomeIcon icon={far.faSquare} />
                  )
                ) : (
                  <FontAwesomeIcon icon={far.faSquare} />
                )}{' '}
                全部
              </li>

              <li
                className="checkbox px-0"
                key="北部"
                onClick={() => {
                  checkloc('1')
                  searchParams.set('page', 1)
                  props.history.push(`?${searchParams.toString()}`)
                }}
              >
                {searchParams.get('loc') ? (
                  searchParams.get('loc').includes('1') ? (
                    <FontAwesomeIcon icon={fas.faCheckSquare} />
                  ) : (
                    <FontAwesomeIcon icon={far.faSquare} />
                  )
                ) : (
                  <FontAwesomeIcon icon={far.faSquare} />
                )}{' '}
                北部
              </li>
              <li
                className="checkbox px-0"
                key="中部"
                onClick={() => {
                  checkloc('2')
                  searchParams.set('page', 1)
                  props.history.push(`?${searchParams.toString()}`)
                }}
              >
                {searchParams.get('loc') ? (
                  searchParams.get('loc').includes('2') ? (
                    <FontAwesomeIcon icon={fas.faCheckSquare} />
                  ) : (
                    <FontAwesomeIcon icon={far.faSquare} />
                  )
                ) : (
                  <FontAwesomeIcon icon={far.faSquare} />
                )}{' '}
                中部
              </li>
              <li
                className="checkbox px-0"
                key="南部"
                onClick={() => {
                  checkloc('3')
                  searchParams.set('page', 1)
                  props.history.push(`?${searchParams.toString()}`)
                }}
              >
                {searchParams.get('loc') ? (
                  searchParams.get('loc').includes('3') ? (
                    <FontAwesomeIcon icon={fas.faCheckSquare} />
                  ) : (
                    <FontAwesomeIcon icon={far.faSquare} />
                  )
                ) : (
                  <FontAwesomeIcon icon={far.faSquare} />
                )}{' '}
                南部
              </li>
              <li
                className="checkbox px-0"
                key="東部"
                onClick={() => {
                  checkloc('4')
                  searchParams.set('page', 1)
                  props.history.push(`?${searchParams.toString()}`)
                }}
              >
                {searchParams.get('loc') ? (
                  searchParams.get('loc').includes('4') ? (
                    <FontAwesomeIcon icon={fas.faCheckSquare} />
                  ) : (
                    <FontAwesomeIcon icon={far.faSquare} />
                  )
                ) : (
                  <FontAwesomeIcon icon={far.faSquare} />
                )}{' '}
                東部
              </li>
              <li
                className="checkbox px-0"
                key="外島"
                onClick={() => {
                  checkloc('5')
                  searchParams.set('page', 1)
                  props.history.push(`?${searchParams.toString()}`)
                }}
              >
                {searchParams.get('loc') ? (
                  searchParams.get('loc').includes('5') ? (
                    <FontAwesomeIcon icon={fas.faCheckSquare} />
                  ) : (
                    <FontAwesomeIcon icon={far.faSquare} />
                  )
                ) : (
                  <FontAwesomeIcon icon={far.faSquare} />
                )}{' '}
                外島
              </li>
            </ul>
          </Collapse>
        </div>
        <div>
          <div className="aside-wrapper-filter-box">
            <h3
              onClick={() => {
                setChecked2(!checked2)
              }}
              style={{ cursor: 'pointer' }}
            >
              篩選日期
            </h3>
            <div className={checked2 ? 'calender active' : 'calender'}>
              <Calendar />
            </div>
          </div>
        </div>

        <div className="aside-wrapper-filter-box" style={{ cursor: 'default' }}>
          <h3>價格 (TWD) </h3>
          <div className="price-area">
            {value.min} ~ {value.max}
          </div>
          <div className="range">
            <InputRange
              maxValue={10000}
              minValue={32}
              value={value}
              onChange={(value) => setValue(value)}
              onChangeComplete={(value) => {
                console.log(value)
              }}
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
