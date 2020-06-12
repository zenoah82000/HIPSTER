import React from 'react'
import '../styles/home.scss'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'

function Home(props) {
  return (
    <>
      <div className="banner">
        <div className="container">
          <div className="searchbar">
            <div className="btnList">
              <div className="btn active">地點搜尋</div>
              <div className="btn">活動名稱</div>
              <div className="btn">活動地點</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
