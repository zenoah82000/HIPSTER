import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'

// import MyBreadcrumb from '../../components/blog/MyBreadcrumb'

function BlogContent(props) {
  console.log('BlogContent:', props)

  return (
    <>
      <Container>
        <div>詳細頁</div>
      </Container>
    </>
  )
}

export default withRouter(BlogContent)
