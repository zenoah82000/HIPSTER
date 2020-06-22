import React, { useState, useEffect } from 'react'

import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { BsTrash } from 'react-icons/bs'

import Swal from 'sweetalert2'

import '../../styles/wishlist.scss'

function UserWishlist() {
  const [wishlist, setWishlist] = useState([])

  //取得願望清單
  const localWishlist = JSON.parse(localStorage.getItem('wishlist')) ||[]
  async function getCartFromLocalStorage() {
    setWishlist(localWishlist)
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
        const index = localWishlist.findIndex((item) => item.id === id)
        if (index !== -1) {
          localWishlist.splice(index, 1)
          localStorage.setItem('wishlist', JSON.stringify(localWishlist))
          getCartFromLocalStorage()
        }
      }
    })
  }
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

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
                    <p className="card-title">{item.name}</p>
                    <span>NT${item.price}</span>
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
      <div className="empty text-center">
        <img
          className="emptyImg mb-3"
          src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
        />
        <p>願望清單是空的！趕緊探索你下一次的旅程，並標記你心儀的活動體驗</p>
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

export default UserWishlist
