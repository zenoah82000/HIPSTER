import React from 'react'
import { Link, withRouter, NavLink } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import Fade from 'react-reveal/Fade'

function BlogList(props) {  
    const { blogDataRp } = props
    const { categoryId } = props.match.params || 0
    
    const showBlogList = blogDataRp.map((item)=>{        
        return (
          <Fade bottom>
            <div className="blog-fade-container">
              <div key={item.articleId} className="blog-list-card">
                <Link to={"/blogDetail/" + item.articleId} className="d-block text-decoration-none">              
                  <img src={item.articleImg} />
                  <div className="blog-card-content">
                    <p className="blog-card-title">{item.articleTitle}</p>
                    <p className="blog-card-text py-2 my-1">
                    {item.articleContent}
                    </p> 
                    <ul className="author-date d-flex justify-content-between list-unstyled row">
                      <li className="col-2"><img src={`http://localhost:5000/images/member/${item.memberImg}`}/></li>
                      <li className="author-name col-7"><p>{item.memberName}</p></li>
                      <li className="col-3"><p>{item.created_at}</p></li>
                    </ul>
                  </div>                
                </Link>
              </div>
            </div>
          </Fade>
        )
    })

    const blogListFt = blogDataRp.filter((item)=>(item.categoryId == categoryId))
    
    const showBlogListFt = blogListFt.map((item)=>{        
      return (
        <Fade bottom>
        <div>
          <div key={item.articleId} className="blog-list-card">
            <Link to={"/blogDetail/" + item.articleId} className="d-block text-decoration-none">              
              <img src={item.articleImg} />
              <div className="blog-card-content">
                <p className="blog-card-title">{item.articleTitle}</p>
                <p className="blog-card-text py-2 my-1">
                {item.articleContent}
                </p> 
                <ul className="author-date d-flex justify-content-between list-unstyled row">
                  <li className="col-2"><img src={`http://localhost:5000/images/member/${item.memberImg}`}/></li>
                  <li className="author-name col-7"><p>{item.memberName}</p></li>
                  <li className="col-3"><p>{item.created_at}</p></li>
                </ul>
              </div>                
            </Link>
          </div>
          </div>
        </Fade>
      )
  })

  return (
    <>
    <Masonry
        breakpointCols={{ default: 4, 1200:3, 600: 2 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
    >
        {categoryId?showBlogListFt:showBlogList}
    </Masonry>    
    </>
  )
}

export default withRouter(BlogList)