import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import MyBreadcrumb from '../../components/blog/MyBreadcrumb'

import author1 from '../../components/blog/author1.jpg'

// import MyBreadcrumb from '../../components/blog/MyBreadcrumb'

function BlogContent(props) {
  console.log('BlogContent:', props)

  return (
    <div className="container">
      <MyBreadcrumb />
      <div className="row d-flex">
        <div className="col-8">
          <h1>文章詳細頁的標題</h1>
          <p>發文日期:2020年6月1日</p>
          <div className="blog-main-content">
            文章的主要內容
            <br />
            文章的主要內容
            <br />
            文章的主要內容
            <br />
            文章的主要內容
          </div>
        </div>
        <aside className="col-4 blog-content-aside">
          <button className="btn btn-primary d-block">發表新文章</button>
          <div className="card">
            <p>作者資訊</p>
            <div className="blog-author-avatar">
              <img src={author1} alt="author" />
            </div>
            <h3 className="text-center">感情專家</h3>
            <p className="text-center">發表文章數:999</p>
            <button className="btn btn-primary d-block">看更多牠的文</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default withRouter(BlogContent)
