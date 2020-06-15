import React, { useEffect, useState } from 'react'
import { Link,  withRouter } from 'react-router-dom'

function CheckOut(props) {
  const [addressCity, setAddressCity] = useState('') //儲存使用者選擇的縣市
  const [addressDist, setAddressDist] = useState('') //儲存使用者選擇的地區

  const [name, setName] = useState('')
  const [addcode, setAddcode] = useState('')
  const [area, setArea] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-light">
                <h6>購買人資訊</h6>
              </div>
              <div className="card-body d-flex">
                <div className="col-2 form-label d-flex flex-column">
                  <label htmlFor="name">姓名:</label>
                  <label htmlFor="area">地區:</label>
                  <label htmlFor="address">地址:</label>
                  <label htmlFor="phone">電話:</label>
                  <label htmlFor="note">備註:</label>
                </div>
                <div className="col-10">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    onChange={(event) => {
                      const name = event.target.value
                      setName(name)
                    }}
                  />
                  <div className="form-row">
                    <div className="col">
                      <input
                        className="form-control"
                        type="text"
                        name="zip"
                        id="zip"
                        disabled
                        onChange={(event) => {
                          const addcode = event.target.value
                          setAddcode(addcode)
                        }}
                      />
                    </div>
                    <div className="col">
                      <select
                        name=""
                        className="form-control"
                      >
                        <option value="">請選擇縣市</option>
                      </select>
                    </div>
                    <div className="col">
                      <select
                        name=""
                        id=""
                        className="form-control"
                

                    
                      >
                        <option value="">請選擇地區</option>
                      </select>
                    </div>
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    id="address"
                  />
                  <input
                    className="form-control"
                    type="phone"
                    name="phone"
                    id="phone"
                  />
                  <textarea
                    className="form-control"
                    name="note"
                    id="note"
                    cols="30"
                    rows="5"

                  ></textarea>
                </div>
              </div>
              <div className="card-footer">儲存收件資訊</div>
            </div>
          </div>
          <div className="col-md-4 check-wrapper">
            <div className="card">
              <div className="card-header bg-light">
                <h6>選擇付款方式</h6>
              </div>
              <div className="check-payBy card-body">
                <input type="radio" name="pay" id="cradit" />
                <label htmlFor="cradit">信用卡</label>
                <br />
                <input type="radio" name="pay" id="transfer" />
                <label htmlFor="transfer">帳戶轉帳</label>
              </div>
              <div className="card-header bg-light">
                <h6>選擇物流方式</h6>
              </div>
              <div className="check-shipBy card-body">
                <input type="radio" name="shipping" id="store" />
                <label htmlFor="store">便利商店取貨</label>
                <br />
                <input type="radio" name="shipping" id="home" />
                <label htmlFor="home">宅配</label>
              </div>
            </div>
            <div className=" bg-white mt-2">
                <button
                  className="btn"
                  onClick={
                    () => {
                      
                    }
                  }
                >
                  <Link to="/member/created">下一步</Link>
                </button>
                <button
                  className="btn"
                  onClick={
                    () => {
                      
                    }
                  }
                >
                  <Link to="/member/created">返回上一步</Link>
                </button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CheckOut
