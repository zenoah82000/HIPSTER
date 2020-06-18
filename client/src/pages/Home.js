import React, { useState, useEffect } from 'react'
import '../styles/home.scss'
import {
  FaSearch,
  FaStreetView,
  FaLongArrowAltRight,
  FaHeart,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import Slider from 'react-slick'
import Title from '../images/home/title.png'
import abouticon1 from '../images/home/about-icon1.png'
import abouticon2 from '../images/home/about-icon2.png'
import abouticon3 from '../images/home/about-icon3.png'
import abouticon4 from '../images/home/about-icon4.png'
import activity from '../images/home/activity-test.jpg'

import { Link, NavLink, withRouter } from 'react-router-dom'

function Home(props) {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
  }

  return (
    <>
      <div className="banner">
        <div className="video">
          <video
            src="http://127.0.0.1:3000/test.mp4"
            loop
            autoPlay
            muted
          ></video>
        </div>
        <div className="container">
          <div className="banner-title">
            <img src={Title} />
          </div>
          <div className="searchbar-chang-btn">
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
            {/* --------------------------------------------------------- */}
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
                className="form-control"
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
            {/* ---------------------------------------------------------- */}

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
                className="form-control"
              />
              <div id="active-btn" className="search-btn btn btn-warning ">
                <FaSearch className="fonticon" />
                搜尋
              </div>
            </div>

            {/* --------------------------------------------------------------- */}
            <div id="time-search" className="search-bar none">
              <div className="time-title">搜尋時間內活動：</div>
              <input type="date" id="time1" className="form-control" />
              <FaLongArrowAltRight className="fonticon" />
              <input type="date" id="time2" className="form-control" />
              <div id="active-btn" className="search-btn btn btn-warning ">
                <FaSearch className="fonticon" />
                搜尋
              </div>
            </div>
            {/* ----------------------------------------- */}
          </div>
        </div>
      </div>

      <div className="home-about">
        <div className="container">
          <div className="title">
            <span class="line"></span>
            <span class="txt">關於我們</span>
            <span class="line"></span>
          </div>
          <p className="text-center">
            文青地圖致力於提供最優質的手作課程與展覽活動，透過我們所提供的快速搜尋服務，讓繁忙的
            <br />
            您活動安排變得更簡單、更即時，讓每趟行程充滿難忘的回憶。
          </p>

          <div className="about-main">
            <div className="about-main-cont">
              <div className="about-icon">
                <img src={abouticon1}></img>
              </div>
              <div className="about-title">最優質的活動資訊</div>
              <p>發掘最棒的展覽資訊、手作課程與最難忘的活動體驗！</p>
            </div>
            <div className="about-main-cont">
              <div className="about-icon">
                <img src={abouticon2}></img>
              </div>
              <div className="about-title">方便的地圖探索</div>
              <p>提供分類、定位搜尋，輕鬆顯示所有附近的活動資訊！</p>
            </div>
            <div className="about-main-cont">
              <div className="about-icon">
                <img src={abouticon3}></img>
              </div>
              <div className="about-title">即時的評價訊息</div>
              <p>我們鼓勵所有參與過活動的朋友們留下他們最誠實的評價！</p>
            </div>
            <div className="about-main-cont">
              <div className="about-icon">
                <img src={abouticon4}></img>
              </div>
              <div className="about-title">安全的購買系統</div>
              <p>
                安全加密付費、及電子憑證，以安心的方式，預訂最精彩的活動。！
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-activity">
        <div className="container">
          <div className="title">
            <span class="line"></span>
            <span class="txt">精選活動</span>
            <span class="line"></span>
          </div>
          <div className="activity-main">
            <Slider {...settings}>
              <a href="">
                <div className="activity-main-cont">
                  <div className="activity-picture">
                    <div className="activity-follow">
                      <FaHeart />
                    </div>
                    <img src={activity} />
                  </div>
                  <div className="activity-title">
                    <p>
                      【花蓮七星潭 GLAMPING 】踏浪星辰 Camp｜露營帳篷／露營車
                    </p>
                  </div>
                  <div className="activity-local">
                    <p>
                      <FaMapMarkerAlt />
                      台灣 宜蘭
                    </p>
                  </div>
                  <div className="star"></div>
                </div>
              </a>

              <div>
                <div className="activity-main-cont">1</div>
              </div>
              <div className="alink">
                <div className="activity-main-cont">1</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
