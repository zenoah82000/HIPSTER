import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
// import { connect } from 'react-redux'
// import { userLoginAsync } from '../../actions/member/memberActions'
import '../../styles/HS.scss'

// functional component
// import Header from '../../components/Header'
// import Banner from '../../components/Banner'
// import Footer from '../../components/Footer'
// import image from '../../image/memberImage/coralreef.jpg'
import Sidebar from '../../components/member/Sidebar'
import UserContent from '../mContent/UserContent'
import UserComment from '../mContent/UserComment'
import UserOrder from '../mContent/UserOrder'
import UserBlog from '../mContent/UserBlog'
import UserQanda from '../mContent/UserQanda'
import UserCoupon from '../mContent/UserCoupon'
import UserMymap from '../mContent/UserMymap'
import UserWishlist from '../mContent/UserWishlist'
import NotFoundPage from '../NotFoundPage'

function MemberUser(props) {
  // const { userSuccess, setuserSuccess } = props
  // console.log('userSuccess', userSuccess)
  // console.log('JSON.parse.Boolean')
  console.log('props', props)
  let auth
  if (Boolean(JSON.parse(localStorage.getItem('member')))) {
    auth = true
  } else {
    auth = false
  }
  return (
    <>
      {/* <Header />
      <Banner BannerImgSrc={image} /> */}
      {/* <!-- Page Content --> */}
      {auth ? (
        <Sidebar>
          <Switch>
            <Route path="/memberuser/user">
              <UserContent />
            </Route>
            <Route path="/memberuser/comment/:type">
              <UserComment />
            </Route>
            <Route path="/memberuser/order">
              <UserOrder />
            </Route>
            <Route path="/memberuser/blog">
              <UserBlog />
            </Route>
            <Route path="/memberuser/qanda">
              <UserQanda />
            </Route>
            <Route path="/memberuser/coupon/:type">
              <UserCoupon />
            </Route>
            <Route path="/memberuser/mymap">
              <UserMymap />
            </Route>
            <Route path="/memberuser/wishlist">
              <UserWishlist />
            </Route>
          </Switch>
        </Sidebar>
      ) : (
        <NotFoundPage />
      )}
    </>
  )
}

export default withRouter(MemberUser)
