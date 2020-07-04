import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'

import { GrFormAdd } from 'react-icons/gr'
import { GrFormSubtract } from 'react-icons/gr'

import Swal from 'sweetalert2'

import '../../styles/wishlist.scss'

function UserWishlist(props) {
  const { wishlist,addCart } = props
  //會員資料
  const member = JSON.parse(localStorage.getItem('member')) || ''
  //存要加到購物車的資料
  const [addcartdata, setAddcartdata] = useState([])
  //加入購物車狀態
  const [addcartstatus, setAddcartstatus] = useState(false)
  //加入購物車數量
  const [addcartamount, setAddcartamount] = useState(1)
  //加入購物車日期
  const [addcartdate, setAddcartdate] = useState('')


  //增加到購物車
  const wishAddCart = ()=>{
    const newWish = {...addcartdata}
    newWish.date = addcartdate
    newWish.amount=addcartamount
    addCart(newWish)
    setAddcartamount(1)
    setAddcartdate('')
    setAddcartstatus(false)
  }
  //數量
  const changeAmount=(type)=>{
    switch (type) {
      case 'add':
        setAddcartamount(addcartamount +1)
        break
      case 'dec':
        if (addcartamount <= 1) {
          setAddcartamount(1)
        } else {
           setAddcartamount(addcartamount -1)
        }
        
    }
  }
  //加入購物車視窗
  function Addcart(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="modal-body">
          <div className="wish-addcartbox">
            <div className="wish-choosedate">
              <h6>選擇日期</h6>
              <input
                className="wish-date"
                type="date"
                min="2020-07-01"
                max="2020-08-01"
                value={addcartdate}
                onChange={(e) => {
                  setAddcartdate(e.target.value)
                }}
              />
            </div>
            <div className="wish-chooseamount">
              <h6>選擇數量</h6>
              <div className="wish-amountbox">
              <span className="wish-price">NT${addcartdata.productPrice}</span>
                <GrFormSubtract
                  className={addcartamount == 1 ? 'subtract subtractopt' : 'subtract'}
                  onClick={() => {
                    changeAmount('dec')
                  }}
                />
                
                <input className="wish-amount" value={addcartamount} readOnly />
                <GrFormAdd
                  className="amountadd"
                  onClick={() => {
                    changeAmount('add')
                  }}
                />
              </div>
            </div>
            <div className="wish-total">
              <h6>費用</h6>
              <p>NT${addcartdata.productPrice * addcartamount}</p>
            </div>
            <div className="wish-choosebutton">
              <button className="wish-button-ok" onClick={()=>{wishAddCart()}}>確定</button>
              <button className="wish-button-cancel"
                onClick={() => {
                  setAddcartstatus(false);
                  setAddcartamount(1);
                  setAddcartdate('');
                }}
              >
                取消
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  //把資料傳進視窗
  const showaddcart = (item) => {
    setAddcartdata(item)
    setAddcartstatus(true)
  }
  //刪除願望清單(資料庫)
  const delwishlistAsync = async (productId) => {
    const request = new Request(
      `http://localhost:5000/member/wishlistDel/${member.id}`,
      {
        method: 'delete',
        body: JSON.stringify({ productId }),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
  }
  //刪除願望清單
  const deleteWishlist = (id) => {
    Swal.fire({
      text: '是否刪除該商品?',
      icon: 'warning',
      confirmButtonText: '確定',
      showCancelButton: true,
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.value) {
        const index = wishlist.findIndex((item) => item.productId === id)
        if (index !== -1) {
          const localWishlist = [...wishlist]
          localWishlist.splice(index, 1)
          props.dispatch({ type: 'GET_WISH', value: localWishlist })
          delwishlistAsync(id)
        }
      }
    })
  }

  //星等判斷
  const stars = (value) => {
    const star = []
    // console.log(this.state.searchBtn1, this.state.searchBtn3)
    for (let i = 0; i < 5; i++) {
      star.push(<AiFillStar className={value > i ? 'star1' : 'star2'} />)
    }
    return star
  }
  const display =
    wishlist != null && wishlist.length >= 1 ? (
      <div className="wishlistbox ">
        <div className="row">
          {wishlist.map((item) => {
            return (
              <>
                <div className="card m-2">
                  <div className="card-header">
                    <img
                      src={`http://localhost:5000/images/product/${item.productImg}`}
                    />
                  </div>

                  <div className="card-body">
                    <div className="whishnamebox">
                      <p>{item.productName}</p>
                    </div>
                    <div>{stars(item.star)}</div>
                    <div className="wishprice">
                      <p>NT${item.productPrice}</p>
                    </div>
                  </div>

                  <div className="card-footer bg-white">
                    <span
                      onClick={() => {
                        showaddcart(item)
                      }}
                    >
                      <FaShoppingCart />
                      加入購物車
                    </span>
                    <span
                      onClick={() => {
                        deleteWishlist(item.productId)
                      }}
                    >
                      <BsTrash />
                      刪除
                    </span>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    ) : (
      <div className="empty ">
        <div className="emptyimgbox mb-3">
          <img
            className="emptyImg mb-3"
            src="http://localhost:5000/images/order/wishlist.webp"
          />
        </div>
        <div className="emptytext text-center">
          <p>願望清單是空的！趕緊探索你下一次的旅程，並標記你心儀的活動體驗</p>
        </div>
      </div>
    )
  return (
    <>
      <Addcart show={addcartstatus} onHide={() => setAddcartstatus(false)} />
      <div className="usercontainer">
        <h2 className="usertitle">願望清單</h2>

        {display}
      </div>
    </>
  )
}
const mapStateToProps = (store) => {
  return {
    wishlist: store.orderReducer.wishData,
  }
}

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(UserWishlist)
