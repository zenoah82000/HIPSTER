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
import CommentList from '../components/product/commentList_f'

import { getProductInfoAsync } from '../actions/product/getProductInfo'

function Product(props) {
  const {
    productListData,
    getProductInfoAsync,
    addCart,
    addwishlist,
    deletewishlist,
  } = props

  const searchParams = new URLSearchParams(props.location.search)
  const currentPage = !!searchParams.get('page') ? +searchParams.get('page') : 1
  const [star, setStar] = useState(0)
  const [commentNum, setCommentNum] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.log(props.match.params.id)
    getProductInfoAsync(props.match.params.id)
  }, [])

  const product = { ...productListData[0] }
  // console.log(product)
  return (
    <>
      <div className="bg-white text-brown">
        <div className="container">
          <ProductBanner productImg={product.productImg} />
          {/* <MyBreadcrumb /> */}

          <div className="position-relative">
            <div className="product-main-left">
              <h1 className="product-title">{product.productName}</h1>
              <ProductStarBar
                product={{ ...product }}
                addwishlist={addwishlist}
                deletewishlist={deletewishlist}
                commentNum={commentNum}
                star={star}
              />
              <ProductTime />
              <Productinfoicon />
              <ProductDescription productContent={product.productContent} />
              <ProductHowtoArea
                productAddress={product.productAddress}
                addCart={addCart}
              />
              <BookArea
                productPrice={product.productPrice}
                productEndingDate={product.productEndingDate}
                productName={product.productName}
                productId={product.productId}
                productImg={product.productImg}
                addCart={addCart}
              />

              <CommentList
                commentNum={commentNum}
                setCommentNum={setCommentNum}
                star={star}
                setStar={setStar}
                productName={product.productName}
                productId={product.productId}
                currentPage={currentPage}
                setLoading={setLoading}
              />
            </div>
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
