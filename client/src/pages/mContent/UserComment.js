import React from 'react'
import '../../styles/mContent/userComment.scss'
import CommentImg from '../../components/comments/commentImg'
import RatingStar from '../../components/comments/ratingStar'

function UserComment() {
  return (
    <>
      <div className="usercontainer">
        <h2 className="usertitle mb-3   ">我的評價</h2>
        <div className="d-flex coupon-bar border-bottom">
          <div className="tabcontainer couponactive">尚未評價</div>
          <div className="tabcontainer">已評價 </div>
        </div>

        <div class="coupon-listview">
          <div class="row">
            <div className="myReplyBox d-flex">
              <div className="eventImgBox col-3">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="myReplyBox col-9 pl-3">
                <h4 className="eventTitle">商品名稱</h4>
                <ul className=" list-unstyled">
                  <li className="d-flex">
                    <p>星等</p>
                    <RatingStar />
                  </li>
                  <li>
                    <p>我的回覆:</p>
                  </li>
                  <li className="myReply pb-3">
                    <p className="pt-2 ">
                      我的回覆我的回覆我的回覆我的回覆我的回覆我的回覆我的回覆我的回覆我的回覆
                    </p>
                    <div className="d-flex mt-5 mb-2">
                      <CommentImg />
                      <CommentImg />
                    </div>
                    <span className="">回覆日期</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="coupon-listview">
          <div class="row">
            <div className="myReplyBox d-flex">
              <div className="eventImgBox col-3">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="myReplyBox col-9 pl-3">
                <h4 className="eventTitle">商品名稱</h4>
                <ul className=" list-unstyled">
                  <li className="d-flex">
                    <p>星等</p>
                    <RatingStar />
                  </li>
                  <li>
                    <p>我的回覆:</p>
                  </li>
                  <li className="myReply pb-3">
                    <p className="pt-2 ">
                      我的回覆我的回覆我的回覆我的回覆我的回覆我的回覆我的回覆我的回覆我的回覆
                    </p>
                    <div className="d-flex mt-5 mb-2">
                      <CommentImg />
                      <CommentImg />
                    </div>
                    <span className="">回覆日期</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="coupon-listview">
          <div class="row">
            <div className="myReplyBox d-flex">
              <div className="eventImgBox col-3">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className="myReplyBox col-9 pl-3">
                <h4 className="eventTitle">商品名稱</h4>
                <ul className=" list-unstyled">
                  <li className="d-flex">
                    <p>星等</p>
                    <RatingStar />
                  </li>
                  <li>
                    <p>我的回覆:</p>
                  </li>
                  <li className="myReply pb-3">
                    <p className="pt-2 ">
                      我的回覆我的回覆我的回覆我的回覆我的回覆我的回覆我的回覆我的回覆我的回覆
                    </p>
                    <div className="d-flex mt-5 mb-2">
                      <CommentImg />
                      <CommentImg />
                    </div>
                    <span className="">回覆日期</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserComment
