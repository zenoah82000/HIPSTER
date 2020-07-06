import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Fade from 'react-reveal/Fade'

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
  //登入完成視窗文字顯示:失敗0;成功1;忘記密碼送出2;查無帳號3
  const [loginOk, setloginOk] = useState(0)
  //忘記密碼視窗
  const [showforgetPwd, setshowforgetPwd] = useState(false)

  let signcheckbox = false

  //手機版-漢堡選單狀態 0=關閉
  const [burgerstate, setburgerstate] = useState(false)
  //手機版-會員中心選單狀態 0=關閉
  const [membercenterstate, setmembercenterstate] = useState(false)

  //抓取註冊表格資料
  let signAccount, signPassword, signData
  //抓取登入表格資料
  let loginAccount, loginPassword, loginData
  //抓取忘記密碼表格資料
  let forgetPwd, forgetpwdmailData

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
      setloginOk(1)
      setuserSuccess(true)
    } else {
      setloginOk(0)
      setuserSuccess(false)
    }
    // console.log('伺服器登入回傳的json資料', data)
    // console.log('loginOk', loginOk)
  }

  //登出處理
  async function LogoutMember(item) {
    localStorage.removeItem('member')
  }

  //忘記密碼傳後端
  async function ForgetPwdinput(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/forgetpwdinput/', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    console.log(data)
    data.success ? setloginOk(2) : setloginOk(3)
  }

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
            type="password"
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
            type="password"
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
                <Form.Check.Input
                  type="checkbox"
                  onChange={() => {
                    signcheckbox = !signcheckbox
                    console.log(signcheckbox)
                  }}
                />
                <Form.Check.Label>
                  我已詳細閱讀，並同意接受<span>會員權益</span>與
                  <span>個資同意條款</span>
                </Form.Check.Label>
              </Form.Check>
            </Form.Group>
          ) : (
            <div className="forgetpwd">
              <a
                onClick={() => {
                  setShowlogin(false) //關閉註冊登入視窗
                  setshowforgetPwd(true)
                }}
              >
                忘記密碼
              </a>
            </div>
          )}

          {SignLogin ? (
            <div
              className="signbtn "
              type="submit"
              onClick={() => {
                if (signcheckbox == false) {
                  alert('請確認已詳細閱讀，並同意接受會員權益與個資同意條款')
                } else {
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
                  setShowLoginOk(true) //跳出登入完成視窗
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
  const loginOktrue = (
    <>
      <p className="SignOk-title">登入完成</p>
    </>
  )
  const loginOkfalse = (
    <>
      <p className="SignOk-title">
        登入失敗
        <br />
        請檢查帳號＆密碼是否正確
      </p>
    </>
  )

  const forgetpwdok = (
    <>
      <p className="SignOk-title">
        重製密碼信件已寄出
        <br />
        請收取信件並按指示操作
      </p>
    </>
  )

  const forgetpwderror = (
    <>
      <p className="SignOk-title">查無此帳號</p>
    </>
  )

  const Massage = () => {
    if (loginOk == 0) {
      return loginOkfalse
    } else if (loginOk == 1) {
      return loginOktrue
    } else if (loginOk == 2) {
      return forgetpwdok
    } else if (loginOk == 3) {
      return forgetpwderror
    }
  }

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
          {Massage()}
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
  ////忘記密碼
  function ForgetPwd(props) {
    return (
      <Modal
        className="SignOk"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="SignOk-bg">
          <div className="closeMassage" onClick={props.onHide}>
            <IoMdClose />
          </div>
          <p className="SignOk-title">請輸入註冊時使用信箱帳號</p>
          <Form.Group className="forgetpwdgroup">
            <Form.Control
              ref={(input) => (forgetPwd = input)}
              type="email"
              // id="forgetpwdinput"
              // required="required"
              placeholder=""
            />
          </Form.Group>
          <p className="forgetpwdtext">
            我們會將重製密碼信件寄至您指定信箱，還請確實填寫
          </p>
          <div
            className="SignOkbtn"
            onClick={() => {
              forgetpwdmailData = {
                forgetpwdmail: forgetPwd.value,
              }
              ForgetPwdinput(forgetpwdmailData)
              setshowforgetPwd(false)
              setTimeout(() => {
                setShowLoginOk(true) //跳出登入完成視窗
              }, 300)
            }}
          >
            送出
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
      <ForgetPwd show={showforgetPwd} onHide={() => setshowforgetPwd(false)} />

      <nav>
        <div className="navbar container ">
          <Link to="/" className="logo">
            <img src="http://localhost:5000/images/home/logo.png" />
          </Link>

          <ul className="menu" style={burgerstate ? { width: '100%' } : {}}>
            <li>
              <Link className="hvr-float hvr-underline-from-center" to="/about">
                品牌介紹
              </Link>
            </li>
            <li>
              <Link className="hvr-float hvr-underline-from-center" to="/map">
                地圖探索
              </Link>
            </li>
            <li>
              <a
                className="hvr-float hvr-underline-from-center"
                // to="/productlist"
                href="/productlist"
              >
                活動列表
              </a>
            </li>
            <li>
              <Link className="hvr-float hvr-underline-from-center" to="/blog">
                文章專欄
              </Link>
            </li>
            <li>
              <Link
                className="hvr-float hvr-underline-from-center"
                to="/contact"
              >
                聯絡我們
              </Link>
            </li>
          </ul>
          {/* ========================================================= */}
          <ul className="shop-group">
            <li>
              <div className="navbar-cart">
                <FaShoppingCart
                  className="car-img hvr-grow"
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
                                    <Link to={`/product/${value.productId}`}>
                                      <img
                                        onClck={() => {
                                          props.history.push(
                                            `/product/${value.productId}`
                                          )
                                        }}
                                        src={`http://localhost:5000/images/product/${value.productImg}`}
                                      />
                                    </Link>
                                  </div>
                                  <div className="mycart-textbox">
                                    <div className="item-name">
                                      <Link to={`/product/${value.productId}`}>
                                        <p title={value.productName}>{value.productName}</p>
                                      </Link>
                                    </div>

                                    <div className="item-price">
                                      <span>價格:NT${value.productPrice.toString()
                          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}</span>
                                    </div>
                                    <div className="item-price">
                                      <span>數量:{value.amount}</span>
                                    </div>
                                    <div className="item-date">
                                      <span>日期:{value.date}</span>
                                      <button
                                        onClick={() => {
                                          deleteCart(value.productId)
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
                        <div></div>
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
                <FaHeart className="hvr-pulse" />
              </Link>
            </li>
          </ul>
          {/* ========================================================= */}
          <div
            className="burger "
            id="burger"
            onClick={() => {
              setburgerstate(!burgerstate)
            }}
          >
            {burgerstate ? 'X' : '☰'}
          </div>
          {userSuccess ? (
            <>
              <ul
                className="member"
                style={burgerstate ? { width: '100%' } : {}}
              >
                <li>{username},您好</li>
                <li>
                  <Link to="/memberuser/user/" className="memberbtn">
                    會員中心
                  </Link>
                  <Link
                    className="memberbtnPhone"
                    onClick={() => {
                      setmembercenterstate(!membercenterstate)
                    }}
                  >
                    會員中心
                  </Link>
                  <ul
                    className="membercenterPhone"
                    style={membercenterstate ? { height: 480 } : {}}
                  >
                    <li>
                      <Link>個人資訊</Link>
                    </li>
                    <li>
                      <Link>我的評價</Link>
                    </li>
                    <li>
                      <Link>我的訂單</Link>
                    </li>
                    <li>
                      <Link>我的文章</Link>
                    </li>
                    <li>
                      <Link>問與答</Link>
                    </li>
                    <li>
                      <Link>優惠卷</Link>
                    </li>
                    <li>
                      <Link>個人地圖</Link>
                    </li>
                    <li>
                      <Link>願望清單</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link
                    href="#"
                    className="memberbtn logout"
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
              <ul
                className="sign "
                style={burgerstate ? { width: '100%' } : {}}
              >
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
