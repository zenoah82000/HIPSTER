import React, { useState } from 'react'
import '../../styles/mContent/userComment.scss'
import RatingStar from './ratingStar'
import { BsPlusCircle } from 'react-icons/bs'
import { IconContext } from 'react-icons'

//確認框
import Swal from 'sweetalert2'

function replyComment(props) {
  //state
  const [image, setImage] = useState({ file: [], preview: [], raw: '' })
  const [text, setText] = useState('')
  // const [list, setList] = useState(dataArry)
  const [ratingValue, setRatingValue] = useState('')

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
  }

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
}

export default replyComment
