import React from 'react'

import author1 from '../../images/blog/author1.jpg'

function UserBlog() {
  return (
    <>
      <h3 className="ml-3 mt-3">我的文章</h3>
      <div className="row">Slider</div>
      <button className="btn">發表新文章</button>
      <hr />

      <div className="row myblog-list-item">
        <div className="col-2">
          <img src={author1} alt="author1" />
        </div>
        <div className="col-8">
          <h3>個人的文章標題</h3>
          <p>個人的文章內容</p>
        </div>
        <div className="col-2">
          <button className="btn">編輯</button>
          <button className="btn">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className="row myblog-list-item">
        <div className="col-2">
          <img src={author1} alt="author1" />
        </div>
        <div className="col-8">
          <h3>個人的文章標題</h3>
          <p>個人的文章內容</p>
        </div>
        <div className="col-2">
          <button className="btn">編輯</button>
          <button className="btn">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default UserBlog
