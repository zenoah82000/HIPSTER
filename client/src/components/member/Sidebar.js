import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/HS.scss'
// import { bindActionCreators } from 'redux'

//引入action
// import { memberLogoutAsync } from '../../actions/member/memberActions'
// import { connect } from 'react-redux'

function Sidebar(props) {
  console.log(props)
  return (
    <>
      <main role="main" className="flex-shrink-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ul className="nav flex-column px-lg-5">
                <li className="nav-item">
                  <img
                    className="rounded-circle avatar mt-4 "
                    src="
                    https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    alt=""
                  ></img>
                </li>
                <li className="nav-item">
                  <div
                    className="nav-link sidebarlink-hs font-weight-bold"
                    id="membername"
                  >
                    Member Name
                  </div>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link sidebarlink-hs"
                    to="/memberuser/user/:memberId"
                  >
                    <i className="far fa-user"></i>個人資訊
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link sidebarlink-hs"
                    to="/memberuser/comment"
                  >
                    <i className="fas fa-comments"></i>我的評價
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link sidebarlink-hs"
                    to="/memberuser/order"
                  >
                    <i className="fas fa-receipt"></i>我的訂單
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link sidebarlink-hs"
                    to="/memberuser/article"
                  >
                    <i className="far fa-edit"></i>我的文章
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link sidebarlink-hs"
                    to="/memberuser/qanda"
                  >
                    <i className="fas fa-question-circle"></i>問與答
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link sidebarlink-hs"
                    to="/memberuser/coupon"
                  >
                    <i className="fas fa-ticket-alt"></i>優惠券
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link sidebarlink-hs"
                    to="/memberuser/mymap"
                  >
                    <i className="fas fa-shoe-prints"></i>個人地圖
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link sidebarlink-hs"
                    to="/memberuser/wishlist"
                  >
                    <i className="fas fa-heart"></i>願望清單
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link sidebarlink-hs"
                    to="/"
                    onClick={(event) => {
                      event.preventDefault()
                      props.memberLogoutAsync()
                    }}
                  >
                    <i className="fas fa-sign-out-alt"></i>登出
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-9">{props.children}</div>
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

export default Sidebar
