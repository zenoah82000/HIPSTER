import React, { useState, useEffect } from 'react'

import { FaHeart, FaShoppingCart } from 'react-icons/fa'

//星星

import '../../styles/wishlist.scss'

function UserWishlist() {
  const [wishlist, setWishlist] = useState([])

  //取得願望清單
  const localWishlist = JSON.parse(localStorage.getItem('wishlist'))
  async function getCartFromLocalStorage() {
    setWishlist(localWishlist)
  }
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

  const display =
    wishlist != null && wishlist.length >= 1 ? (
      <div className="wishlistbox">
        <div className="row d-flex flex-wrap ">
          {wishlist.map((item) => {
            return (
              <>
                <div className="card">
                  <div className="card-header">
                    <img src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg" />
                  </div>

                  <div className="card-body">
                    <h6 className="card-title">{item.name}</h6>
                    <span>NT${item.price}</span>
                  </div>

                  <div className="card-footer bg-white">
                    <span>
                      <FaShoppingCart />
                      加入購物車
                    </span>
                    <span>
                      <FaHeart />
                      移出願望清單
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
        <h6>願望清單是空的！趕緊探索你下一次的旅程，並標記你心儀的活動體驗</h6>
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
