import React from 'react'
import '../../styles/product/Productinfoicon.scss'

function Productinfoicon(props) {
  return (
    <>
      <ul className="product-info-icon">
        <li>
          <i class="far fa-circle"></i>
          <div>不予更改</div>
        </li>
        <li>
          <i class="far fa-circle"></i>
          <div>可出示手機電子憑證或列印的紙本憑證</div>
        </li>
        <li>
          <i class="far fa-circle"></i>
          <div>僅限指定日期使用</div>
        </li>
        <li>
          <i class="far fa-circle"></i>
          <div>必須兌換實體票券</div>
        </li>
      </ul>
    </>
  )
}

export default Productinfoicon
