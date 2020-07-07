import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'

import Swal from 'sweetalert2'

import '../../styles/wishlist.scss'

import WishAddCart from '../../components/order/WishAddCart'

function UserWishlist(props) {
  const { wishlist, addCart } = props
  //會員資料
  const member = JSON.parse(localStorage.getItem('member')) || ''
  //存要加到購物車的資料
  const [addcartdata, setAddcartdata] = useState([])
  //加入購物車狀態
  const [addcartstatus, setAddcartstatus] = useState(false)

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
          <WishAddCart
            setAddcartstatus={setAddcartstatus}
            addCart={addCart}
            addcartdata={addcartdata}
          />
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
                <div key={item.productId} className="wishlist-card card m-2">
                  <div className="card-header">
                  <Link to={`/product/${item.productId}`}>
                    <img
                      src={`http://localhost:5000/images/product/${item.productImg}`}
                    />
                    </Link>
                  </div>

                  <div className="card-body">
                    <div className="whishnamebox">
                      <p>{item.productName}</p>
                    </div>
                    <div>{stars(item.star)}</div>
                    <div className="wishprice">
                      <p>
                        NT$
                        {item.productPrice.toString()
                          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
                          }
                      </p>
                    </div>
                  </div>

                  <div className="card-footer bg-white">
                    <button className="wishlist-button-add"
                      onClick={() => {
                        showaddcart(item)
                      }}
                    >
                      <FaShoppingCart  className="cart-icon"/>
                      加入購物車
                    </button>
                    <button className="wishlist-button-del"
                      onClick={() => {
                        deleteWishlist(item.productId)
                      }}
                    >
                      <BsTrash />
                      刪除
                    </button>
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
