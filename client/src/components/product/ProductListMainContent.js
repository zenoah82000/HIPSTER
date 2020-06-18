import React from 'react'

function ProductListMainContent(props) {
  return (
    <>
      <main className="col-md-9 product-list">{props.children}</main>
    </>
  )
}

export default ProductListMainContent
