import React from 'react'
import '../../styles/product/BookArea.scss'

function BookArea(props) {
  return (
    <>
      <div className="book-area">
        <div className="price-info">
          <h2>NT $ 1,500</h2>
        </div>
        <div className="book-info">
          <ul>
            <li>
              <i class="far fa-circle"></i>
              <div>今日可訂</div>
            </li>
            <li>
              <i class="far fa-circle"></i>
              <div>立即確認並獲得憑證</div>
            </li>
          </ul>
        </div>
        <input type="submit" className="book-btn" value="加入購物車" />
      </div>
    </>
  )
}

export default BookArea
