import React from 'react'
import '../../styles/product/ProductBanner.scss'

function ProductBanner(props) {
  const { productImg } = props
  return (
    <>
      <div
        className="product-banner"
        style={{
          backgroundImage: `url(http://localhost:5000/images/product/${productImg})`,
        }}
      ></div>
    </>
  )
}

export default ProductBanner
