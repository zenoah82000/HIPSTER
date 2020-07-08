import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Swal from 'sweetalert2'
import Fade from 'react-reveal/Fade'

import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getBlogDataAsync, getBlogCommentsDataAsync, addBlogCommentsDataAsync } from '../../actions/blog'

function BlogDetail(props) {  
  const { blogData, blogCommentsData, getBlogDataAsync, getBlogCommentsDataAsync, addBlogCommentsDataAsync } = props   
  const { articleId } = props.match.params
  const memberId = JSON.parse(localStorage.getItem('member')).id
  // const memberImg = JSON.parse(localStorage.getItem('member')).img
  const [addCommentContent, setAddCommentContent] =  useState('')  
  let categoryId

  useEffect(() => {
    getBlogDataAsync()
    getBlogCommentsDataAsync()  
    console.log('componentDidMount') 
  }, [])    

  const blogDataFt = blogData.filter((item)=>{
     //取得這篇文章的類別ID，給關連文章
    categoryId = item.categoryId
    return item.articleId==articleId
  })

  const blogDataFeatured = blogData.filter((item)=>{    
    return (item.articleId < 6)
  })

  const showBlogDetail = blogDataFt.map((item)=>{
    return (
      <>
        <div className="col-9">
         <div className="blog-detail-main">
          <h1 className="blog-detail-title">{item.articleTitle}</h1>
          <p className="blog-detail-date">{'發文日期:'+item.created_at}</p>
          <div className="blog-detail-content" dangerouslySetInnerHTML={{__html: item.articleContent}}>        
          </div>
         </div>                             
        </div>              
      </>
    )
  })

  const showAuthor = blogDataFt.map((item)=>{
    return(      
      <div className="card">
        <p>作者資訊</p>
        <div className="blog-author-avatar">
          <img src={`http://localhost:5000/images/member/${item.memberImg}`} alt="author" className="d-block"/>
        </div>
        <h3 className="text-center">{item.memberName}</h3>
        {/* <p className="text-center">發表文章數:999</p> */}
        <button className="btn d-block">看更多他的文</button>
      </div>
    )
  })

  const showFeatured = blogDataFeatured.map((item)=>{
    return(
      <>
        <Link to={"/blogDetail/" + item.articleId} className="d-block">
        <div className="row">
          <div className="col-3">
            <img src={item.articleImg}/>
          </div>
          <div className="col-9">
            <p className="pl-3">{item.articleTitle}</p>
          </div>
        </div>  
        </Link>           
        {/* <hr/>         */}
      </>
    )
  })

  

  const BlogRelated = blogData.filter((item)=>(
    item.categoryId == categoryId && item.articleId < 10
    ))
  
  const showBlogRelated = BlogRelated.map((item)=>{
    if(categoryId)
    if(item.categoryId == categoryId)
    if(item.articleId != articleId)
    return (
      <Fade bottom>
        <li className="col-3 py-3">
          <Link to={"/blogDetail/" + item.articleId} className="d-block">
          <img src={item.articleImg}/>
          <p className="related-card-title">{item.articleTitle}</p>
          <ul className="related-author-date d-flex list-unstyled row">
            <li className="col-2">
            <img src={`http://localhost:5000/images/member/${item.memberImg}`}/>
            </li>
            <li className="author-name col-7"><p>{item.memberName}</p></li>
            <li className="col-3"><p>{item.created_at}</p></li>
          </ul>
          </Link>
        </li>   
      </Fade>   
    )
  })

  //取得這一頁的評論
  const thisPageBlogComment = blogCommentsData.filter((item)=>(item.articleId == articleId))
  const numBlogComment = thisPageBlogComment.length
  const showBlogComment = thisPageBlogComment.map((item)=>{    
    return(
      <>
        <ul className="row blog-comment-item list-unstyled">
          <li className="col-2">
            <img className="d-block" src={`http://localhost:5000/images/member/${item.memberImg}`}/>
            <p className="blog-commentator">{item.memberName}</p>
          </li>
          <li className="col-8">
            <p className="blog-comment-text pl-3">{item.commentContent}</p>
          </li>          
          <li className="col-2 text-right"> 
            <p>{item.created_at}</p>
            {/* <Link>回覆</Link> */}
          </li>          
        </ul>
        <hr />         
      </>
    )
  })

  const handleSubmit = ()=>{
    if(!addCommentContent){
      Swal.fire({
        title:'請輸入評論的內容再送出',
        icon: 'warning'
      })
    }else{
      Swal.fire({
        title: '確定送出評論?',
        // text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.value) {
          const addBlogCommentFd = new FormData()
          addBlogCommentFd.append('articleId', articleId)    
          addBlogCommentFd.append('memberId', memberId)    
          addBlogCommentFd.append('commentContent', addCommentContent)
          addBlogCommentFd.append('commentParentId', 0) 
          for(let pair of addBlogCommentFd.entries()) {
            console.log('addBlogCommentFd內所有的鍵值對: ',pair[0]+ ', '+ pair[1]); 
          }
          addBlogCommentsDataAsync(addBlogCommentFd)           

          Swal.fire({
            title:'發佈成功',
            icon: 'success'
          }).then(()=>{
            props.history.go(0)
          })                             
        }
      })
    } 
  }

  return (
    <div className="blog-list-bg">
    <Container>
      {/* <MyBreadcrumb /> */}
      <div className="d-flex py-5">
        {showBlogDetail}
        <aside className="col-3 blog-content-aside">
          {showAuthor}
          <div className="featured">
            <h3>精選文章</h3>
            <hr/>
            {showFeatured} 
          </div>
        </aside>       
      </div> 
      <div className="blog-related-posts my-5">
        <h3>相關文章</h3>
        <hr />
        <ul className="row list-unstyled">
          {showBlogRelated}  
        </ul>
      </div>   
      <div className="row">
        <div className="blog-comment col-8">
          <h3>{numBlogComment + '則評論'}</h3>
          <hr />      
          {showBlogComment}      
          <ul className="comment-input list-unstyled">
            <li><textarea col="50" row="30" onChange={(event) => {
              setAddCommentContent(event.target.value)
            }}></textarea></li>
            <li><button className="btn" onClick={()=>{
              handleSubmit()
            }}>送出評論</button></li>
          </ul>
        </div>
      </div>      
    </Container>
    </div>
  )
}

const mapStateToProps = (store) =>({ 
  blogData: store.blogReducer.blogData, 
  blogCommentsData: store.blogReducer.blogCommentsData, 
})

export default withRouter(connect(mapStateToProps, {
  getBlogDataAsync,
  getBlogCommentsDataAsync,
  addBlogCommentsDataAsync
})(BlogDetail))