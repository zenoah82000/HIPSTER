import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import $ from 'jquery'

import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getBlogDataAsync } from '../../actions/blog'

import author1 from '../../images/blog/author1.jpg'

// import MyBreadcrumb from '../../components/blog/MyBreadcrumb'

function BlogDetail(props) {
  console.log('BlogDetail-props', props)
  const { blogData, getBlogDataAsync } = props
  const { articleId } = props.match.params

  useEffect(() => {
    getBlogDataAsync()   
  }, []) 
  let showBlogDetail =[]
  

  showBlogDetail = blogData.map((item)=>{
    if(item.articleId==articleId){
    $(".blog-main-content").html(item.articleContent)    
    return (
      <div className="col-8" key={item.articleId}>
        <h1>{item.articleTitle}</h1>
        <p>{'發文日期:'+item.created_at}</p>
        <div className="blog-main-content" dangerouslySetInnerHTML={{__html: item.articleContent}}>        
        </div>
      </div>
    )}
  })


  return (
    <div className="container">
      <MyBreadcrumb />
      <div className="row d-flex">
        {showBlogDetail}
        <aside className="col-4 blog-content-aside">
          <button className="btn d-block">發表新文章</button>
          <div className="card">
            <p>作者資訊</p>
            <div className="blog-author-avatar">
              <img src={author1} alt="author" />
            </div>
            <h3 className="text-center">感情專家</h3>
            <p className="text-center">發表文章數:999</p>
            <button className="btn d-block">看更多牠的文</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

const mapStateToProps = (store) =>({ blogData: store.blogReducer.blogData})

export default withRouter(connect(mapStateToProps, {
  getBlogDataAsync
})(BlogDetail))