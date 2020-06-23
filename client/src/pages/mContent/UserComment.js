import React, { useState } from 'react'
import '../../styles/mContent/userComment.scss'
import { Link, NavLink, withRouter } from 'react-router-dom'
import RatingStar from '../../components/comments/ratingStar'

import myComment from '../../data/myComment.json'

import { BsPlusCircle } from 'react-icons/bs'
import { IconContext } from 'react-icons'

import RatingStarValue from '../../components/comments/ratingStarValue'
import ReplyComment from '../../components/comments/replycomment'
//確認框
import Swal from 'sweetalert2'

// https://medium.com/@hugh_Program_learning_diary_Js/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6-react-react-form-%E5%A0%B1%E5%90%8D%E8%A1%A8%E5%96%AE-ebd5e3a7201a

//假資料
function UserComment(props) {
  const data = {}
  myComment.comment.forEach((item, i) => {
    data[item.id] = {
      name: item.name,
      content: item.content,
      date: item.date,
      img: item.img,
      star:item.star
    }
  })
 let dataArry = []
  for (const key in data) {
    data[key].id = key
    dataArry.push(data[key])
  }

  //state
  const [image, setImage] = useState({ file: [], preview: [], raw: '' })
  const [text, setText] = useState('')
  const [list, setList] = useState(dataArry)
  const [ratingValue, setRatingValue] = useState('')
  // const [nocommentlist, setNocommentlist] = useState([]);
  // const divRef = React.createRef()

// 後端傳資料
// const checkoutAsync = async (order) => {
//   const request = new Request('http://localhost:5000/memberuser/comment/notcomment', {
//     method: 'post',
//     body: JSON.stringify(order),
//     headers: new Headers({
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     }),
//   })
//   const response = await fetch(request)
//   const data = await response.json()
//   this.setList(data)
// }

// const checkOut = () => {
//   let total = sum(mycart)
//   mycart.forEach((item, i) => {
//     itemData.productId = mycart[i].id
//     itemData.date = mycart[i].date
//     itemData.name = mycart[i].name
//     itemData.checkPrice = mycart[i].price
//     itemData.checkQty = mycart[i].amount
//     itemData.checkSubtotal = +mycart[i].price * +mycart[i].amount
//     orderData.orderItems.push(itemData)
//     itemData = {}
//   })

//   //取得總額跟信箱
//   orderData.total = total
//   orderData.email = buyerinfo.email

//   //訂單資料傳資料庫
//   checkoutAsync(orderData)

//   // 購物完清掉 localstorage 購物車
//   props.dispatch({ type: 'GET_CART', value: [] })
//   localStorage.removeItem('cart')
//   // window.location.href = '/paymentFinish'
//   props.history.push('/paymentFinish')
// }



  // 上傳圖片
  let fileObj = []
  let fileArray = []

  const handleChange = (e) => {
    fileObj.push(e.target.files)
    console.log(fileObj)
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]))
      console.log(fileObj)
      console.log(fileArray)
    }
    // setImage({ file: fileArray })
    if (e.target.files.length) {
      setImage({
        preview: fileArray,
        raw: e.target.files[0],
      })
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image.raw)

    await fetch('YOUR_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
  }

  const handleTextChange = (e) => {
    setText(e.target.value)
    console.log('test')
    console.log(text)
  }

  const handleSubmit = (e, index) => {
    // alert('submit')
    text !== ''
      ? Swal.fire({
          text: '成功送出評論',
          icon: 'success',
          confirmButtonText: '確定',
          confirmButtonColor: 'rgba(104, 142, 103, 0.8)',
        }) && handleDelete(index)
      : Swal.fire({
          text: '評論不能為空白',
          icon: 'warning',
          confirmButtonText: '確定',
          confirmButtonColor: 'rgba(104, 142, 103, 0.8)',
        })

    e.preventDefault()
  }

  const handleDelete = (index) => {
    const newList = [...list]
    newList.splice(index, 1)
    setList(newList)
  }

  //子元素回傳星等
  const getRatingValue = (value) => {
    setRatingValue(value)
    console.log(ratingValue+1)
  }
  //顯示評論
  const displayNotComment =
    list.length >= 1 ? (
      list.map((item, index) => {
        console.log(image)
        return (
          <>
            <div className="coupon-listview" key={index}>
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
                        <RatingStar getRatingValue={getRatingValue} />
                      </li>
                      <li className="d-flex">
                        <p>上傳相片:</p>
                        <div className="d-flex">
                          {image.preview.length > 0
                            ? image.preview.map((item) => {
                                return (
                                  <>
                                    <div className="commentImg">
                                      <img                                     
                                        className="commentImgPhoto"
                                        src={item}
                                        alt=""
                                      />
                                    </div>
                                  </>
                                )
                              })
                            : ''}

                          {image.preview.length >= 3 ? (
                            ''
                          ) : (
                            <>
                              <label htmlFor="upload-button">
                                <div className="commentImgPlus">
                                  <IconContext.Provider
                                    value={{
                                      color: 'rgba(104, 142, 103, 0.8)',
                                      size: '40px',
                                    }}
                                  >
                                    <BsPlusCircle />
                                  </IconContext.Provider>
                                </div>
                              </label>

                              <input
                                type="file"
                                id="upload-button"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                                // ref={divRef}
                                multiple
                                // value={text}
                              />
                            </>
                          )}
                        </div>
                      </li>
                      <li>
                        <p>輸入回覆:</p>
                        <textarea
                          className="form-control"
                          id=""
                          rows="6"
                          onChange={(index) => handleTextChange(index)}
                          //  key={index}
                        ></textarea>
                      </li>
                    </ul>
                    <button
                      className="btn buttonstyle float-right mt-3"
                      type="submit"
                      id="button-addon2"
                      value="Submit"
                      // onClick={()=>handleDelete(index)}
                      key={index}
                      // onClick={handleUpload}
                      // onClick={()=>{setAccount("")}}
                    >
                      提交評論
                    </button>
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
        <h6>
          目前尚未有未評論的評價，趕緊探索你下一次的旅程，並標記你心儀的活動體驗
        </h6>
      </div>
    )

  const displayMyComment =
    dataArry.length >= 1 ? (
      dataArry.map((item) => {
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
                        <p>星等:</p>
                        <p><RatingStarValue ratingValue={item.star} /></p>
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
          <form className="tab-pane" onSubmit={handleSubmit} method="POST" action="">
            {displayNotComment}
          </form>
        </>
      )}
    </>
  )
}

export default withRouter(UserComment)
