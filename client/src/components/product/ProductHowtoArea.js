import React from 'react'
import '../../styles/product/ProductHowtoArea.scss'

function ProductHowtoArea(props) {
  return (
    <>
      <div className="product-howto-area">
        <h2 className="product-howto-title">如何使用</h2>
        <ul>
          <li>
            參與活動時須出示列印出的使用憑證，或可出示手機上的電子使用憑證
          </li>
          <li>此使用憑證只適用於已獲確認的日期</li>
          <li>入場前請出示憑證並兌換實體票券</li>
        </ul>
        <div className="product-business-time">
          <h3>營業時間</h3>
          <ul>
            <li className="li-16px">9:00 AM – 7:00 PM</li>
          </ul>
        </div>
        <div className="product-location">
          <h3>地址</h3>
          <ul>
            <li className="li-16px">
              桜京和服店京都市下京區醍醐町290番烏丸五條ビル2F（地下鉄五條站2號出口）
            </li>
          </ul>
        </div>
        <div className="product-transport">
          <h3>如何前往</h3>
          <ul>
            <li className="li-16px">
              地鐵：JR 烏丸線五條站，2號出口出來即可看到
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ProductHowtoArea
