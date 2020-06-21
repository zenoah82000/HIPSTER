import React from 'react'
import '../../styles/mContent/userComment.scss'
import { Link, NavLink, withRouter } from 'react-router-dom'
import RatingStar from '../../components/comments/ratingStar'

import myComment from '../../data/myComment.json'

import { BsPlusCircle } from "react-icons/bs";
import { IconContext } from "react-icons";

function UserComment(props) {
  const data = {}

  myComment.comment.forEach((item, i) => {
    data[item.id] = {
      name: item.name,
      content: item.content,
      date: item.date,
      img: item.img
    }
  })

  // console.log(data)
  let dataArry = []
  for (const key in data) {
    data[key].id = key
    dataArry.push(data[key])
  }
  // console.log(dataArry)

  const displayMyComment =
    dataArry.length >= 1 ? (
      dataArry.map((item) => {
        return (
          <>
            <div className="coupon-listview" >
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
                        <p>活動日期:</p>
                      </li>
                      <li className="d-flex">
                        <p>輸入星等:</p>
                        <RatingStar />
                      </li>
                      <li className="d-flex">
                        <p>上傳相片:</p>
                        <div className="d-flex">
                          <div className="commentImg" >
                            <img
                              src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                              alt=""
                            />
                          </div>
                          <div className="commentImgPlus" >
                          <IconContext.Provider value={{ color: 'rgba(104, 142, 103, 0.8)', size: '40px' }}>
                          <BsPlusCircle />
                          </IconContext.Provider>
                          </div>
                        </div>
                      </li>
                      <li>
                        <p>輸入回覆:</p>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="6 "></textarea>
                      </li>
                    </ul>
                    <button
                      className="btn buttonstyle float-right mt-3"
                      type="submit"
                      id="button-addon2"
                    >
                      提交評論
                </button>
                  </div>
                </div>
              </div>
            </div >
          </>
        )
      })) : (
        <div className="empty text-center">
          <img
            className="emptyImg mb-3"
            src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
          />
          <h6>尚未有評價，趕緊探索你下一次的旅程，並標記你心儀的活動體驗</h6>
        </div>
      )


  const displayNotComment =
    dataArry.length >= 1 ? (
      dataArry.map((item) => {
        return (
          <>
            <div className="coupon-listview" >
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
                        <RatingStar />
                      </li>
                      <li>
                        <p>我的回覆:</p>
                      </li>
                      <li className="myReply pb-3">
                        <p className="pt-2 ">
                          {item.content}
                        </p>
                        <div className="d-flex mt-5 mb-2">
                          <div className="commentImg" >
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
            </div >
          </>
        )
      })) : (
        <div className="empty text-center">
          <img
            className="emptyImg mb-3"
            src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
          />
          <h6>尚未有評價，趕緊探索你下一次的旅程，並標記你心儀的活動體驗</h6>
        </div>
      )





  console.log(props.match.params.type)

  return (
    <>
      {props.match.params.type == 'mycomment' ?
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
                  to={`./myComment`}
                  activeClassName="currentcoupon"
                  className="coupontab-a"
                >
                  已評價
                </NavLink></div>
            </div>
          </div>
          <div className="tab-pane">

          </div>
        </>
        :
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
                  to={`./myComment`}
                  activeClassName="currentcoupon"
                  className="coupontab-a"
                >
                  已評價
            </NavLink></div>
            </div>
          </div>
          <div className="tab-pane">
            {displayMyComment}
          </div>
        </>
      }
    </>
  )
}

export default withRouter(UserComment)
