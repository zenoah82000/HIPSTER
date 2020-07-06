import React, { useState } from 'react'
import '../../styles/mContent/userComment.scss'
import { Link, NavLink, withRouter } from 'react-router-dom'
import RatingStar from './ratingStar'

import myComment from '../../data/myComment.json'

import { BsPlusCircle } from 'react-icons/bs'
import { IconContext } from 'react-icons'

import RatingStarValue from './ratingStarValue'
import ReplyComment from './replycomment'
//確認框
import Swal from 'sweetalert2'

// https://medium.com/@hugh_Program_learning_diary_Js/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6-react-react-form-%E5%A0%B1%E5%90%8D%E8%A1%A8%E5%96%AE-ebd5e3a7201a

//假資料
function MyComment(props) {

  return (
    <>
     myCommentlist.length >= 1 ? (
      myCommentlist.map((item) => {
      <Fade>
        <div className="reply-listview">
          <div className="comment-tbhead">
            <div class="row">
              <div class="col-9 pl-1">
                <h5
                  className="eventTitle "
                  style={{ fontWeight: 'bold' }}
                >
                  {item.productName}
                </h5>
              </div>
              <div class="col-3 pr-1">
                <ul className="float-right list-unstyled">
                  <li>
                    <small>訂單編號:{item.orderId}</small>
                  </li>
                  <li>
                    <small>活動日期:{item.date.substring(0, 10)}</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div className="myReplyBox d-flex">
              <div className="eventImgBox col-3">
                <img
                  src={
                    'http://localhost:5000/images/product/' +
                    item.productImg
                  }
                  alt=""
                />
              </div>
              <div className="col-9 pl-3">
                <ul className=" list-unstyled">
                  <li className="d-flex">
                    <p style={{ fontWeight: 'bold' }}>評價星等:</p>
                    {item.star ? (
                      <p>{stars(item.star)}</p>
                    ) : (
                      <p>未提交星等</p>
                    )}
                  </li>

                  <li className="d-flex">
                    <p style={{ fontWeight: 'bold' }}>活動相片:</p>

                    {item.commentImg ? (
                      <>
                        <SimpleReactLightbox>
                          <SRLWrapper>
                            <div className="commentImg">
                              <img
                                className="commentImgPhoto commentImghover"
                                src={
                                  'http://localhost:5000/images/comments/' +
                                  item.commentImg
                                }
                                alt={item.content}
                              />
                            </div>
                          </SRLWrapper>
                        </SimpleReactLightbox>
                      </>
                    ) : (
                      <p>未上傳相片</p>
                    )}
                  </li>
                  <li>
                    <p style={{ fontWeight: 'bold' }}>我的評論:</p>
                  </li>
                  <li className="myReply pb-3">
                    <p className="pt-2 text">{item.content}</p>
                  </li>
                  <small className="float-right">
                    回覆日期: {item.updated_at.substring(0, 10)}
                  </small>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  )
})
) : (
<div className="empty text-center"></div>
)

} 
export default MyComment
