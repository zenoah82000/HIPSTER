import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FaStar, FaHeart, FaMapMarkerAlt } from 'react-icons/fa'
import { connect } from 'react-redux'

function About(props) {
  return (
    <>
      <div className="home-about">
        <div className="container">
          <div className="title">
            <span className="line"></span>
            <span className="txt">關於我們</span>
            <span className="line"></span>
          </div>

          <p className="text-center">
            文青地圖致力於提供最優質的手作課程與展覽活動，透過我們所提供的快速搜尋服務，讓繁忙的
            您活動安排變得更簡單、更即時，讓每趟行程充滿難忘的回憶。
          </p>

          <div className="about-main">
            <div className="about-main-cont">
              <div className="about-icon">
                <img src="http://localhost:5000/images/home/about-icon1.png"></img>
              </div>
              <div className="about-title">優質的活動資訊</div>
              <p>發掘最棒的展覽資訊、手作課程與最難忘的活動體驗！</p>
            </div>
            <div className="about-main-cont">
              <div className="about-icon">
                <img src="http://localhost:5000/images/home/about-icon2.png"></img>
              </div>
              <div className="about-title">方便的地圖探索</div>
              <p>提供分類、定位搜尋，輕鬆顯示所有附近的活動資訊！</p>
            </div>
            <div className="about-main-cont">
              <div className="about-icon">
                <img src="http://localhost:5000/images/home/about-icon3.png"></img>
              </div>
              <div className="about-title">即時的評價訊息</div>
              <p>我們鼓勵所有參與過活動的朋友們留下最誠實的評價！</p>
            </div>
            <div className="about-main-cont">
              <div className="about-icon">
                <img src="http://localhost:5000/images/home/about-icon4.png"></img>
              </div>
              <div className="about-title">安全的購買系統</div>
              <p>加密付費及憑證，以安心的方式，預訂精彩的活動！</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
