import React, { useState } from 'react'

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

  const display =
    wishlist != null && wishlist.length >= 1 ? (
      wishlist.map((item) => {
        return (
          <>
            <div className="wishlistbox">
              <div className="row d-flex flex-wrap justify-content-around">
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
              </div>
            </div>
          </>
        )
      })
    ) : (
      <h2>願望清單是空的</h2>
    )
  return (
    <>
      <div className="container">
        <h3>願望清單</h3>
        <div className="wishlistbox">
          <div className="row d-flex flex-wrap justify-content-around">
            <div className="card">
              <div className="card-header">
                <img src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg" />
              </div>

              <div className="card-body">
                <h6 className="card-title">嵐山嵯峨野觀光火車票</h6>
                <span>NT$330</span>
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
          </div>
        </div>

        {display}
      </div>
    </>
  )
}

export default UserWishlist
