import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FaStar, FaHeart, FaMapMarkerAlt } from 'react-icons/fa'
import { connect } from 'react-redux'

function Articles(props) {
  const { item } = props
  const reg = /<(?:.|\s)*?>/g
  item.articleContent = item.articleContent
    .replace(reg, '')
    .replace(/&nbsp;/gi, '')
  return (
    <>
      <Link to={`/blogDetail/${item.articleId}`} className="blog-group">
        <div className="blog-image">
          <img src={item.articleImg} />
        </div>
        <div className="blog-content">
          <p className="blog-title">{item.articleTitle}</p>
          <p className="blog-text">{item.articleContent}</p>
          <div className="blog-member">
            <div className="blog-member-photo">
              <img
                src={`http://localhost:5000/images/member/${item.memberImg}`}
              />
            </div>
            <p className="blog-member-text">{item.memberName}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Articles
