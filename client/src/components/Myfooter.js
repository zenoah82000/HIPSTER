import React from 'react'
import icon from '../images/home/footer-icon.png'

function MyFooter(props) {
  return (
    <>
      <footer className="footer mt-auto">
        <div className="footer-top">
          <div className="container">
            <div className="footer-link">
              <div className="link-group">
                <div className="link-title">認識文青地圖</div>
                <div className="link-content">
                  <ul>
                    <li>關於文青地圖</li>
                    <li>使用者條款</li>
                    <li>隱私權保護政策</li>
                    <li>常見問題與幫助</li>
                  </ul>
                </div>
              </div>

              <div className="link-group">
                <div className="link-title">給旅人</div>
                <div className="link-content">
                  <ul>
                    <li>三大保證</li>
                    <li>合作夥伴</li>
                    <li>官方部落格</li>
                    <li>會員好禮</li>
                  </ul>
                </div>
              </div>

              <div className="link-group">
                <div className="link-title">文青地圖合作夥伴</div>
                <div className="link-content">
                  <ul>
                    <li>同業合作</li>
                    <li>人才招募</li>
                    <li>成為供應商</li>
                    <li>部落客/攝影師合作計畫</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-icon">
              <img src={icon}></img>
            </div>
            <p className="copyright">
              COPYRIGHT © 2020 文青地圖 All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default MyFooter
