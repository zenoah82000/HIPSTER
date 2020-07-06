import React from 'react'
import '../../styles/HS.scss'
import { Link, withRouter } from 'react-router-dom'
// import { bindActionCreators } from 'redux'

//引入action
// import { memberLogoutAsync } from '../../actions/member/memberActions'
// import { connect } from 'react-redux'

function Sidebar(props) {
  // console.log(props)
  const userlocalStorage = JSON.parse(localStorage.getItem('member')) || []
  const username = userlocalStorage.name
  const userimg = userlocalStorage.img
  return (
    <>
      <main role="main" className="flex-shrink-0 mb-5">
        <div className="container mt-md-3">
          <div className="row">
            <div className="col-md-3 mr-md-2">
              <ul className="nav flex-column px-md-5">
                <li className="nav-item">
                  <img
                    className="rounded-circle avatar mt-4 "
                    src={`http://localhost:5000/images/member/${userimg}`}
                    alt="cat"
                  ></img>
                </li>
                <li className="nav-item border-bottom membername mb-1">
                  <div
                    className="nav-link sidebarlink-hs font-weight-bold"
                    id="membername"
                  >
                    {username}
                  </div>
                </li>
                <li className="nav-item  my-2">
                  <Link
                    className="nav-link sidebarlink-hs sidebar-underline"
                    to="/memberuser/user/:memberId"
                  >
                    <i className="far fa-user"></i>個人資訊
                  </Link>
                </li>
                <li className="nav-item  my-2">
                  <Link
                    className="nav-link sidebarlink-hs sidebar-underline"
                    to="/memberuser/comment/notcomment"
                  >
                    <i className="fas fa-comments"></i>我的評價
                  </Link>
                </li>
                <li className="nav-item  my-2">
                  <Link
                    className="nav-link sidebarlink-hs sidebar-underline"
                    to="/memberuser/order"
                  >
                    <i className="fas fa-receipt"></i>我的訂單
                  </Link>
                </li>
                <li className="nav-item  my-2">
                  <Link
                    className="nav-link sidebarlink-hs sidebar-underline"
                    to="/memberuser/blog"
                  >
                    <i className="far fa-edit"></i>我的文章
                  </Link>
                </li>
                <li className="nav-item  my-2">
                  <Link
                    className="nav-link sidebarlink-hs sidebar-underline"
                    to="/memberuser/qanda"
                  >
                    <i className="fas fa-question-circle"></i>問與答
                  </Link>
                </li>
                <li className="nav-item  my-2">
                  <Link
                    className="nav-link sidebarlink-hs sidebar-underline"
                    to="/memberuser/coupon/available"
                  >
                    <i className="fas fa-ticket-alt"></i>優惠券
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link
                    className="nav-link sidebarlink-hs sidebar-underline"
                    to="/memberuser/mymap"
                  >
                    <i className="fas fa-shoe-prints"></i>個人地圖
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link
                    className="nav-link sidebarlink-hs sidebar-underline"
                    to="/memberuser/wishlist"
                  >
                    <i className="fas fa-heart"></i>願望清單
                  </Link>
                </li>
                <li className="nav-item my-2">
                  <Link
                    className="nav-link sidebarlink-hs sidebar-underline"
                    to="/"
                    onClick={(event) => {
                      event.preventDefault()
                      localStorage.removeItem('member')
                      props.history.push('/')
                      window.location.reload()
                    }}
                  >
                    <i className="fas fa-sign-out-alt"></i>登出
                  </Link>
                </li>
              </ul>
            </div>
            <div className="bg-white ml-md-2 sidebarright">
              {props.children}
            </div>
          </div>
        </div>
      </main>

      {/* <div>
          <img
            className="rounded-circle avatar mb-5"
            src={
              'http://127.0.0.1:5000/images/memberImg/' + props.SidebarImgSrc
            }
            alt=""
          ></img>
        </div> */}
    </>
  )
}

// 取得Redux中store的值
// const mapStateToProps = store => {
//   return {}
// }

// 指示dispatch要綁定哪些action creators
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       memberLogoutAsync,
//     },
//     dispatch
//   )
// }

export default withRouter(Sidebar)
