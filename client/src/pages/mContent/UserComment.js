import React, { useState, useEffect } from 'react'
import '../../styles/mContent/userComment.scss'
import { Link, NavLink, withRouter } from 'react-router-dom'
import RatingStar from '../../components/comments/ratingStar'
import RatingStarValue from '../../components/comments/ratingStarValue'
import ReplyComment from '../../components/comments/replycomment'
import myComment from '../../data/myComment.json'

import { BsPlusCircle } from 'react-icons/bs'
import { IconContext } from 'react-icons'

//確認框
import Swal from 'sweetalert2'

function UserComment(props) {
  //state
  const [image, setImage] = useState({ file: [], preview: [], raw: '' })
  const [text, setText] = useState('')
  const [myCommentlist, setMyCommentList] = useState([])
  const [noCommentlist, setNoCommentList] = useState([])

  // 後端傳資料
  const checkoutAsync = async (order) => {
    const request = new Request('http://localhost:5000/comments/2', {
      method: 'get',
      // body: JSON.stringify(order),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log(data)
    console.log(data.comment)
    setMyCommentList(data.comment)
    setNoCommentList(data.notcomment)
  }

  useEffect(() => {
    checkoutAsync()
  }, [])

  //顯示已評論
  const displayMyComment =
    myCommentlist.length >= 1 ? (
      myCommentlist.map((item) => {
        return (
          <>
            <div className="coupon-listview">
              <div class="row">
                <div className="myReplyBox d-flex">
                  <div className="eventImgBox col-3">
                    <img
                      src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                      alt=""
                    />
                  </div>
                  <div className="myReplyBox col-9 pl-3">
                    <h4 className="eventTitle">{item.name}</h4>
                    <ul className=" list-unstyled">
                      <li className="d-flex">
                        <p>星等</p>
                        <RatingStarValue ratingValue={item.star} />
                      </li>
                      <li>
                        <p>我的回覆:</p>
                      </li>
                      <li className="myReply pb-3">
                        <p className="pt-2 text">{item.content}</p>
                        <div className="d-flex mt-2 mb-2">
                          <div className="commentImg">
                            <img
                              src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                        <span className="">回覆日期: {item.date}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      })
    ) : (
      <div className="empty text-center">
        <img
          className="emptyImg mb-3"
          src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
        />
        <h6>尚未有評價，趕緊探索你下一次的旅程，並標記你心儀的活動體驗</h6>
      </div>
    )

  return (
    <>
      {props.match.params.type === 'mycomment' ? (
        <>
          <div className="usercontainer">
            <h2 className="usertitle mb-3   ">我的評價</h2>
            <div className="d-flex coupon-bar border-bottom">
              <div className="tabcontainer couponactive">
                <NavLink
                  to={`./notcomment`}
                  activeClassName="currentcoupon"
                  className="coupontab-a"
                >
                  尚未評價
                </NavLink>
              </div>

              <div className="tabcontainer">
                <NavLink
                  to={`./mycomment`}
                  activeClassName="currentcoupon"
                  className="coupontab-a"
                >
                  已評價
                </NavLink>
              </div>
            </div>
          </div>
          <div className="tab-pane">{displayMyComment}</div>
        </>
      ) : (
        <>
          <div className="usercontainer">
            <h2 className="usertitle mb-3   ">我的評價</h2>
            <div className="d-flex coupon-bar border-bottom">
              <div className="tabcontainer couponactive">
                <NavLink
                  to={`./notcomment`}
                  activeClassName="currentcoupon"
                  className="coupontab-a"
                >
                  尚未評價
                </NavLink>
              </div>
              <div className="tabcontainer">
                <NavLink
                  to={`./mycomment`}
                  activeClassName="currentcoupon"
                  className="coupontab-a"
                >
                  已評價
                </NavLink>
              </div>
            </div>
          </div>
          <div className="tab-pane">
            {noCommentlist.length >= 1 ? (
              noCommentlist.map((item,index) => <ReplyComment commentData={item} />)
            ) : (
              <div className="empty text-center">
                <img
                  className="emptyImg mb-3"
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                />
                <h6>尚未有評價</h6>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default withRouter(UserComment)
