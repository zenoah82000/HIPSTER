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
              <div id="location" className="btn active">
                地點搜尋
              </div>
              <div id="activename" className="btn">
                活動名稱
              </div>
              <div id="time" className="btn">
                活動時間
              </div>
            </div>
            <div id="location-search">
              <select>
                <option>台北市</option>
                <option>台中市</option>
                <option>高雄市</option>
              </select>
              <select>
                <option>內湖區</option>
                <option>中正區</option>
                <option>大同區</option>
              </select>
              <input type="text" placeholder="請輸入活動地址...." />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
