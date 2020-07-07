import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Swal from 'sweetalert2'

import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getBlogDataAsync, getBlogCommentsDataAsync, addBlogCommentsDataAsync } from '../../actions/blog'

function BlogDetail(props) {  
  const { blogData, blogCommentsData, getBlogDataAsync, getBlogCommentsDataAsync, addBlogCommentsDataAsync } = props   
  const { articleId } = props.match.params
  const memberId = JSON.parse(localStorage.getItem('member')).id
  const memberImg = JSON.parse(localStorage.getItem('member')).img
  const [addCommentContent, setAddCommentContent] =  useState('')  
  let categoryId

  useEffect(() => {
    getBlogDataAsync()
    getBlogCommentsDataAsync()  
    console.log('componentDidMount') 
  }, [])    

  const showBlogDetail = blogData.map((item)=>{
    if(item.articleId==articleId){
      //取得這篇文章的類別ID，給關連文章
      categoryId = item.categoryId
    return (
      <div className="d-flex">
        <div className="col-8" key={item.articleId}>
          <h1>{item.articleTitle}</h1>
          <p>{'發文日期:'+item.created_at}</p>
          <div className="blog-main-content" dangerouslySetInnerHTML={{__html: item.articleContent}}>        
          </div>                   
        </div>
        <div className="col-1"></div>
        <aside className="col-3 blog-content-aside">
          <div className="card">
            <p>作者資訊</p>
            <div className="blog-author-avatar">
              <img src={`http://localhost:5000/images/member/${item.memberImg}`} alt="author" className="d-block"/>
            </div>
            <h3 className="text-center">{item.memberName}</h3>
            {/* <p className="text-center">發表文章數:999</p> */}
            {/* <button className="btn d-block">看更多他的文</button> */}
          </div>
          {/* <div className="featured">
            <p>本月精選</p>
            <hr/>
            <div className="row">
              <div className="col-2">
                <img src={author1} />
              </div>
              <div className="col-10">本月精選標題1</div>
            </div>             
            <hr/>
            <div className="row">
              <div className="col-2">
                <img src={author1} />
              </div>
              <div className="col-10">本月精選標題1</div>
            </div>             
            <hr/>
            <div className="row">
              <div className="col-2">
                <img src={author1} />
              </div>
              <div className="col-10">本月精選標題1</div>
            </div>             
          </div> */}
        </aside>
      </div>
    )}
  })

  const BlogRelated = blogData.filter((item)=>(
    item.categoryId == categoryId && item.articleId < 10
    ))
  
  const showBlogRelated = BlogRelated.map((item)=>{
    if(categoryId)
    if(item.categoryId == categoryId)
    if(item.articleId != articleId)
    return (
      
      <li className="col-3">
        <Link to={"/blogDetail/" + item.articleId} className="d-block">
        <img src={item.articleImg}/>
        <h5 className="my-3">{item.articleTitle}</h5>
        </Link>
      </li>      
    )
  })

  //取得這一頁的評論
  const thisPageBlogComment = blogCommentsData.filter((item)=>(item.articleId == articleId))
  const numBlogComment = thisPageBlogComment.length
  const showBlogComment = thisPageBlogComment.map((item)=>{    
    return(
      <>
        <div className="row blog-comment-item">
          <div className="col-2"><img src={`http://localhost:5000/images/member/${item.memberImg}`}/></div>
          <div className="col-8">
            <div>{item.commentContent}</div>
            <div>
              <span>{item.created_at}</span>
              <Link>回覆</Link>
            </div>
          </div>          
        </div>
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
    <div className="container">
      <MyBreadcrumb />
      <div>
        {showBlogDetail} 
        <div className="related-posts my-5">
          <h3>相關文章</h3>
          <ul className="row list-unstyled">
            {showBlogRelated}             
          </ul>
        </div>                       
      </div>
      <div className="row">
        <div className="blog-comment col-8">
          <h3>{numBlogComment + '則評論'}</h3>
          <hr />      
          {showBlogComment}      
          <ul className="list-unstyled">
            <li><textarea col="50" row="30" onChange={(event) => {
              setAddCommentContent(event.target.value)
            }}></textarea></li>
            <li><button className="btn" onClick={()=>{
              handleSubmit()
            }}>送出評論</button></li>
          </ul>
        </div>
      </div>      
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