import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import '../../styles/product/ProductSearchResultSort.scss'

function ProductSearchResultSort(props) {
  const { searchParams } = props
  return (
    <>
      <div className="product-result-sort">
        <h4>排序：</h4>
        <span>
          <span className="gap">|</span>
          <a
            className={
              searchParams.has('sort')
                ? searchParams.get('sort') === 'omdesc'
                  ? 'active'
                  : ''
                : 'active'
            }
            onClick={() => {
              searchParams.has('sort')
                ? searchParams.set('sort', 'omdesc')
                : searchParams.append('sort', 'omdesc')
              searchParams.set('page', 1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
              props.history.push(`?${searchParams.toString()}`)
            }}
          >
            <i class="fas fa-thumbs-up"></i> 網站推薦
          </a>
        </span>
        <span>
          <span className="gap">|</span>
          <a
            className={
              searchParams.has('sort')
                ? searchParams.get('sort') === 'prec'
                  ? 'active'
                  : ''
                : ''
            }
            onClick={() => {
              searchParams.has('sort')
                ? searchParams.set('sort', 'prec')
                : searchParams.append('sort', 'prec')
              searchParams.set('page', 1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
              props.history.push(`?${searchParams.toString()}`)
            }}
          >
            <FontAwesomeIcon icon={fas.faCalendarAlt} />
            結束日期
          </a>
        </span>
        <span>
          <span className="gap">|</span>
          <a
            className={
              searchParams.has('sort')
                ? searchParams.get('sort') === 'comdesc'
                  ? 'active'
                  : ''
                : ''
            }
            onClick={() => {
              searchParams.has('sort')
                ? searchParams.set('sort', 'comdesc')
                : searchParams.append('sort', 'comdesc')
              searchParams.set('page', 1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
              props.history.push(`?${searchParams.toString()}`)
            }}
          >
            <i className="fas fa-star"></i>用戶評價
          </a>
        </span>
        <span>
          <span className="gap">|</span>
          <a
            className={
              searchParams.has('sort')
                ? searchParams.get('sort') === 'PRICE_ASC' ||
                  searchParams.get('sort') === 'PRICE_DESC'
                  ? 'active'
                  : ''
                : ''
            }
            onClick={() => {
              searchParams.has('sort')
                ? searchParams.get('sort') === 'PRICE_ASC'
                  ? searchParams.set('sort', 'PRICE_DESC')
                  : searchParams.set('sort', 'PRICE_ASC')
                : searchParams.append('sort', 'PRICE_ASC')
              searchParams.set('page', 1)
              window.scrollTo({ top: 0, behavior: 'smooth' })
              props.history.push(`?${searchParams.toString()}`)
            }}
          >
            <i className="fas fa-dollar-sign"></i>
            {searchParams.has('sort')
              ? searchParams.get('sort') === 'PRICE_ASC'
                ? '價格：低到高'
                : '價格：高到低'
              : '價格：低到高'}
          </a>
        </span>
      </div>
    </>
  )
}

export default withRouter(ProductSearchResultSort)
