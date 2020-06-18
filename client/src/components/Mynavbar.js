import React, { useState } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import Logo from '../images/home/logo.png'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { Link, NavLink, withRouter } from 'react-router-dom'

function Mynavbar(props) {
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

  return (
    <>
      <nav>
        <div className="navbar container ">
          <a href="./" className="logo">
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
              <a href="/product">活動列表</a>
            </li>
            <li>
              <a href="/contact">聯絡我們</a>
            </li>
          </ul>
          {/* ========================================================= */}
          <ul className="shop-group">
            <li>
              <a href="/shoppingcar">
                <FaShoppingCart />
              </a>
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
