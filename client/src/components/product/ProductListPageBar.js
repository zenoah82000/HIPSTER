import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../../styles/product/ProductListPageBar.scss'
import { logDOM } from '@testing-library/react'

function ProductListPageBar(props) {
  const { productnumbers, currentpage } = props

  const currentPage = !!currentpage ? +currentpage : 1
  const perpage = 5
  const totalpages =
    productnumbers === 0 ? 1 : Math.ceil(productnumbers / perpage)
  // console.log(
  //   'productnumbers',
  //   productnumbers,
  //   'currentpage',
  //   !!currentpage,
  //   'totalpages',
  //   totalpages
  // )

  const display = () => {
    let pages = []
    for (let i = 1; i <= totalpages; i++) {
      pages.push(
        <li>
          <Link
            className={i === +currentPage ? 'active' : ''}
            to={`?page=${i}`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            {i}
          </Link>
        </li>
      )
    }
    return pages
  }

  return (
    <>
      <ul className="page-bar">{display()}</ul>
    </>
  )
}

export default ProductListPageBar
