import React from 'react'
import '../styles/Product.scss'

import MyBreadcrumb from '../components/MyBreadcrumb'

function Product(props) {
  return (
    <>
      <div className="container">
        <div className="product-banner"></div>
        <MyBreadcrumb />
      </div>
    </>
  )
}

export default Product
