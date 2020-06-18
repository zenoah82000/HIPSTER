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
              <button className="btn btn-primary">取消發文</button>
              <button className="btn btn-primary">發佈文章</button>
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
            <textarea className="blog-add-content"></textarea>
          </li>
        </ul>
      </Container>
    </>
  )
}

export default withRouter(BlogAdd)
