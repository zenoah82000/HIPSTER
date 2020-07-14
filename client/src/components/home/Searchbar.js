import React, { useState, useEffect } from 'react'
import Fade from 'react-reveal/Fade'
import { Link, withRouter } from 'react-router-dom'
import { FaSearch, FaStreetView, FaLongArrowAltRight } from 'react-icons/fa'

function Searchbar(props) {
  //搜尋bar切換狀態 0=地點 1=分類 2=時間
  const [searchbar, setsearchbar] = useState(0)
  //存放搜尋bar-地點搜尋內容
  let searchBarCity, searchBarArea, searchBarAddress, searchBarLocationData
  //存放搜尋bar-名稱搜尋內容
  let searchBarCategory1, searchBarCategory2, searchBarName, searchBarActiveData
  //存放搜尋bar-時間搜尋內容
  let searchBarStartTime, searchBarEndTime, searchBarTimeData

  //地點搜尋bar
  const location = (
    <div id="location-search" className="search-bar">
      <select id="city" ref={(input) => (searchBarCity = input)}>
        <option value="">請選擇</option>
        <option value="">新北市</option>
        <option value="1">台北市</option>
        <option value="">基隆市</option>
        <option>連江縣</option>
        <option>宜蘭縣</option>
        <option>新竹市</option>
        <option>新竹縣</option>
        <option>桃園市</option>
        <option>苗栗縣</option>
        <option>臺中市</option>
        <option>彰化縣</option>
        <option>南投縣</option>
        <option>嘉義市</option>
        <option>嘉義縣</option>
        <option>雲林縣</option>
        <option>臺南市</option>
      </select>
      <select id="area" ref={(input) => (searchBarArea = input)}>
        <option>請選擇</option>
        <option value="大安區">大安區</option>
        <option value="中正區">中正區</option>
        <option value="大同區">大同區</option>
        <option value="中山區">中山區</option>
        <option value="松山區">松山區</option>
        <option value="信義區">信義區</option>
        <option value="士林區">士林區</option>
        <option value="北投區">北投區</option>
        <option value="內湖區">內湖區</option>
        <option value="南港區">南港區</option>
        <option value="文山區">文山區</option>
      </select>
      <input
        ref={(input) => (searchBarAddress = input)}
        type="text"
        id="location-bar"
        placeholder="請輸入活動地址...."
        className="form-control"
      />
      <Link
        to=""
        id="local-btn"
        className="search-btn btn btn-warning "
        onClick={() => {
          searchBarLocationData = {
            City: searchBarCity.value,
            Address: searchBarAddress.value,
          }
          window.location.href = `/productlist?loc=${searchBarCity.value}&keyword=${searchBarAddress.value}`
          // console.log(searchBarLocationData)
        }}
      >
        <FaSearch className="fonticon" />
        搜尋
      </Link>
      <a
        href="/map"
        id="location-btn"
        className="location-search-btn btn btn-danger"
      >
        <FaStreetView className="fonticon" />
        定位搜尋
      </a>
    </div>
  )

  //分類搜尋bar
  const activename = (
    <div id="activename-search" className="search-bar">
      <select id="category1" ref={(input) => (searchBarCategory1 = input)}>
        <option value="">主分類</option>
        <option value="">文藝展覽</option>
        <option value="">手作課程</option>
        {/* <option value="愛上戶外">愛上戶外</option>
        <option value="親子專區">親子專區</option>
        <option value="紓壓生活">紓壓生活</option>
        <option value="藝文手作">藝文手作</option> */}
      </select>
      <select id="category2" ref={(input) => (searchBarCategory2 = input)}>
        <option value="">次分類</option>
        <option value="3">精油香氛</option>
        <option value="4">植感花藝</option>
        <option value="5">浪漫金工</option>
        <option value="6">手作皮革</option>
        <option value="7">木作雕刻</option>
      </select>
      <input
        ref={(input) => (searchBarName = input)}
        type="text"
        id="activename-bar"
        placeholder="請輸入活動名稱...."
        className="form-control"
      />
      <Link
        id="active-btn"
        className="search-btn btn btn-warning"
        onClick={() => {
          searchBarActiveData = {
            Category2: searchBarCategory2.value,
            Name: searchBarName.value,
          }
          window.location.href = `/productlist?cat=${searchBarCategory2.value}&keyword=${searchBarName.value}`
          // console.log(searchBarActiveData)
        }}
      >
        <FaSearch className="fonticon" />
        搜尋
      </Link>
    </div>
  )
  //時間搜尋bar
  const time = (
    <div id="time-search" className="search-bar">
      <div className="time-title">搜尋時間內活動：</div>
      <input
        type="date"
        id="time1"
        className="form-control"
        ref={(input) => (searchBarStartTime = input)}
      />
      <FaLongArrowAltRight className="fonticon arrow" />
      <input
        type="date"
        id="time2"
        className="form-control"
        ref={(input) => (searchBarEndTime = input)}
      />
      <Link
        id="active-btn"
        className="search-btn btn btn-warning "
        onClick={() => {
          searchBarTimeData = {
            StartTime: searchBarStartTime.value,
            EndTime: searchBarEndTime.value,
          }
          window.location.href = `/productlist?startDate=${searchBarStartTime.value}&endDate=${searchBarEndTime.value}`
          console.log(searchBarTimeData)
        }}
      >
        <FaSearch className="fonticon" />
        搜尋
      </Link>
    </div>
  )
  //搜尋bar顯示控制
  const searchbarDisplay = () => {
    if (searchbar == 0) {
      return location
    } else if (searchbar == 1) {
      return activename
    } else if (searchbar == 2) {
      return time
    }
  }
  //搜尋bar上方切換鈕控制
  const localbtnChangeClass = searchbar == 0 ? 'btn active' : 'btn'
  const activenamebtnChangeClass = searchbar == 1 ? 'btn active' : 'btn'
  const timebtnChangeClass = searchbar == 2 ? 'btn active' : 'btn'

  return (
    <>
      <div className="searchbar-chang-btn">
        <div className="btnList">
          <div
            id="location"
            className={localbtnChangeClass}
            onClick={() => {
              setsearchbar(0)
            }}
          >
            地點搜尋
          </div>
          <div
            id="activename"
            className={activenamebtnChangeClass}
            onClick={() => {
              setsearchbar(1)
            }}
          >
            活動名稱
          </div>
          <div
            id="time"
            className={timebtnChangeClass}
            onClick={() => {
              setsearchbar(2)
            }}
          >
            活動時間
          </div>
        </div>
        {searchbarDisplay()}
      </div>
    </>
  )
}

export default Searchbar
