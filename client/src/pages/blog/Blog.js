import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Masonry from 'react-masonry-css'

import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getBlogDataAsync } from '../../actions/blog'

// import author1 from '../../images/blog/author1.jpg'
// import author2 from '../../images/blog/author2.jpg'
// import author3 from '../../images/blog/author3.jpg'
// import author4 from '../../images/blog/author4.jpg'
// import author5 from '../../images/blog/author5.jpg'
// import author6 from '../../images/blog/author6.jpg'
// import author7 from '../../images/blog/author7.jpg'
// import author8 from '../../images/blog/author8.jpg'

function Blog(props) {  
    
  const { blogData,getBlogDataAsync } = props
  let blogDataRp = []
  // if(blogData){console.log('blogData', blogData)}

  if(blogData[0]){
    console.log('blogData-Content', blogData[0].articleContent)
    blogDataRp = blogData.map((item)=>{
      const reg = /<(?:.|\s)*?>/g      
      //去除html標籤和空格符號
      item.articleContent=(item.articleContent.replace(reg,'')).replace(/&nbsp;/ig, "")
      return item
    })  
  }  
  // console.log('blogDataRp', blogDataRp)
  
  useEffect(() => {
    getBlogDataAsync() 
    console.log('componentDidMount')  
  }, [])  
  
  // const authorImgArr = [
  //   author1,
  //   author2,
  //   author3,
  //   author4,
  //   author5,
  //   author6,
  //   author7,
  //   author8,
  // ] 

  // Convert array to JSX items
  const showBlogList = blogDataRp.map((item)=>{  
    // let created_atRp = item.created_at.replace('2020-','')  
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
  })
  
  return (
    <>
      <Container>
      {/* <div className="text-center">
        <Link to="/blogAdd/" className="btn userblog-btn d-block">發表新文章</Link>
      </div> */}
        {/* <MyBreadcrumb /> */}
        <div className="d-flex coupon-bar border-bottom">
            <div className="tabcontainer">
              <NavLink
                to={'/blog'}
                // activeClassName="currentcoupon"
                // className="coupontab-a"
              >
                心情抒發
              </NavLink>
            </div>
            <div className="tabcontainer">
              <NavLink
                to={'/blog'}
                // activeClassName="currentcoupon"
                // className="coupontab-a"
              >
                靈感啟發
              </NavLink>
            </div>
          </div>
        <Masonry
          breakpointCols={{ default: 4, 1200:3, 600: 2 }}
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