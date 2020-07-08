import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Link, NavLink, Switch, } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import BlogSort from '../../components/blog/BlogSort'
import BlogList from '../../components/blog/BlogList'
import { getBlogDataAsync } from '../../actions/blog'

function Blog(props) {      
  const { blogData,getBlogDataAsync } = props
  const { url, path } = props.match
  
  let blogDataRp = []  

  if(blogData && blogData.length){    
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

  return (
    <div className="blog-list-bg">
      <Container>
        <BlogSort url={url}/>   
        <Switch>
          <Route exact path={path}>
            <BlogList blogDataRp={blogDataRp} />
          </Route>
          <Route path={`${path}/:categoryId?`}>
            <BlogList blogDataRp={blogDataRp} />
          </Route>
        </Switch>
      </Container>
    </div>
  )
}
const mapStateToProps = (store) =>({ blogData: store.blogReducer.blogData})

export default withRouter(connect(mapStateToProps, {
  getBlogDataAsync,
})(Blog))