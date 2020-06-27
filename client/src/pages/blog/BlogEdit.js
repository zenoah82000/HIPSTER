import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'

import MyBreadcrumb from '../../components/MyBreadcrumb'

import { getBlogDataAsync,addBlogContentDataAsync } from '../../actions/blog'

function BlogEdit(props) {
  console.log('BlogEdit:', props)

  return (
    <>
      <Container>
      <MyBreadcrumb />
        <ul className="list-unstyled blog-add-ul">
          <li className="d-flex justify-content-between">
            <div>
              <select className="blog-select-category">                
                <option value="1">心情抒發</option>
                <option value="2">靈感啟發</option>
                <option value="3">活動分享</option>
              </select>
            </div>
            <div className="blog-add-btn">
              <button className="btn">取消發文</button>
              <button className="btn" onClick={e => {
                  e.preventDefault()
                  
                    // props.history.push('/blog')
                  }}>發佈文章</button>
            </div>
          </li>
          <li>
            <input
              className="blog-add-title"
              type="text"
              placeholder="請輸入文章標題..."
            />
          </li>
          <li>
            <CKEditor
              config={{ ckfinder: {
                // 此處設定上傳圖片之 API 路由
                uploadUrl: '/blogAdd'
              } }}
              editor={ClassicEditor}
              // data="<p>請輸入文章內容...</p>"
              onInit={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor)
              }}
              onChange={(event, editor) => {
                const data = editor.getData()
                
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
})(BlogEdit))