import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

function OrderPage(props) {
  const { orderlist, currentPage ,setCurrentPage} = props
  const totalpages = orderlist.totalPages
  const groupCount = 5
  const [startPage, setStartPage] = useState(1)
  // const currentPage = !!searchParams.get('page') ? +searchParams.get('page') : 1
  function startPageset(targetpage) {
    if (targetpage >= groupCount) {
      setStartPage(targetpage - 2)
    } else if (targetpage < groupCount) {
      setStartPage(1)
    } else if (currentPage === 1) {
      setStartPage(1)
    }
    
  }
  const display = () => {
    let pages = []
    pages.push(
      <li
        key={'previous'}
        className={+currentPage > 1 ? '' : 'disabled'}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setCurrentPage(currentPage -1)
          startPageset(currentPage - 1)
        }}
      >
        上一頁
      </li>
    )
    if (totalpages <= 7) {
      for (let i = 1; i <= totalpages; i++) {
        pages.push(
          <li
            key={i}
            className={i === currentPage ? 'active' : ''}
            // to={`?page=${i}`}
            onClick={() => {
              if (i != currentPage) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
              setCurrentPage(i)
              startPageset(i)
            }}
          >
            {i}
          </li>
        )
      }
    } else {
      pages.push(
        <li
          key={1}
          className={currentPage === 1 ? 'active' : ''}
          onClick={() => {
            if(!currentPage === 1){
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            setCurrentPage(1)  
            startPageset(1)
          }}
        >
          1
        </li>
      )
      let pageLength = 0
      if (groupCount + startPage > totalpages) {
        pageLength = totalpages
      } else {
        pageLength = groupCount + startPage
      }
      if (currentPage >= groupCount) {
        pages.push(
          <li key={-1}>
            <a className="disabled">···</a>
          </li>
        )
      }
      for (let i = startPage; i < pageLength; i++) {
        if (i <= totalpages - 1 && i > 1) {
          pages.push(
            <li
              key={i}
              className={currentPage === i ? 'active' : ''}
              onClick={() => {
                if (!i == currentPage) {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
                setCurrentPage(i)
                startPageset(i)
              }}
            >
              {i}
            </li>
          )
        }
      }
      if (totalpages - startPage > groupCount) {
        pages.push(<li key={-2} className="disabled">···</li>)
      }
      pages.push(
        <li
          key={totalpages}
          className={currentPage === totalpages ? 'active' : ''}
          onClick={() => {
            if (!totalpages == currentPage) {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            setCurrentPage(totalpages)
            startPageset(totalpages)
          }}
        >
          {totalpages}
        </li>
      )
    }

    pages.push(
      <li
        key={'next'}
        className={currentPage === totalpages ? 'disabled' : ''}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setCurrentPage(currentPage +1)
          startPageset(currentPage + 1)
          
        }}
      >
        下一頁
      </li>
    )
    return pages
  }
  useEffect(() => {
    startPageset(currentPage)
  }, [])
  useEffect(() => {
    startPageset(currentPage)
  }, [currentPage])

  return (
    <>
      <ul className="orderpage">{display()}</ul>
    </>
  )
}

export default withRouter(OrderPage)
