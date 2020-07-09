import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Swal from 'sweetalert2'
import Fade from 'react-reveal/Fade'

import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getBlogDataAsync, deleteBlogDataAsync } from '../../actions/blog'

import userBlogTop from '../../images/blog/userBlogTopNew.jpg'

function UserBlog(props) {
  const { blogData, getBlogDataAsync, deleteBlogDataAsync } = props
  const memberId = JSON.parse(localStorage.getItem('member')).id
  const memberImg = JSON.parse(localStorage.getItem('member')).img
  console.log('memberId',memberId)

  let blogDataRp = []   

  useEffect(() => {
    getBlogDataAsync() 
    console.log('componentDidMount')  
  }, [])  

  useEffect(() => {
    
    console.log('componentDidUpdate')  
  }, [blogData])  

  const handleEdit = (articleContent)=>{
    localStorage.setItem('articleContent', articleContent);
  }

  const handleDelete = (articleId)=>{      
    const deleteArticleFd = new FormData()
    deleteArticleFd.append('articleId', articleId)    
    
    for(let pair of deleteArticleFd.entries()) {
      console.log('deleteArticleFd內所有的鍵值對: ',pair[0]+ ', '+ pair[1]); 
    }
    deleteBlogDataAsync(deleteArticleFd)  
  }

  if(blogData && blogData.length){      
    blogDataRp = blogData.map((item)=>{
      const reg = /<(?:.|\s)*?>/g      
    //去除html標籤和空格符號
    item.articleContent=(item.articleContent.replace(reg,'')).replace(/&nbsp;/ig, "")
      return item
    })  
  } 

  const showBlogList = blogDataRp.map((item)=>{
    if(item.memberId==memberId)
    return (
      <>
      <Fade bottom>
       <hr />      
      <div className="row userblog-list-item align-items-center" key={item.articleId}>
        <div className="col-9 row">
          <Link to={"/blogDetail/" + item.articleId} className="d-block col-4 pl-3">
          <img src={item.articleImg} />
        </Link>
        <Link to={"/blogDetail/" + item.articleId} className="d-block col-8 text-decoration-none">
          <p className="userblog-item-title">{item.articleTitle}</p>
          <p className="userblog-item-content">{item.articleContent}</p>
          <p className="userblog-item-date">{'發文時間: ' + item.created_at}</p>
        </Link>
        </div>
        
        <div className="col-3 row userblog-btn-block">
          <Link to={"/blogEdit/" + item.articleId} className="btn col-6 userblog-edit-btn" onClick={()=>{handleEdit(item.articleContent)}}><i class="fas fa-edit"></i>編輯</Link>
          <Link className="btn col-6 text-danger" onClick={e => {
            e.preventDefault()
            Swal.fire({
              title: `刪除 ${item.articleTitle} ?`,
              // text: '',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: '確定',
              cancelButtonText: '取消'
            }).then((result) => {
              if (result.value) {
                handleDelete(item.articleId)
                Swal.fire({
                  title:'刪除成功',
                  icon: 'success'
                }).then(()=>{
                  props.history.go(0)
                })                             
              }
            })            
          }}>
            <i className="fa fa-trash" aria-hidden="true"></i>刪除
          </Link>
        </div>
      </div>  
      </Fade>    
    </>
    )
  })

  

  return (
    <>
      <div className="usercontainer">
        <h2 className="usertitle mb-3">我的文章</h2>      
        <div className="row userBlogTop">
          <img src={userBlogTop} />
        </div>
        <div className="row justify-content-end py-3 pr-3">
          <Link to="/blogAdd/" className="btn userblog-btn-add d-block"><i class="fas fa-plus-square"></i>發表新文章</Link>
        </div>
        {showBlogList} 
      </div>    
    </>
  )
}

const mapStateToProps = (store) =>({ blogData: store.blogReducer.blogData})

export default withRouter(connect(mapStateToProps, {
  getBlogDataAsync,
  deleteBlogDataAsync,
})(UserBlog))