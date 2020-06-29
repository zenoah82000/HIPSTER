import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Modal, Button, Form } from 'react-bootstrap'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

import { Link, withRouter } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { BsLock } from 'react-icons/bs'
import Test from '../pages/Test'

function Mynavbar(props) {
  //購物車資料
  const { mycart, deleteCart, userSuccess, setuserSuccess, username } = props
  // console.log(userSuccess)

  //購物車視窗狀態
  const [showCart, setshowCart] = useState(false)
  const showMenu = () => {
    setshowCart(!showCart)
  }

  //是否跳出註冊&登入視窗
  const [showlogin, setShowlogin] = useState(false)
  //視窗顯示註冊&登入狀態,true=註冊  false=登入
  const [SignLogin, setSignLogin] = useState(true)
  //視窗送出按鈕狀態切換
  const signchangbtn = SignLogin ? 'btn changbtn active' : 'btn changbtn'
  const loginchangbtn = SignLogin ? 'btn changbtn' : 'btn changbtn active'
  //是否跳出註冊完成視窗
  const [showSignOk, setShowSignOk] = useState(false)
  //是否跳出登入完成視窗
  const [showLoginOk, setShowLoginOk] = useState(false)
  //是否跳出登出完成視窗
  const [showLogoutOk, setShowLogoutOk] = useState(false)
  //註冊完成視窗文字顯示:失敗?成功?
  const [signOk, setsignOk] = useState(false)
  //登入完成視窗文字顯示:失敗?成功?
  const [loginOk, setloginOk] = useState(false)

  //註冊會員傳後端
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

  //登入會員傳後端
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
    if (data.success) {
      localStorage.setItem('member', JSON.stringify(data))
      setloginOk(true)
      setuserSuccess(true)
    } else {
      setloginOk(false)
      setuserSuccess(false)
    }

    console.log('伺服器登入回傳的json資料', data)
    console.log('loginOk', loginOk)
  }

  //登出處理
  async function LogoutMember(item) {
    localStorage.removeItem('member')
  }

  //抓取註冊表格資料
  let signAccount, signPassword, signData
  //抓取登入表格資料
  let loginAccount, loginPassword, loginData

  //判定註冊是否成功>提示視窗顯示文字

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
                <img src="http://localhost:5000/images/home/login-f.png"></img>
                <div className="icon-name">Facebook</div>
              </div>
              <div className="c-icon">
                <img src="http://localhost:5000/images/home/login-g.png"></img>
                <div className="icon-name">Google</div>
              </div>
              <div className="c-icon">
                <img src="http://localhost:5000/images/home/login-w.png"></img>
                <div className="icon-name">微信</div>
              </div>
              <div className="c-icon">
                <img src="http://localhost:5000/images/home/login-t.png"></img>
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
                  alert('帳號或密碼不可為空')
                } else {
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
                }
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
          {loginOk ? (
            <p className="SignOk-title">登入完成</p>
          ) : (
            <p className="SignOk-title">
              登入失敗
              <br />
              請檢查帳號＆密碼是否正確
            </p>
          )}

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
  ////登出完成視窗
  function LogoutOkMassage(props) {
    return (
      <Modal
        className="SignOk"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="SignOk-bg">
          <p className="SignOk-title">登出成功</p>
          <div
            className="SignOkbtn"
            onClick={() => {
              setShowLogoutOk(false)
              LogoutMember()
              window.location.href = '/'
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
      <LogoutOkMassage show={showLogoutOk} />
      <nav>
        <div className="navbar container ">
          <Link to="/" className="logo">
            <img src="http://localhost:5000/images/home/logo.png" />
          </Link>
          <div className="burger none" id="burger">
            ☰
          </div>
          <ul className="menu">
            <li>
              <Link to="/about">品牌介紹</Link>
            </li>
            <li>
              <Link to="/map">地圖探索</Link>
            </li>
            <li>
              <Link to="/blog">文章專欄</Link>
            </li>
            <li>
              <Link to="/productlist/">活動列表</Link>
            </li>
            <li>
              <Link to="/contact">聯絡我們</Link>
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
                                  <div className="productimgbox mr-4">
                                    <Link to="/">
                                      <img src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg" />
                                    </Link>
                                  </div>
                                  <div className="item-text">
                                    <div className="item-name">
                                      <Link to="/">
                                        <p>{value.name}</p>
                                      </Link>
                                    </div>
                                    <div className="item-date">
                                      <span>{value.date}</span>
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
              <Link to="/memberuser/wishlist">
                <FaHeart />
              </Link>
            </li>
          </ul>
          {/* ========================================================= */}
          {userSuccess ? (
            <>
              <ul className="member">
                <li>{username},您好</li>
                <li>
                  <Link to="/memberuser/user/" className="memberbtn">
                    會員中心
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="memberbtn"
                    onClick={() => {
                      setuserSuccess(false)
                      setShowLogoutOk(true)
                    }}
                  >
                    登出
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
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
            </>
          )}

          {/* ========================================================= */}
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
