import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

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

import { getProductInfoAsync } from '../actions/product/getProductInfo'

function Product(props) {
  const { productListData, getProductInfoAsync } = props

  useEffect(() => {
    console.log(props.match.params.id)
    getProductInfoAsync(props.match.params.id)
  }, [])

  const product = { ...productListData[0] }
  // console.log(product)
  return (
    <>
      <div className="bg-white text-brown">
        <div className="container position-relative">
          <ProductBanner />
          <MyBreadcrumb />
          <BookArea />
          <div className="product-main-left">
            <h1 className="product-title">{product.productName}</h1>
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

const mapStateToProps = (store) => {
  return { productListData: store.productReducer.productListData }
}

export default withRouter(
  connect(mapStateToProps, {
    getProductInfoAsync,
  })(Product)
)
