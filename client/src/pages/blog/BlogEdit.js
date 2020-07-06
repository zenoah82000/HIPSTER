import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container, Form } from 'react-bootstrap'
import $ from 'jquery'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getBlogDataAsync,editBlogDataAsync } from '../../actions/blog'

function BlogEdit(props) {
  const { blogData,getBlogDataAsync,editBlogDataAsync } = props
  const { articleId } = props.match.params
  const articleContent = localStorage.getItem('articleContent')
  // console.log('articleContent',articleContent)
  
  const [editArticleTitle, setEditArticleTitle] = useState('')
  const [editArticleCategory, setEditArticleCategory] = useState('')
  const [editArticleContent, setEditArticleContent] = useState('')
  const [editArticleImg, setEditArticleImg] = useState('') 

  let blogDataItem = {}
  let blogItemTitle = ""
  let blogItemCategory= ""
  let blogItemContent= ""
  let blogItemImg = ""
    
  useEffect(() => {
    getBlogDataAsync()
    console.log('componentDidMount')    
  }, []) 

  useEffect(() => {
    if(blogData && blogData.length){
      blogDataItem = blogData.find((item)=>item.articleId==articleId)
      // console.log('blogDataItem',blogDataItem)
      //設定受控元件
      setEditArticleTitle(blogDataItem.articleTitle)
      setEditArticleCategory(blogDataItem.categoryId)
      setEditArticleContent(blogDataItem.articleContent)
      setEditArticleImg(blogDataItem.articleImg)
      //儲存未修改前的data
      blogItemTitle = blogDataItem.articleTitle
      blogItemCategory = blogDataItem.categoryId
      blogItemContent = blogDataItem.articleContent
      blogItemImg = blogDataItem.articleImg
      // console.log('blogItemContent',blogItemContent)  
    }
    console.log('componentDidUpdate')    
  }, [blogData])       
  
  const handleSubmit = ()=>{      
    const editArticleFd = new FormData()
    editArticleFd.append('articleId', articleId)
    //如果有改變則append改變後的state值，如未改變則append未修改的值    
    editArticleFd.append('articleTitle', editArticleTitle?editArticleTitle:blogItemTitle)    
    editArticleFd.append('categoryId', editArticleCategory?editArticleCategory:blogItemCategory)
    editArticleFd.append('articleContent', editArticleContent?editArticleContent:blogItemContent)    
    editArticleFd.append('articleImg', editArticleImg?editArticleImg:blogItemImg)    
    for(let pair of editArticleFd.entries()) {
      console.log('editArticleFd內所有的鍵值對: ',pair[0]+ ', '+ pair[1]); 
    }
    editBlogDataAsync(editArticleFd)  
  }
  let showBlogEdit
  if(blogData && blogData.length){
  showBlogEdit = 
        <ul className="list-unstyled blog-add-ul">
          <li className="d-flex justify-content-between">
            <div>
              <Form>
                  <Form.Group>
                    {/* <Form.Label>文章類別</Form.Label> */}
                    <Form.Control as="select" className="blog-select-category" value={editArticleCategory} onChange={event => setEditArticleCategory(event.target.value)}>
                      <option value="1">心情抒發</option>
                      <option value="2">靈感角落</option>
                      <option value="3">重點書評</option>
                      <option value="4">活動分享</option>
                      <option value="5">新人新書</option>
                      <option value="6">手寫日記</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              {/* <select className="blog-select-category" value={editArticleCategory} onChange={event => setEditArticleCategory(event.target.value)}>                
                <option value="1">心情抒發</option>
                <option value="2">靈感角落</option>
                <option value="3">重點書評</option>
                <option value="4">活動分享</option>
                <option value="5">新人新書</option>
                <option value="6">手寫日記</option>
              </select> */}
            </div>
            <div className="blog-add-btn">
              <button className="btn" 
              onClick={e=>{
                e.preventDefault()
                props.history.go(-1)}}
              >取消編輯</button>
              <button className="btn" onClick={e => {
                  e.preventDefault()
                  handleSubmit()
                  props.history.push('/blog')
                  }}>編輯完成</button>
            </div>
          </li>
          <li>
            <input
              className="blog-add-title"
              type="text"
              value={editArticleTitle} 
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
              onInit={(editor) => {
                // You can store the "editor" and use when it is needed.
                  editor.setData(articleContent)
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
                editor.setData(editArticleContent)
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
  editBlogDataAsync
})(BlogEdit))