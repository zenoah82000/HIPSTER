import React from 'react'
import '../styles/home.scss'
import { FaSearch, FaStreetView, FaLongArrowAltRight } from 'react-icons/fa'
import { Navbar } from 'react-bootstrap'
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

            <div id="location-search" className="search-bar">
              <select id="city">
                <option>台北市</option>
                <option>台中市</option>
                <option>高雄市</option>
              </select>
              <select id="area">
                <option>內湖區</option>
                <option>中正區</option>
                <option>大同區</option>
              </select>
              <input
                type="text"
                id="location-bar"
                placeholder="請輸入活動地址...."
              />
              <div id="local-btn" className="search-btn btn btn-warning ">
                <FaSearch className="fonticon" />
                搜尋
              </div>
              <div
                id="location-btn"
                className="location-search-btn btn btn-danger"
              >
                <FaStreetView className="fonticon" />
                定位搜尋
              </div>
            </div>

            <div id="activename-search" className="search-bar none">
              <select id="category1">
                <option>主分類</option>
              </select>
              <select id="category2">
                <option>次分類</option>
              </select>
              <input
                type="text"
                id="activename-bar"
                placeholder="請輸入活動名稱...."
              />
              <div id="active-btn" className="search-btn btn btn-warning ">
                <FaSearch className="fonticon" />
                搜尋
              </div>
            </div>

            <div id="time-search" className="search-bar none">
              <div className="time-title">搜尋時間內活動：</div>
              <input type="date" id="time1" />
              <FaLongArrowAltRight className="fonticon" />
              <input type="date" id="time2" />
              <div id="active-btn" className="search-btn btn btn-warning ">
                <FaSearch className="fonticon" />
                搜尋
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home