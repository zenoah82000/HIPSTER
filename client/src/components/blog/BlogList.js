import React from 'react'
import { Link, withRouter, NavLink } from 'react-router-dom'
import Masonry from 'react-masonry-css'

function BlogList(props) {  
    const {blogDataRp} =props
    const { categoryId } = props.match.params || 0
    let showBlogList
    // console.log('BlogList-categoryId',categoryId)
    // console.log('props', props)

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
    <Masonry
        breakpointCols={{ default: 4, 1200:3, 600: 2 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
    >
        {showBlogList}
    </Masonry>    
    </>
  )
}

export default withRouter(BlogList)