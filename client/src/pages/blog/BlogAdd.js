import React,{ useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import $ from 'jquery'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getBlogDataAsync,addBlogContentDataAsync } from '../../actions/blog'

function BlogAdd(props) {  
  const { blogData,getBlogDataAsync,addBlogContentDataAsync } = props

  const [addArticleTitle, setAddArticleTitle] =  useState('')
  const [addArticleCategory, setAddArticleCategory] =  useState(1)
  const [addArticleContent, setAddArticleContent] =  useState('')
  const [addArticleImg, setAddArticleImg] =  useState('')  

  useEffect(() => {
    getBlogDataAsync()
    console.log('componentDidMount')
  }, [])

  const handleSubmit = ()=>{      
    const addArticleFd = new FormData()
    addArticleFd.append('articleTitle', addArticleTitle)    
    addArticleFd.append('categoryId', addArticleCategory)
    addArticleFd.append('articleContent', addArticleContent)    
    addArticleFd.append('articleImg', addArticleImg)    
    // for(let pair of addArticleFd.entries()) {
    //   console.log('addArticleFd內所有的鍵值對: ',pair[0]+ ', '+ pair[1]); 
    // }
    addBlogContentDataAsync(addArticleFd)  
  }

  return (
    <>
      <Container>
        <MyBreadcrumb />
        <ul className="list-unstyled blog-add-ul">
          <li className="d-flex justify-content-between">
            <div>
              <select className="blog-select-category" onChange={event => setAddArticleCategory(event.target.value)} value={addArticleCategory}>                
                <option value="1">心情抒發</option>
                <option value="2">靈感啟發</option>
                <option value="3">活動分享</option>
              </select>
            </div>
            <div className="blog-add-btn">
              <button className="btn">取消發文</button>
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
              placeholder="請輸入文章標題..."
              onChange={event => {
                setAddArticleTitle(event.target.value)            
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
                // console.log('Editor is ready to use!', editor)
              }}
              onChange={(event, editor) => {
                let data = editor.getData()
                data = data.replace(/\"/g,"'")                
                setAddArticleContent(data)
                // console.log({ event, editor, data })
                // console.log('img-length',$(".ck-content img").length)
                if($(".ck-content img").length){
                  const src = $(".ck-content img").attr("src")
                  console.log("src",src)
                  setAddArticleImg(src)                  
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
      </Container>
    </>
  )
}
const mapStateToProps = (store) =>({ blogData: store.blogReducer.blogData})

export default withRouter(connect(mapStateToProps, {
  getBlogDataAsync,
  addBlogContentDataAsync
})(BlogAdd))