import React, { useState, useEffect } from 'react'
import '../../styles/mContent/userComment.scss'
import { Link, NavLink, withRouter } from 'react-router-dom'
import ProductListPageBar from '../../components/product/ProductListPageBar'
import RatingStarValue from '../../components/comments/ratingStarValue'
import ReplyComment from '../../components/comments/replycomment'
import myComment from '../../data/myComment.json'
import Fade from 'react-reveal/Fade'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox'

import { AiFillStar } from 'react-icons/ai'
import { BsPlusCircle } from 'react-icons/bs'
import { IconContext } from 'react-icons'

//確認框
import Swal from 'sweetalert2'

Date.prototype.pattern = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  }
  var week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d',
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? '/u661f/u671f'
          : '/u5468'
        : '') + week[this.getDay() + '']
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

function UserComment(props) {
  //state
  const [image, setImage] = useState({ file: [], preview: [], raw: '' })
  const [text, setText] = useState('')
  const [myCommentlist, setMyCommentList] = useState([])
  const [noCommentlist, setNoCommentList] = useState([])

  // 後端傳資料
  const commentAsync = async (order) => {
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
    console.log('mount')
    commentAsync()
    return () => console.log('unmount')
  }, [])

  //提交評論
  const handleDelete = (index) => {
    const newList = [...noCommentlist]
    newList.splice(index, 1)
    setNoCommentList(newList)
  }

  //
  const stars = (v) => {
    const star = []
    for (let i = 0; i < 5; i++) {
      star.push(<AiFillStar className={v > i ? 'star1' : 'star2'} />)
    }
    return star
  }

  //顯示已評論
  const displayMyComment =
    myCommentlist.length >= 1 ? (
      myCommentlist.map((item) => {
        return (
          <>
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

  return (
    <>
      {props.match.params.type === 'mycomment' ? (
        <>
          <div className="usercontainer">
            <h2 className="usertitle mb-3   ">我的評價</h2>
            <div className="d-flex comment-bar ">
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
            <div className="d-flex comment-bar border-bottom">
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
              noCommentlist.map((item, index) => (
                <ReplyComment
                  commentData={item}
                  index={index}
                  handleDelete={handleDelete}
                />
              ))
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
          <ProductListPageBar productnumbers={5} currentpage={1} />
        </>
      )}
    </>
  )
}

export default withRouter(UserComment)
