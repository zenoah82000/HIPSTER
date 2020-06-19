import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Logo from '../images/home/logo.png'
import loginiconf from '../images/home/login-f.png'
import loginiconw from '../images/home/login-w.png'
import loginicong from '../images/home/login-g.png'
import loginicont from '../images/home/login-t.png'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

import { Link, withRouter } from 'react-router-dom'
import { BsLock } from 'react-icons/bs'
import Test from '../pages/Test'

function Mynavbar(props) {
  const { mycart } = props
  const [showCart, setshowCart] = useState(false)
  const showMenu = () => {
    setshowCart(!showCart)
  }

  //跳出視窗狀態
  const [showlogin, setShowlogin] = useState(false)

  //登入登出狀態,true=註冊  false=登入
  const [SignLogin, setSignLogin] = useState(true)

  //
  const SignDisplay = SignLogin ? 'block' : 'none'
  const LoginDisplay = SignLogin ? 'none' : 'block'

  useEffect(() => {
    const changsignbtn = document.getElementById('changsignbtn')
    const changloginbtn = document.getElementById('changloginbtn')
    console.log(changsignbtn)
    console.log(changloginbtn)
  }, [SignLogin])

  //跳出視窗
  function LoginMassage(props) {
    return (
      <Modal
        className="login"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="login-bg">
          <div className="closeMassage" onClick={props.onHide}>
            <IoMdClose />
          </div>

          <div className="functionChang">
            <div
              className="btn changsignbtn active"
              id="changsignbtn"
              onClick={() => {
                setSignLogin(true)
              }}
            >
              會員註冊
            </div>

            <div
              className="btn changloginbtn"
              id="changloginbtn"
              onClick={() => {
                setSignLogin(false)
              }}
            >
              會員登入
            </div>
          </div>

          {/* ---------註冊--------- */}
          <div className="membersign " style={{ display: SignDisplay }}>
            <p className="membersign-title">註冊會員帳號</p>
            <Form.Group>
              <Form.Label>帳號(聯絡信箱)：</Form.Label>
              <Form.Control type="email" placeholder="請輸入註冊信箱..." />
            </Form.Group>
            <Form.Group>
              <Form.Label>密碼：</Form.Label>
              <Form.Control type="text" placeholder="請輸入註冊密碼..." />
            </Form.Group>
          </div>

          {/* ---------登入--------- */}
          <div className="membersign" style={{ display: LoginDisplay }}>
            <p className="membersign-title">會員登入</p>
            <Form.Group>
              <Form.Label>帳號：</Form.Label>
              <Form.Control type="email" placeholder="請輸入登入信箱..." />
            </Form.Group>
            <Form.Group>
              <Form.Label>密碼：</Form.Label>
              <Form.Control type="text" placeholder="請輸入登入密碼..." />
            </Form.Group>
          </div>

          <div className="communitylogin">
            <p className="communitylogin-title">使用社交平台帳號登入</p>
            <div className="communityicon">
              <div className="c-icon">
                <img src={loginiconf}></img>
                <div className="icon-name">Facebook</div>
              </div>
              <div className="c-icon">
                <img src={loginicong}></img>
                <div className="icon-name">Google</div>
              </div>
              <div className="c-icon">
                <img src={loginiconw}></img>
                <div className="icon-name">微信</div>
              </div>
              <div className="c-icon">
                <img src={loginicont}></img>
                <div className="icon-name">Twitter</div>
              </div>
            </div>
          </div>

          <Form.Group
            controlId="formBasicCheckbox"
            className="logincheck"
            style={{ display: SignDisplay }}
          >
            <Form.Check type="checkbox">
              <Form.Check.Input type="checkbox" />
              <Form.Check.Label>
                我已詳細閱讀，並同意接受<span>會員權益</span>與
                <span>個資同意條款</span>
              </Form.Check.Label>
            </Form.Check>
          </Form.Group>

          <div className="forgetpwd" style={{ display: LoginDisplay }}>
            忘記密碼
          </div>

          <div
            className="signbtn "
            onClick={() => {}}
            style={{ display: SignDisplay }}
          >
            註冊
          </div>
          <div
            className="loginbtn"
            onClick={() => {}}
            style={{ display: LoginDisplay }}
          >
            登入
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <>
      <LoginMassage show={showlogin} onHide={() => setShowlogin(false)} />
      <nav>
        <div className="navbar container ">
          <a href="/" className="logo">
            <img src={Logo} />
          </a>
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
              <a href="/blog">文章專欄</a>
            </li>
            <li>
              <a href="/productlist">活動列表</a>
            </li>
            <li>
              <a href="/contact">聯絡我們</a>
            </li>
          </ul>
          {/* ========================================================= */}
          <ul className="shop-group">
            <li>
              <div className="navbar-cart">
                <FaShoppingCart
                  className="car-img"
                  onClick={() => {
                    showMenu()
                  }}
                />
                {mycart.length >= 1 ? (
                  <div className="cart-dot">
                    <span>{mycart.length}</span>
                  </div>
                ) : (
                  ''
                )}

                {showCart ? (
                  <>
                    <div className="card mt-3">
                      <div className="card-body">
                        {mycart != null && mycart.length >= 1 ? (
                          <>
                            {mycart.map((value, index) => {
                              return (
                                <div className="card-item d-flex align-items-center">
                                  <div className="productimgbox mr-2">
                                    <img src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg" />
                                  </div>
                                  <div className="item-text">
                                    <div className="item-name">
                                      <p>{value.name}</p>
                                    </div>
                                    <div className="item-price">
                                      <span>NT${value.price}</span>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </>
                        ) : (
                          <p className="text-center">購物車是空的喔!</p>
                        )}
                      </div>
                      <div className="card-footer">
                        <Link
                          className="link text-center"
                          to="/shoppingcar"
                          onClick={() => {
                            showMenu()
                          }}
                        >
                          <p>查看我的購物車</p>
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </li>
            <li>
              <a href="">
                <FaHeart />
              </a>
            </li>
          </ul>
          {/* ========================================================= */}
          <ul className="sign ">
            <li>
              <Link
                href=""
                onClick={() => {
                  setShowlogin(true)
                }}
              >
                註冊 / 登入
              </Link>
            </li>
          </ul>
          {/* ========================================================= */}
          <ul className="member none">
            <li>David,您好</li>
            <li>
              <a href="./memberuser" className="memberbtn">
                會員中心
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Mynavbar)
