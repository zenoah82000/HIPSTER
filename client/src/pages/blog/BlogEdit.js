import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import $ from 'jquery'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getBlogDataAsync,editContentDataAsync } from '../../actions/blog'

function BlogEdit(props) {
  const { blogData,getBlogDataAsync,editContentDataAsync } = props
  const { articleId } = props.match.params
  
  const [editArticleTitle, setEditArticleTitle] = useState('')
  const [editArticleCategory, setEditArticleCategory] = useState('')
  const [editArticleContent, setEditArticleContent] = useState('')
  const [editArticleImg, setEditArticleImg] = useState('') 

  let blogDataItem = {}
  let blogItemTitle = ""
  let blogItemCategory= ""
  let blogItemContent= ""
  let blogItemImg = ""

  //使用blogItem接收fetch後的初始值
  if(blogData && blogData.length){
    blogDataItem = blogData.find((item)=>item.articleId==articleId)
    // console.log('blogDataItem',blogDataItem)
    blogItemTitle = blogDataItem.articleTitle
    blogItemCategory = blogDataItem.categoryId
    blogItemContent = blogDataItem.articleContent
    blogItemImg = blogDataItem.articleImg
    console.log('blogItemContent',blogItemContent)  
  }      

  useEffect(() => {
    getBlogDataAsync()
    console.log('componentDidMount')    
  }, [])      

  // console.log('editArticleTitle',editArticleTitle)
  
  const handleSubmit = ()=>{      
    const editArticleFd = new FormData()
    editArticleFd.append('articleId', articleId)    
    editArticleFd.append('articleTitle', editArticleTitle?editArticleTitle:blogItemTitle)    
    editArticleFd.append('categoryId', editArticleCategory?editArticleCategory:blogItemCategory)
    editArticleFd.append('articleContent', editArticleContent?editArticleContent:blogItemContent)    
    editArticleFd.append('articleImg', editArticleImg?editArticleImg:blogItemImg)    
    for(let pair of editArticleFd.entries()) {
      console.log('editArticleFd內所有的鍵值對: ',pair[0]+ ', '+ pair[1]); 
    }
    editContentDataAsync(editArticleFd)  
  }
  let showBlogEdit
  if(blogData && blogData.length){
  showBlogEdit = 
        <ul className="list-unstyled blog-add-ul">
          <li className="d-flex justify-content-between">
            <div>
              <select className="blog-select-category" defaultValue={blogItemCategory} onChange={event => setEditArticleCategory(event.target.value)}>                
                <option value="1">心情抒發</option>
                <option value="2">靈感啟發</option>
                <option value="3">活動分享</option>
              </select>
            </div>
            <div className="blog-add-btn">
              <button className="btn" 
              // onClick={}
              >取消發文</button>
              <button className="btn" onClick={e => {
                  e.preventDefault()
                  handleSubmit()
                  // props.history.push('/blog')
                  }}>發佈文章</button>
            </div>
          </li>
          <li>
            <input
              className="blog-add-title"
              type="text"
              defaultValue={blogItemTitle} 
              onChange={event => {
                setEditArticleTitle(event.target.value)            
                }}            
            />
          </li>
          <li>
            <CKEditor
              config={{ ckfinder: {
                // 此處設定上傳圖片之 API 路由
                uploadUrl: 'http://localhost:5000/blogAddImg'
              } }}
              editor={ClassicEditor}
              // data="<p>請輸入文章內容...</p>"
              onInit={(editor) => {
                // You can store the "editor" and use when it is needed.
                editor.setData(blogItemContent)
                // console.log('Editor is ready to use!', editor)
              }}
              onChange={(event, editor) => {
                let data = editor.getData()
                data = data.replace(/\"/g,"'")                
                setEditArticleContent(data)                
                console.log({ event, editor, data })
                if($(".ck-content img").length){
                  const src = $(".ck-content img").attr("src")
                  console.log("src",src)
                  setEditArticleImg(src)                  
                }
              }}
              onBlur={(event, editor) => {
                // console.log('Blur.', editor)
              }}
              onFocus={(event, editor) => {
                // console.log('Focus.', editor)
              }}
            />
          </li>          
        </ul>
  }

  return (
    <>
      <Container>
      <MyBreadcrumb />
      {showBlogEdit}
      </Container>
    </>
  )
}

const mapStateToProps = (store) =>({ blogData: store.blogReducer.blogData})

export default withRouter(connect(mapStateToProps, {
  getBlogDataAsync,
  editContentDataAsync
})(BlogEdit))