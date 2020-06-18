import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function MyBreadcrumb(props) {
  // console.log('MyBreadcrumb:', props)
  const pathlist = ['/', '/blog', '/blogAdd', '/blogContent', '/blogEdit']
  const pathnames = ['首頁', '文章專欄', '文章專欄', '文章專欄', '文章專欄']

  // 先找出對應的中文詞
  let locationPathname = props.location.pathname
  // `/product/xxxx` 轉為 `/product`
  // if (locationPathname.includes('/product')) locationPathname = '/product'

  const index = pathlist.findIndex((v) => v === locationPathname)

  return (
    <>
      <nav aria-label="breadcrumb" className="nav-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {pathnames[index]}
          </li>
        </ol>
      </nav>
    </>
  )
}

export default withRouter(MyBreadcrumb)
