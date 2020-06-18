import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'

// import MyBreadcrumb from '../../components/blog/MyBreadcrumb'

function BlogEdit(props) {
  console.log('BlogEdit:', props)

  return (
    <>
      <Container>
        <div>編輯頁</div>
      </Container>
    </>
  )
}

export default withRouter(BlogEdit)
