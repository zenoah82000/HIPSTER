import React,{ useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container, Form, InputGroup, FormControl } from 'react-bootstrap'
import $ from 'jquery'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Swal from 'sweetalert2'

import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getBlogDataAsync,addBlogDataAsync } from '../../actions/blog'

function BlogAdd(props) {  
  const { blogData,getBlogDataAsync,addBlogDataAsync } = props
  const memberId = JSON.parse(localStorage.getItem('member')).id
  const memberImg = JSON.parse(localStorage.getItem('member')).img

  const [addArticleTitle, setAddArticleTitle] =  useState('')
  const [addArticleCategory, setAddArticleCategory] =  useState(1)
  const [addArticleContent, setAddArticleContent] =  useState('')
  const [addArticleImg, setAddArticleImg] =  useState('')  

  useEffect(() => {
    getBlogDataAsync()
    console.log('componentDidMount')
  }, [])

  const handleCancel = ()=>{
    Swal.fire({
      title: '取消發文?',
      // text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '是',
      cancelButtonText: '否'
    }).then((result) => {
      if (result.value) {
        props.history.go(-1)
      }
    })
  }
  const handleSubmit = ()=>{
    if(!addArticleTitle || !addArticleContent){
      Swal.fire({
        title:'請輸入文章的標題和內容再發佈',
        icon: 'warning'
      })
    }else{
      Swal.fire({
        title: '確定發佈?',
        // text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.value) {
          const addArticleFd = new FormData()
          addArticleFd.append('memberId', memberId)    
          addArticleFd.append('articleTitle', addArticleTitle)    
          addArticleFd.append('categoryId', addArticleCategory)
          addArticleFd.append('articleContent', addArticleContent)    
          addArticleFd.append('articleImg', addArticleImg)    
          // for(let pair of addArticleFd.entries()) {
          //   console.log('addArticleFd內所有的鍵值對: ',pair[0]+ ', '+ pair[1]); 
          // }
          addBlogDataAsync(addArticleFd)           

          Swal.fire({
            title:'發佈成功',
            icon: 'success'
          }).then(()=>{
            props.history.push('/blog')
          })                             
        }
      })
    } 
  }

  return (
    <>
      <Container>
        <MyBreadcrumb />
        <ul className="list-unstyled blog-add-ul">
          <li className="row">
            <div className="col-2">
              <Form>
                <Form.Group>
                  {/* <Form.Label>文章類別</Form.Label> */}
                  <Form.Control as="select" className="blog-select-category" onChange={event => setAddArticleCategory(event.target.value)} value={addArticleCategory}>
                    <option value="1">心情抒發</option>
                    <option value="2">靈感角落</option>
                    <option value="3">重點書評</option>
                    <option value="4">活動分享</option>
                    <option value="5">新人新書</option>
                    <option value="6">手寫日記</option>
                  </Form.Control>
                </Form.Group>
              </Form>
              {/* <select className="blog-select-category" onChange={event => setAddArticleCategory(event.target.value)} value={addArticleCategory}>                
                <option value="1">心情抒發</option>
                <option value="2">靈感角落</option>
                <option value="3">重點書評</option>
                <option value="4">活動分享</option>
                <option value="5">新人新書</option>
                <option value="6">手寫日記</option>
              </select> */}
            </div>
            <div className="col-8"></div>
            <div className="blog-add-btn col-2 row">
              <button className="btn" onClick={e => {
                  e.preventDefault()
                  handleCancel()
                  }}>取消發文</button>
              <button className="btn" onClick={e => {
                  e.preventDefault()
                  handleSubmit()                  
              }}>發佈文章</button>
            </div>
          </li>
          <li>
            <InputGroup className="mb-3">            
              <FormControl placeholder="請輸入文章標題..."/>
            </InputGroup>
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
  addBlogDataAsync
})(BlogAdd))