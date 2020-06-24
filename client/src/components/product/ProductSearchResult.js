import React from 'react'
import '../../styles/product/ProductSearchResult.scss'

function ProductSearchResult(props) {
  const { productnumbers } = props
  // console.log(productnumbers)
  return (
    <>
      <div className="product-result">
        <h4>{productnumbers} 項行程</h4>
      </div>
    </>
  )
}

export default ProductSearchResult
