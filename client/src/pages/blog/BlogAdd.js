import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import MyBreadcrumb from '../../components/MyBreadcrumb'

function BlogAdd(props) {
  console.log('BlogAdd:', props)

  return (
    <>
      <Container>
        <MyBreadcrumb />
        <select className="blog-select-category">
          <option selected>請選擇類別</option>
          <option value="1">類別1</option>
          <option value="2">類別2</option>
          <option value="3">類別3</option>
        </select>
        <div>
          <input
            className="blog-add-title"
            type="text"
            placeholder="請輸入文章標題"
          />
        </div>
        <div>
          <textarea></textarea>
        </div>
      </Container>
    </>
  )
}

export default withRouter(BlogAdd)
