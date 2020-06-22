import React from 'react'
import '../styles/Product.scss'

import MyBreadcrumb from '../components/MyBreadcrumb'
import CommtentList from '../components/comments/commentList'
import ProductBanner from '../components/product/ProductBanner'
import BookArea from '../components/product/BookArea'
import ProductStarBar from '../components/product/ProductStarBar'
import ProductTime from '../components/product/ProductTime'
import Productinfoicon from '../components/product/Productinfoicon'
import ProductDescription from '../components/product/ProductDescription'
import ProductHowtoArea from '../components/product/ProductHowtoArea'

function Product(props) {
  return (
    <>
      <div className="bg-white text-brown">
        <div className="container position-relative">
          <ProductBanner />
          <MyBreadcrumb />
          <BookArea />
          <div className="product-main-left">
            <h1 className="product-title">綠島進階深潛體驗</h1>
            <ProductStarBar />
            <ProductTime />
            <Productinfoicon />
            <ProductDescription />
            <ProductHowtoArea />
            <CommtentList />
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
