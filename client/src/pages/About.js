import React from 'react'

//引入自訂元件
import CommentList from '../components/comments/commentList'

function About(props) {
  return (
    <>
      <div className="container">
        <CommentList />
      </div>
    </>
  )
}

export default About
