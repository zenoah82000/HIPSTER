import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import Logo from '../images/home/logo.png'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { Link, NavLink, withRouter } from 'react-router-dom'

function Mynavbar(props) {
  const [showCart, setshowCart] = useState(false)
  const [mycart, setMycart] = useState([])

  //取得購物車
  const localCart = JSON.parse(localStorage.getItem('cart'))
  function getCartFromLocalStorage() {
    setMycart(localCart)
  }
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

  //   const { auth, name, setauth } = props

  //   const loginButton = (
  //     <Button
  //       variant="outline-light"
  //       onClick={() => {
  //         props.history.push('/memberlogin')
  //       }}
  //     >
  //       登入
  //     </Button>
  //   )

  //   const logoutButton = (
  //     <>
  //       <span style={{ color: '#ffffff' }}>{name}, 你好</span>
  //       <Button
  //         variant="outline-light"
  //         onClick={() => {
  //           alert('登出成功,將跳回')
  //           props.history.push('/memberlogin')
  //           setauth(false)
  //         }}
  //       >
  //         登出
  //       </Button>
  //     </>
  //   )

  //   const displayButton = auth ? logoutButton : loginButton
  const showMenu = () => {
    setshowCart(!showCart)
  }
  return (
    <>
      <nav>
        <div className="navbar container ">
          <a href="/" className="logo">
            <img src={Logo} />
          </a>
          <div className="burger none" id="burger">
            ☰
          </div>
          <ul className="menu">
            <li>
              <a href="/about">品牌介紹</a>
            </li>
            <li>
              <a href="/map">地圖探索</a>
            </li>
            <li>
              <a href="/blog">文章專欄</a>
            </li>
            <li>
              <a href="/productlist">活動列表</a>
            </li>
            <li>
              <a href="/contact">聯絡我們</a>
            </li>
          </ul>
          {/* ========================================================= */}
          <ul className="shop-group">
            <li>
              <div className="navbar-cart">
                <FaShoppingCart
                  className="car-img"
                  onClick={() => {
                    showMenu()
                  }}
                />
                {mycart.length >= 1 ? (
                  <div className="cart-dot">
                    <span>{mycart.length}</span>
                  </div>
                ) : (
                  ''
                )}

                {showCart ? (
                  <>
                    <div className="card mt-3">
                      <div className="card-body">
                        {mycart != null && mycart.length >= 1 ? (
                          <>
                            {mycart.map((value, index) => {
                              return (
                                <div className="card-item d-flex align-items-center">
                                  <div className="productimgbox mr-2">
                                    <img src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg" />
                                  </div>
                                  <div className="item-text">
                                    <div className="item-name"><p>{value.name}</p></div>
                                    <div className="item-price"><span>NT${value.price}</span></div>
                                  </div>
                                </div>
                              )
                            })}
                          </>
                        ) : (
                          <p className="text-center">購物車是空的喔!</p>
                        )}
                      </div>
                      <div className="card-footer">
                        <Link
                          className="link text-center"
                          to="/shoppingcar"
                          onClick={() => {
                            showMenu()
                          }}
                        >
                          <p>查看我的購物車</p>
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </li>
            <li>
              <a href="">
                <FaHeart />
              </a>
            </li>
          </ul>
          {/* ========================================================= */}
          <ul className="sign ">
            <li>
              <a href="">註冊</a>
            </li>
            <li>
              <a href="">登入</a>
            </li>
          </ul>
          {/* ========================================================= */}
          <ul className="member none">
            <li>David,您好</li>
            <li>
              <a href="./memberuser" className="memberbtn">
                會員中心
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Mynavbar)
