import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import {AiFillStar} from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'

import Swal from 'sweetalert2'

import '../../styles/wishlist.scss'

function UserWishlist(props) {
  const { wishlist } = props


//刪除願望清單
  // const delwishlistAsync=async(productId)=>{
  //   const request = new Request(`http://localhost:5000/member/wishlistDel/${member.id}`, {
  //     method: 'delete',
  //     body:JSON.stringify(productId),
  //     headers: new Headers({
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }),
  //   })
  //   const response = await fetch(request)
  //   const data = await response.json()
  // }
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
        const index = wishlist.findIndex((item) => item.id === id)
        if (index !== -1) {
          const localWishlist = [...wishlist]
          localWishlist.splice(index, 1)
          props.dispatch({ type: 'GET_WISH', value: localWishlist })
          localStorage.setItem('wishlist', JSON.stringify(localWishlist))
        }
      }
    })
  }

  //星等判斷
  const stars = (value) => {
    const star =[]
    // console.log(this.state.searchBtn1, this.state.searchBtn3)
    for(let i=0;i<5;i++){
      star.push( <AiFillStar className={value > i ? 'star1':"star2"}/>)
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
                    <img src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg" />
                  </div>

                  <div className="card-body">
                    <div className="whishnamebox"> 
                      <p>{item.name}</p>
                    </div>
                    <div>{stars(item.star)}</div>
                    <div className="wishprice">
                      <p>NT${item.price}</p>
                    </div>
                  </div>

                  <div className="card-footer bg-white">
                    <span>
                      <FaShoppingCart />
                      加入購物車
                    </span>
                    <span
                      onClick={() => {
                        deleteWishlist(item.id)
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
        <div className="emptyimgbox">
          <img
            className="emptyImg mb-3"
            src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
          />
        </div>
        <div className="emptytext text-center">
          <p>願望清單是空的！趕緊探索你下一次的旅程，並標記你心儀的活動體驗</p>
        </div>
      </div>
    )
  return (
    <>
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
