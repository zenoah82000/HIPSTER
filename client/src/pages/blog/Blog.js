import React, { useState, useEffect } from 'react'
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
    
  const { blogData,getBlogDataAsync } = props
  let blogDataRp = []
  // if(blogData){console.log('blogData', blogData)}

  if(blogData[0]){
    console.log('blogData-Content', blogData[0].articleContent)
    blogDataRp = blogData.map((item)=>{
      const reg = /<(?:.|\s)*?>/g      
      item.articleContent=item.articleContent.replace(reg,'')
      return item
    })  
  }  
  // console.log('blogDataRp', blogDataRp)
  
  useEffect(() => {
    getBlogDataAsync() 
    console.log('componentDidMount')  
  }, [])  
  
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
  const showBlogList = blogDataRp.map((item)=>{    
    return (
      <div key={item.articleId} className="blog-list-card">
      <Link to={"/blogDetail/" + item.articleId} className="d-block">
        <img src={item.articleImg} />
        <h3 className="ml-3">{item.articleTitle}</h3>
        <p className="ml-3">
        {item.articleContent}
        </p>
        <p className="author-date d-flex justify-content-between ml-3">
          <span>{item.author}</span>
          <span>{item.created_at}</span>
        </p>
        </Link>
      </div>
    )
  })
  
  return (
    <>
      <div>
        開發用:
        <Link to="/blogDetail">詳細頁</Link>/<Link to="/blogAdd">新增</Link>/
        <Link to="/blogEdit">編輯</Link>
      </div>
      <Container>
        <MyBreadcrumb />
        <Masonry
          breakpointCols={{ default: 4, 800: 2 }}
          classtitle="my-masonry-grid"
          columnClasstitle="my-masonry-grid_column"
        >
          {showBlogList}
        </Masonry>
      </Container>
    </>
  )
}
const mapStateToProps = (store) =>({ blogData: store.blogReducer.blogData})

export default withRouter(connect(mapStateToProps, {
  getBlogDataAsync,
})(Blog))