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
            <div className="btnList"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
