import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Masonry from 'react-masonry-css'

import MyBreadcrumb from '../../components/MyBreadcrumb'

import { getBlogDataAsync } from '../../actions/blog'


import author1 from '../../images/blog/author1.jpg'
import author2 from '../../images/blog/author2.jpg'
import author3 from '../../images/blog/author3.jpg'
import author4 from '../../images/blog/author4.jpg'
import author5 from '../../images/blog/author5.jpg'
import author6 from '../../images/blog/author6.jpg'
import author7 from '../../images/blog/author7.jpg'
import author8 from '../../images/blog/author8.jpg'

function Blog(props) {
  console.log('Blog-props:', props)

  const { blogData,getBlogDataAsync } = props
  console.log('blogData', blogData)
  
  useEffect(() => {
    getBlogDataAsync()    
  }, [])
  
  // let items = [
  //   {
  //     id: 1,
  //     title: '文章標題: 狗頭',
  //     text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
  //     author: '作者: dog',
  //   },
  //   {
  //     id: 2,
  //     title: '文章標題: 狗頭',
  //     text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
  //     author: '作者: dog',
  //   },
  //   {
  //     id: 3,
  //     title: '文章標題: 狗頭',
  //     text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
  //     author: '作者: dog',
  //   },
  //   {
  //     id: 4,
  //     title: '文章標題: 狗頭',
  //     text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
  //     author: '作者: dog',
  //   },
  //   {
  //     id: 5,
  //     title: '文章標題: 狗頭',
  //     text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
  //     author: '作者: dog',
  //   },
  //   {
  //     id: 6,
  //     title: '文章標題: 狗頭',
  //     text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
  //     author: '作者: dog',
  //   },
  //   {
  //     id: 7,
  //     title: '文章標題: 狗頭',
  //     text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
  //     author: '作者: dog',
  //   },
  //   {
  //     id: 8,
  //     title: '文章標題: 狗頭',
  //     text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
  //     author: '作者: dog',
  //   },
  // ]

  const authorImgArr = [
    author1,
    author2,
    author3,
    author4,
    author5,
    author6,
    author7,
    author8,
  ]

  // Convert array to JSX items
  let blogData1 = blogData.map(function (item) {
    return (
      <div key={item.articleId} className="blog-list-card">
        <img src={authorImgArr[item.articleId - 1]} />
        <h3 className="ml-3">{item.articleTitle}</h3>
        <p className="ml-3">
        {item.articleContent}
        </p>
        <p className="author-date d-flex justify-content-between ml-3">
          <span>{item.author}</span>
          <span>{item.created_at}</span>
        </p>
      </div>
    )
  })

  return (
    <>
      <div>
        開發用:
        <Link to="/blogContent">詳細頁</Link>/<Link to="/blogAdd">新增</Link>/
        <Link to="/blogEdit">編輯</Link>
      </div>
      <Container>
        <MyBreadcrumb />
        <Masonry
          breakpointCols={{ default: 4, 800: 2 }}
          classtitle="my-masonry-grid"
          columnClasstitle="my-masonry-grid_column"
        >
          {blogData1}
        </Masonry>
      </Container>
    </>
  )
}

const mapStateToProps = (store) =>({ blogData: store.blogReducer.blogData})

// 綁定store的dispatch方法到這個元件的props
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ addValue, minusValue }, dispatch)
// }

export default withRouter(connect(mapStateToProps, {
  getBlogDataAsync,
})(Blog))