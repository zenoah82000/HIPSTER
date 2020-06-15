import React, { useState } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

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
          <a href="./" className="logo"></a>
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
              <a href="/article">文章專欄</a>
            </li>
            <li>
              <a href="/article">活動列表</a>
            </li>
            <li>
              <a href="/contact">聯絡我們</a>
            </li>
          </ul>
        </div>
      </nav>
      {/* <Navbar bg="" variant="dark" class="navbar">
        <div className="container">
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <div className="burger " id="burger">
            ☰
          </div>
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to="/about">
              品牌介紹
            </Nav.Link>
            <Nav.Link as={NavLink} to="/map">
              地圖
            </Nav.Link>
            <Nav.Link as={NavLink} to="/article">
              文章專欄
            </Nav.Link>
            <Nav.Link as={NavLink} to="/product">
              活動列表
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              聯絡我們
            </Nav.Link>
          </Nav>
          {/* ========================================================= */}
      {/* <Nav className="shop">
            <Nav.Link as={NavLink} to="/shoppingcar">
              <FaShoppingCart />
            </Nav.Link>
            <Nav.Link as={NavLink} to="/shoppingcar">
              <FaHeart />
            </Nav.Link>
          </Nav>

          <Nav className="sign none" id="sign">
            <Nav.Link as={NavLink} to="">
              註冊
            </Nav.Link>
            <Nav.Link as={NavLink} to="">
              登入
            </Nav.Link>
          </Nav> */}
      {/* ========================================================= */}
      {/* <Nav className="member" id="member">
            <span className="membername" as={NavLink} to="">
              David , 您好!
            </span>
            <Nav.Link as={NavLink} to="" className="memberbtn">
              會員中心
            </Nav.Link>
          </Nav>
        </div>
      </Navbar> */}{' '}
    </>
  )
}

export default withRouter(Mynavbar)
