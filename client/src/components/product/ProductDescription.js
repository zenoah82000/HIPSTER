import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import '../../styles/product/ProductDescription.scss'

import { getProductMultiImgAsync } from '../../actions/product/getProductMultiImg'

function ProductDescription(props) {
  const { productContent, getProductMultiImgAsync, productMultiImg } = props

  useEffect(() => {
    console.log(props.match.params.id)
    getProductMultiImgAsync(props.match.params.id)
  }, [])

  const productImgs = [...productMultiImg]

  // console.log({ ...productImgs[0] })
  const img1 = { ...productImgs[0] }.productImgs
  const img2 = { ...productImgs[1] }.productImgs
  const str1 = { ...productImgs[0] }.img_description
  const str2 = { ...productImgs[1] }.img_description

  return (
    <>
      <div className="product-description">
        <h2 className="product-description-title">行程介紹</h2>
        <pre className="product-content">{productContent}</pre>
        <div className="product-images-area">
          <figure className="product-images">
            <img
              src={`http://localhost:5000/images/product/${img1}`}
              alt={img1}
            />
            <figcaption>
              <div className="triangle"></div>
              {str1}
            </figcaption>
          </figure>
          <figure className="product-images">
            <img
              src={`http://localhost:5000/images/product/${img2}`}
              alt={img1}
            />
            <figcaption>
              <div className="triangle"></div>
              {str2}
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (store) => {
  return { productMultiImg: store.productReducer.productMultiImg }
}

export default withRouter(
  connect(mapStateToProps, {
    getProductMultiImgAsync,
  })(ProductDescription)
)
