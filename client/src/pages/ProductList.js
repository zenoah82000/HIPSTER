import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import '../styles/ProductList.scss'

import AsideBar from '../components/product/AsideBar'
import ProductListMainContent from '../components/product/ProductListMainContent'
import ProductSearchResult from '../components/product/ProductSearchResult'
import ProductSearchResultSort from '../components/product/ProductSearchResultSort'
import ProductListPageBar from '../components/product/ProductListPageBar'

import { getProductListAsync } from '../actions/product/getProductList'

import ReactStars from 'react-rating-stars-component'

function ProductList(props) {
  const { productListData, getProductListAsync } = props
  const [date, setDate] = useState(new Date())
  const searchParams = new URLSearchParams(props.location.search)
  const currentpage = searchParams.get('page')
  const currentPage = !!currentpage ? +currentpage : 1
  const perPage = 5
  const cat = searchParams.getAll('cat')

  console.log(currentPage, cat)

  useEffect(() => {
    getProductListAsync()
    setDate(new Date())
  }, [])

  const display = productListData.map((item, index) => {
    if (
      index >= currentPage * perPage - perPage &&
      index < currentPage * perPage
    ) {
      return (
        <>
          <div
            className="product-list-search-info"
            key={item.productId}
            dataValue={index}
          >
            <a href={`/product/${item.productId}`} target="__blank">
              <div className="row">
                <div className="col-sm-5 col-lg-4">
                  <img
                    src={`http://localhost:5000/images/product/product_20200505083531.jpg`}
                    alt=""
                  />
                </div>
                <div className="col-sm-7 col-lg-8 px-15">
                  <div className="product-detail">
                    <div className="product-label"></div>
                    <h3>{item.productName}</h3>
                    <p className="product-description">{item.productContent}</p>
                    <div className="product-place">
                      <i className="fas fa-map-marker-alt"></i>
                      {item.productAddress}
                    </div>
                    <div className="product-time">
                      <i className="far fa-calendar"></i>
                      最早可使用日期：
                      {date >= new Date(item.productEndingDate)
                        ? '今日'
                        : new Date(item.productEndingDate).toLocaleDateString()}
                    </div>
                    <div className="product-footer ">
                      <div className="product-star">
                        <ReactStars
                          value={3}
                          count={5}
                          size={20}
                          half={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          color2={'#ffd700'}
                          edit={false}
                        />
                      </div>
                      <span className="divider"></span>
                      <div className="product-booked-number">
                        6.7K+ 個已訂購
                      </div>
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
        </>
      )
    }
  })
  console.log(display)

  return (
    <>
      <div className="container product-content">
        <div className="row">
          <AsideBar />
          <ProductListMainContent>
            <ProductSearchResult productnumbers={productListData.length} />
            <ProductSearchResultSort />
            {/* -------商品列表區域------ */}
            {display}
            {/* -------商品列表區域------ */}
            <ProductListPageBar
              productnumbers={productListData.length}
              currentpage={currentPage}
            />
          </ProductListMainContent>
        </div>
      </div>
    </>
  )
}

// 將redux中的store的state(狀態)
// 對應到這個元件中的props中
const mapStateToProps = (store) => {
  return { productListData: store.productReducer.productListData }
}

// 綁定store的dispatch方法到這個元件的props
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ addValue, minusValue }, dispatch)
// }

// 高階元件的樣式，必要的
export default withRouter(
  connect(mapStateToProps, {
    getProductListAsync,
  })(ProductList)
)
