import React from 'react'

function ProductSearchResultSort(props) {
  return (
    <>
      <div className="product-result-sort">
        <h4>排序：</h4>
        <span>
          <span className="gap">|</span>
          <a href="">
            <i className="far fa-thumbs-up"></i>網站推薦
          </a>
        </span>
        <span>
          <span className="gap">|</span>
          <a href="">
            <i className="fab fa-hotjar"></i> 熱門程度
          </a>
        </span>
        <span>
          <span className="gap">|</span>
          <a href="">
            <i className="fas fa-star"></i>用戶評價
          </a>
        </span>
        <span>
          <span className="gap">|</span>
          <a href="">
            <i className="fas fa-dollar-sign"></i>價格：低到高
          </a>
        </span>
      </div>
    </>
  )
}

export default ProductSearchResultSort
