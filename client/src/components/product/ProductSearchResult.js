import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import '../../styles/product/ProductSearchResult.scss'

function ProductSearchResult(props) {
  const { productnumbers, loading, setPrice } = props

  useEffect(() => {
    console.log(loading)
  }, [loading])
  // console.log(productnumbers)
  return (
    <>
      <div className="product-result">
        {loading ? (
          <h4 style={{ display: 'inline-block' }}>搜尋中</h4>
        ) : (
          <>
            <h4 style={{ display: 'inline-block' }}>{productnumbers} 項行程</h4>
            <div
              className="categoryItem"
              onClick={() => {
                setPrice({ min: 0, max: 5000 })
                props.history.push(`/productlist`)
              }}
            >
              清除所有
            </div>
          </>
        )}
        {/* <h4>{productnumbers} 項行程</h4> */}
      </div>
    </>
  )
}

export default withRouter(ProductSearchResult)
