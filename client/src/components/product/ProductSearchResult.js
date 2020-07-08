import React, { useState, useEffect } from 'react'

import '../../styles/product/ProductSearchResult.scss'

function ProductSearchResult(props) {
  const { productnumbers, loading } = props

  useEffect(() => {
    console.log(loading)
  }, [loading])
  // console.log(productnumbers)
  return (
    <>
      <div className="product-result">
        {loading ? <h4>載入中</h4> : <h4>{productnumbers} 項行程</h4>}
        {/* <h4>{productnumbers} 項行程</h4> */}
      </div>
    </>
  )
}

export default ProductSearchResult
