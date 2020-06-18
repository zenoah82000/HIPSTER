import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import MyBreadcrumb from '../../components/MyBreadcrumb'

function BlogAdd(props) {
  console.log('BlogAdd:', props)

  return (
    <>
      <Container>
        <MyBreadcrumb />
        <ul className="list-unstyled blog-add-ul">
          <li className="d-flex justify-content-between">
            <div>
              <select className="blog-select-category">
                <option selected>請選擇類別</option>
                <option value="1">類別1</option>
                <option value="2">類別2</option>
                <option value="3">類別3</option>
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
              placeholder="請輸入文章標題"
            />
          </li>
          <li>
            <CKEditor
              editor={ClassicEditor}
              data="<p>Hello from CKEditor 5!</p>"
              onInit={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor)
              }}
              onChange={(event, editor) => {
                const data = editor.getData()
                console.log({ event, editor, data })
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

export default withRouter(BlogAdd)
