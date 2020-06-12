import React, { useState } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
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

      <Navbar bg="" variant="dark" class="navbar">
      <div className="container">
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="m-auto">
          {/* <Nav.Link as={NavLink} to="/" >
            Home
          </Nav.Link> */}
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
          <Nav.Link as={NavLink} to="/shoppingcar">
            購物車
          </Nav.Link>



        </Nav>
        <Form inline></Form>
        </div>
      </Navbar>

    </>
  )
}

export default withRouter(Mynavbar)
