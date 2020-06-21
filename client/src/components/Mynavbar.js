import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Modal, Button, Form } from 'react-bootstrap'
import Logo from '../images/home/logo.png'
import loginiconf from '../images/home/login-f.png'
import loginiconw from '../images/home/login-w.png'
import loginicong from '../images/home/login-g.png'
import loginicont from '../images/home/login-t.png'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

import { Link, withRouter } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { BsLock } from 'react-icons/bs'
import Test from '../pages/Test'

function Mynavbar(props) {
  //購物車資料
  const { mycart, deleteCart } = props

  //購物車視窗狀態
  const [showCart, setshowCart] = useState(false)
  const showMenu = () => {
    setshowCart(!showCart)
  }

  //是否跳出註冊&登入視窗
  const [showlogin, setShowlogin] = useState(false)
  //登入登出視窗狀態,true=註冊  false=登入
  const [SignLogin, setSignLogin] = useState(true)
  //視窗狀態按鈕切換
  const signchangbtn = SignLogin ? 'btn changbtn active' : 'btn changbtn'
  const loginchangbtn = SignLogin ? 'btn changbtn' : 'btn changbtn active'

  //註冊會員
  async function addNewMember(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/addmember/', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    console.log('伺服器回傳的json資料', data)
    // 要等驗証過，再設定資料(簡單的直接設定)
  }

  //登入會員
  async function LoginMember(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/loginmember/', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    console.log('伺服器登入回傳的json資料', data.success)
    // 要等驗証過，再設定資料(簡單的直接設定)
  }

  //抓取註冊表格資料
  let signAccount, signPassword, signData

  //抓取登入表格資料
  let loginAccount, loginPassword, loginData

  //註冊會員表格
  const membersign = (
    <>
      <div className="membersign ">
        <p className="membersign-title">註冊會員帳號</p>
        <Form.Group>
          <Form.Label>帳號(聯絡信箱)：</Form.Label>
          <Form.Control
            ref={(input) => (signAccount = input)}
            type="email"
            id="signAccount"
            required="required"
            placeholder="請輸入註冊信箱..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>密碼：</Form.Label>
          <Form.Control
            ref={(input) => (signPassword = input)}
            type="text"
            id="signPassword"
            required="required"
            placeholder="請輸入註冊密碼..."
          />
        </Form.Group>
      </div>
    </>
  )
  //登入會員表格
  const memberlogin = (
    <>
      <div className="membersign">
        <p className="membersign-title">會員登入</p>
        <Form.Group>
          <Form.Label>帳號：</Form.Label>
          <Form.Control
            ref={(input) => (loginAccount = input)}
            type="email"
            id="loginAccount"
            required="required"
            placeholder="請輸入登入信箱..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>密碼：</Form.Label>
          <Form.Control
            ref={(input) => (loginPassword = input)}
            type="text"
            id="loginPassword"
            required="required"
            placeholder="請輸入登入密碼..."
          />
        </Form.Group>
      </div>
    </>
  )

  //註冊&登入浮動視窗
  function SignLoginMassage(props) {
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
              className={signchangbtn}
              id="changsignbtn"
              onClick={() => {
                setSignLogin(true)
              }}
            >
              會員註冊
            </div>

            <div
              className={loginchangbtn}
              id="changloginbtn"
              onClick={() => {
                setSignLogin(false)
              }}
            >
              會員登入
            </div>
          </div>

          {/* ---------註冊登入--------- */}
          {SignLogin ? membersign : memberlogin}
          {/* ----------註冊登入--------- */}

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

          {SignLogin ? (
            <Form.Group controlId="formBasicCheckbox" className="logincheck">
              <Form.Check type="checkbox">
                <Form.Check.Input type="checkbox" />
                <Form.Check.Label>
                  我已詳細閱讀，並同意接受<span>會員權益</span>與
                  <span>個資同意條款</span>
                </Form.Check.Label>
              </Form.Check>
            </Form.Group>
          ) : (
            <div className="forgetpwd">
              <a>忘記密碼</a>
            </div>
          )}

          {SignLogin ? (
            <div
              className="signbtn "
              type="submit"
              onClick={() => {
                if (signAccount.value == '' || signPassword.value == '') {
                }
                //撈取資料
                signData = {
                  memberMail: signAccount.value,
                  memberPwd: signPassword.value,
                }
                // console.log(signData)
                addNewMember(signData) //寫入資料庫
                setShowlogin(false) //關閉註冊登入視窗
                setTimeout(() => {
                  setShowSignOk(true) //跳出註冊完成視窗
                }, 300)
              }}
            >
              註冊
            </div>
          ) : (
            <div
              className="loginbtn"
              onClick={() => {
                loginData = {
                  memberMail: loginAccount.value,
                  memberPwd: loginPassword.value,
                }
                LoginMember(loginData) //寫入資料庫
                setShowlogin(false) //關閉註冊登入視窗
                setTimeout(() => {
                  setShowLoginOk(true) //跳出註冊完成視窗
                }, 300)
              }}
            >
              登入
            </div>
          )}
        </Modal.Body>
      </Modal>
    )
  }

  ////註冊完成視窗
  //是否跳出註冊完成視窗
  const [showSignOk, setShowSignOk] = useState(false)
  function SignOkMassage(props) {
    return (
      <Modal
        className="SignOk"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="SignOk-bg">
          <p className="SignOk-title">註冊完成</p>
          <p className="SignOk-text">請重新登入</p>
          <div
            className="SignOkbtn"
            onClick={() => {
              setShowSignOk(false)
              setSignLogin(false)
              setShowlogin(true)
            }}
          >
            確認
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  ////登入完成視窗
  //是否跳出登入完成視窗
  const [showLoginOk, setShowLoginOk] = useState(false)
  function LoginOkMassage(props) {
    return (
      <Modal
        className="SignOk"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="SignOk-bg">
          <p className="SignOk-title">登入完成</p>
          <div
            className="SignOkbtn"
            onClick={() => {
              setShowLoginOk(false)
            }}
          >
            確認
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <>
      <SignLoginMassage show={showlogin} onHide={() => setShowlogin(false)} />
      <SignOkMassage show={showSignOk} onHide={() => setShowSignOk(false)} />
      <LoginOkMassage show={showLoginOk} onHide={() => setShowLoginOk(false)} />
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
                                      <button
                                        onClick={() => {
                                          deleteCart(value.id)
                                        }}
                                      >
                                        <BsTrash />
                                        移除
                                      </button>
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
const mapStateToProps = (store) => {
  return {
    mycart: store.orderReducer.cartData,
  }
}

export default withRouter(connect(mapStateToProps)(Mynavbar))
