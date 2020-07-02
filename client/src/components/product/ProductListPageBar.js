import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../../styles/product/ProductListPageBar.scss'

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

  let searchParams = new URLSearchParams(props.location.search)

  const display = () => {
    let pages = []
    for (let i = 1; i <= totalpages; i++) {
      pages.push(
        <li key={i}>
          <a
            className={i === +currentPage ? 'active' : ''}
            // to={`?page=${i}`}
            onClick={() => {
              searchParams.get('page')
                ? searchParams.set('page', i)
                : searchParams.append('page', i)
              window.scrollTo({ top: 0, behavior: 'smooth' })
              props.history.push(`?${searchParams.toString()}`)
            }}
          >
            {i}
          </a>
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

export default withRouter(ProductListPageBar)
