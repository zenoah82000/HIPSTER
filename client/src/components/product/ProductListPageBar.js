import React from 'react'
import '../../styles/product/ProductListPageBar.scss'

function ProductListPageBar(props) {
  return (
    <>
      <ul className="page-bar">
        <li>
          <a className="active" href="">
            1
          </a>
        </li>
        <li>
          <a href="">2</a>
        </li>
        <li>
          <a href="">3</a>
        </li>
      </ul>
    </>
  )
}

export default ProductListPageBar
