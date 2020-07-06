import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'

import '../../styles/product/BookArea.scss'

function BookArea(props) {
  const {
    productPrice,
    productEndingDate,
    addCart,
    productName,
    productId,
    productImg,
  } = props
  const [selectDate, setSelectDate] = useState(new Date())
  const [value, setValue] = useState(1)

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
        <div className="number_title">選擇數量:</div>

        <div className="input-range">
          {' '}
          <div
            className={value === 1 ? 'minus_btn disable' : 'minus_btn'}
            onClick={() => {
              if (value === 1) {
                setValue(1)
              } else {
                setValue(value - 1)
              }
            }}
          >
            <i class="fas fa-minus"></i>
          </div>
          <div className="numbersdisplay">{value}</div>
          <div
            className={value === 10 ? 'plus_btn disable' : 'plus_btn'}
            onClick={() => {
              if (value === 10) {
                setValue(10)
              } else {
                setValue(value + 1)
              }
            }}
          >
            <i class="fas fa-plus"></i>
          </div>
        </div>

        <div
          type="button"
          className="book-btn"
          onClick={() => {
            addCart({
              productPrice: productPrice,
              productName: productName,
              productId: productId,
              productImg: productImg,
              date: selectDate.toLocaleDateString(),
              amount: +value,
            })
          }}
        >
          加入購物車
        </div>
      </div>
    </>
  )
}

export default BookArea
