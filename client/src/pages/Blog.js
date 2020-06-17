import React from 'react'
import { Link, withRouter } from 'react-router-dom'

// import { Container } from 'react-bootstrap'

import Masonry from 'react-masonry-css'

import '../components/blog/Masonry.css'

import MyBreadcrumb from '../components/blog/MyBreadcrumb'

import author1 from '../components/blog/author1.jpg'
import author2 from '../components/blog/author2.jpg'
import author3 from '../components/blog/author3.jpg'
import author4 from '../components/blog/author4.jpg'
import author5 from '../components/blog/author5.jpg'
import author6 from '../components/blog/author6.jpg'
import author7 from '../components/blog/author7.jpg'
import author8 from '../components/blog/author8.jpg'

function Blog(props) {
  console.log('Blog:', props)

  var items = [
    {
      id: 1,
      title: '文章標題: 狗頭',
      text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
      author: '作者: dog',
    },
    {
      id: 2,
      title: '文章標題: 狗頭',
      text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
      author: '作者: dog',
    },
    {
      id: 3,
      title: '文章標題: 狗頭',
      text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
      author: '作者: dog',
    },
    {
      id: 4,
      title: '文章標題: 狗頭',
      text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
      author: '作者: dog',
    },
    {
      id: 5,
      title: '文章標題: 狗頭',
      text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
      author: '作者: dog',
    },
    {
      id: 6,
      title: '文章標題: 狗頭',
      text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
      author: '作者: dog',
    },
    {
      id: 7,
      title: '文章標題: 狗頭',
      text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
      author: '作者: dog',
    },
    {
      id: 8,
      title: '文章標題: 狗頭',
      text: '文章內文: 汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪汪',
      author: '作者: dog',
    },
  ]

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
  items = items.map(function (item) {
    return (
      <div key={item.id} className="blog-list-card">
        <img src={authorImgArr[item.id - 1]} />
        <h3>{item.title}</h3>
        <p>
          這是自由發揮的地方
          <br />
          你的文青足跡
          <br />
        </p>
        <p className="author-date">
          <span>{item.author}</span>
          <span>2020年6月1日</span>
        </p>
      </div>
    )
  })

  return (
    <>
      {/* <Link to="/">Home - Router Link</Link> */}
      <div className="container">
        <MyBreadcrumb />
        <Masonry
          breakpointCols={{ default: 4, 800: 2 }}
          classtitle="my-masonry-grid"
          columnClasstitle="my-masonry-grid_column"
        >
          {items}
        </Masonry>
      </div>
    </>
  )
}

export default withRouter(Blog)
