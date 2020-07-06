import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Masonry from 'react-masonry-css'

import { getBlogDataAsync } from '../../actions/blog'

function Blog(props) {      
  const { blogData,getBlogDataAsync } = props
  let { categoryId } = props.match.params || 0
  console.log('categoryId',categoryId)

  let blogDataRp = []
  let showBlogList

  if(blogData && blogData.length){
    // console.log('blogData-Content', blogData[0].articleContent)
    blogDataRp = blogData.map((item)=>{
      const reg = /<(?:.|\s)*?>/g      
      //去除html標籤和空格符號
      item.articleContent=(item.articleContent.replace(reg,'')).replace(/&nbsp;/ig, "")
      return item
    })  
  }  
  
  useEffect(() => {
    getBlogDataAsync() 
    console.log('componentDidMount')  
  }, [])    

  useEffect(() => {    
    
    console.log('componentDidUpdate')  
  }, [categoryId])    
  
  // Convert array to JSX items
  showBlogList = blogDataRp.map((item)=>{
    if(!categoryId) {
    return (
      <div key={item.articleId} className="blog-list-card">
      <Link to={"/blogDetail/" + item.articleId} className="d-block text-decoration-none">
        <img src={item.articleImg} />
        <h6 className="ml-3">{item.articleTitle}</h6>
        <p className="ml-3">
        {item.articleContent}
        </p>        
        <Link to={"/blogDetail/" + item.articleId} className="d-block text-decoration-none ml-3 my-2">(閱讀更多)</Link>
        <ul className="author-date d-flex justify-content-between list-unstyled ml-3 row">
          <li className="col-2"><img src={`http://localhost:5000/images/member/${item.memberImg}`}/></li>
          <li className="list-card-author col-7">{item.memberName}</li>
          <li className="col-3">{item.created_at}</li>
        </ul>
        </Link>
      </div>
    )}else{
      if(item.categoryId == categoryId)
      return (
        <div key={item.articleId} className="blog-list-card">
        <Link to={"/blogDetail/" + item.articleId} className="d-block text-decoration-none">
          <img src={item.articleImg} />
          <h6 className="ml-3">{item.articleTitle}</h6>
          <p className="ml-3">
          {item.articleContent}
          </p>        
          <Link to={"/blogDetail/" + item.articleId} className="d-block text-decoration-none ml-3 my-2">(閱讀更多)</Link>
          <ul className="author-date d-flex justify-content-between list-unstyled ml-3 row">
            <li className="col-2"><img src={`http://localhost:5000/images/member/${item.memberImg}`}/></li>
            <li className="list-card-author col-7">{item.memberName}</li>
            <li className="col-3">{item.created_at}</li>
          </ul>
          </Link>
        </div>
      )
    }
  })
  
  return (
    <>
      <Container>
        <ul className="list-unstyled">
            <li className="">
              <NavLink
                to={'/blog/1'}
                // activeClassName=""
                // className=""               
              >
                心情抒發
              </NavLink>              
            </li>
            <li className="">
              <NavLink
                to={'/blog/2'}
                // activeClassName=""
                // className=""
              >
                靈感角落
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to={'/blog/3'}
                // activeClassName=""
                // className=""
              >
                重點書評
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to={'/blog/4'}
                // activeClassName=""
                // className=""
              >
                活動分享
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to={'/blog/5'}
                // activeClassName=""
                // className=""
              >
                新人新書
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to={'/blog/6'}
                // activeClassName=""
                // className=""
              >
                手寫日記
              </NavLink>
            </li>
          </ul>
        <Masonry
          breakpointCols={{ default: 4, 1200:3, 600: 2 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
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