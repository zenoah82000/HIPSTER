import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import '../../styles/product/BookArea.scss'

function BookArea(props) {
  const { productPrice, productEndingDate } = props
  const [selectDate, setSelectDate] = useState(new Date())
  return (
    <>
      <div className="book-area">
        <div className="price-info">
          <h2>NT $ {productPrice}</h2>
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
        <div className="calendarforbook">
          <Calendar
            value={selectDate}
            showNeighboringMonth={false}
            maxDate={new Date(productEndingDate)}
            onChange={(value) => {
              console.log(selectDate)
              setSelectDate(value)
              console.log(value)
            }}
          />
        </div>
        <div></div>
        <div type="button" className="book-btn">
          加入購物車
        </div>
      </div>
    </>
  )
}

export default BookArea
