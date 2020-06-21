import React, { useState } from 'react'
import '../../styles/mContent/userComment.scss'
import { Link, NavLink, withRouter } from 'react-router-dom'
import RatingStar from '../../components/comments/ratingStar'

import myComment from '../../data/myComment.json'

import { BsPlusCircle } from "react-icons/bs";
import { IconContext } from "react-icons";


function UserComment(props) {

  const [image, setImage] = useState({ file:[],preview: "", raw: "" });

  const data = {}
  myComment.comment.forEach((item, i) => {
    data[item.id] = {
      name: item.name,
      content: item.content,
      date: item.date,
      img: item.img
    }
  })
  let dataArry = []
  for (const key in data) {
    data[key].id = key
    dataArry.push(data[key])
  }


  // 上傳圖片
  let fileObj = []
  let fileArray = []

  const handleChange = e => {   
    fileObj.push(e.target.files)
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]))
      console.log(fileObj)
      console.log(fileArray)
  }

  setImage({ file: fileArray })

    // if (e.target.files.length) {
    //   setImage({

    //     preview: URL.createObjectURL(e.target.files[0]),
    //     raw: e.target.files[0]
    //   });
    // }
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  };


  //顯示評論
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
                          {image.file!==[] ? (
                            <div className="commentImg" >
                              <img
                              className="commentImgPhoto"
                                src={image.preview}
                                alt=""
                              />
                            </div>
                          ) : ("")}
                              <label htmlFor="upload-button">
                                  <div className="commentImgPlus">
                                    <IconContext.Provider value={{ color: 'rgba(104, 142, 103, 0.8)', size: '40px' }}>
                                      <BsPlusCircle />
                                    </IconContext.Provider>
                                  </div>
                                </label>
                                <input
                                  type="file"
                                  id="upload-button"
                                  style={{ display: "none" }}
                                  onChange={handleChange}  multiple/>
                        </div>
                      </li>
                      <li>
                        <p>輸入回覆:</p>
                        <textarea className="form-control" id="" rows="6 "></textarea>
                      </li>
                    </ul>
                    <button
                      className="btn buttonstyle float-right mt-3"
                      type="submit"
                      id="button-addon2"
                      onClick={handleUpload}
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
          <form className="tab-pane">
            {displayMyComment}
          </form>
        </>
      }
    </>
  )
}

export default withRouter(UserComment)
