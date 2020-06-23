import React,{ useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import MyBreadcrumb from '../../components/MyBreadcrumb'

import { getBlogDataAsync,addBlogContentDataAsync } from '../../actions/blog'


function BlogAdd(props) {
  // console.log('BlogAdd-props:', props)
  const [addContentTitle, setAddContentTitle] =  useState([null])
  const [addContentCategory, setAddContentCategory] =  useState([null])
  const [addContent, setAddContent] =  useState([null])
  const [addTag1, setAddTag1] =  useState([null])
  const [addTag2, setAddTag2] =  useState([null])
  // const [imgFile, setImgFile] =  useState([null])
  // const [imgDataFiles, setImgDataFiles] =  useState([null])

  const { blogData,getBlogDataAsync,addBlogContentDataAsync } = props
  // console.log('blogData', blogData)


  useEffect(() => {
    getBlogDataAsync()
    addBlogContentDataAsync()
  }, [])

  //Submit
  const handleSubmit = (event)=>{
    const addContentData = { 
      addContentTitle,
      addContentCategory,
      addContent,
      addTag1,
      addTag2,
      // imgDataFiles,
    }
  
    const addContentData_fd = new FormData()
    addContentData_fd.append('blogTitle', addContentData.addContentTitle)
    addContentData_fd.append('categoryName', addContentData.addContentCategory)
    addContentData_fd.append('blogContent', addContentData.addContent)
    addContentData_fd.append('tagName1', addContentData.addTag1)
    addContentData_fd.append('tagName2', addContentData.addTag2)
    // addContentData_fd.append('addImg', addContentData.imgDataFiles)
  
    addBlogContentDataAsync(addContentData_fd, () => alert('成功新增'))  
  }

  return (
    <>
      <Container>
        <MyBreadcrumb />
        <ul className="list-unstyled blog-add-ul">
          <li className="d-flex justify-content-between">
            <div>
              <select className="blog-select-category" onChange={event => setAddContentCategory(event.target.value)}>
                <option selected>請選擇類別</option>
                <option>心情抒發</option>
                <option>靈感啟發</option>
                <option>活動分享</option>
              </select>
            </div>
            <div className="blog-add-btn">
              <button className="btn">取消發文</button>
              <button className="btn">發佈文章</button>
            </div>
          </li>
          <li>
            <input
              className="blog-add-title"
              type="text"
              placeholder="請輸入文章標題..."
              onChange={event => setAddContentTitle(event.target.value)}
            />
          </li>
          <li>
            <CKEditor
              // config={{ ckfinder: {
              //   // 此處設定上傳圖片之 API 路由
              //   uploadUrl: '/blogAdd'
              // } }}
              editor={ClassicEditor}
              // data="<p>請輸入文章內容...</p>"
              onInit={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor)
              }}
              onChange={(event, editor) => {
                const data = editor.getData()
                setAddContent(data)
                console.log({ event, editor, data })
                // console.log('typeof data',typeof data)
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor)
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor)
              }}
            />
          </li>
        </ul>
      </Container>
    </>
  )
}
const mapStateToProps = (store) =>({ blogData: store.blogReducer.blogData})

// 綁定store的dispatch方法到這個元件的props
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ addValue, minusValue }, dispatch)
// }


export default withRouter(connect(mapStateToProps, {
  getBlogDataAsync,
  addBlogContentDataAsync
})(BlogAdd))