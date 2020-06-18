import React from 'react'
import '../../styles/mContent/userComment.scss'
import CommentImg from '../../components/comments/commentImg'
import RatingStar from '../../components/comments/ratingStar'

import myComment from '../../data/myComment.json'

function UserComment() {
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

  const display =
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
                        <CommentImg />
                        <CommentImg />
                      </div>
                      <span className="">回覆日期: {item.date}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div >
         </> 
      )})):(
        <div className="empty text-center">
        <img
          className="emptyImg mb-3"
          src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
        />
        <h6>願望清單是空的！趕緊探索你下一次的旅程，並標記你心儀的活動體驗</h6>
      </div>

      )


return (
          <>
            <div className="usercontainer">
              <h2 className="usertitle mb-3   ">我的評價</h2>
              <div className="d-flex coupon-bar border-bottom">
                <div className="tabcontainer couponactive">尚未評價</div>
                <div className="tabcontainer">已評價 </div>
              </div>
              {display}
              {/* {dataArry.map((item) => (
        <div class="coupon-listview">
          <div class="row">
            <div className="myReplyBox d-flex">
              <div className="eventImgBox col-3">
                <img
                  src={item.img}

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
                      <CommentImg />
                      <CommentImg />
                    </div>
                    <span className="">回覆日期: {item.date}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))} */}

            </div>
          </>
)
}

export default UserComment
