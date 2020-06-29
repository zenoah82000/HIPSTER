import React, { useState, useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getUserQandaAsync,
  addUserQandaDataAsync,
} from '../../actions/qanda/qanda_Action'
import '../../styles/mContent/userqand.scss'
function UserQanda(props) {
  const { userQandaData, getUserQandaAsync } = props
  const { adduserQandaData, addUserQandaDataAsync } = props
  const memberId = 2
  const [discountCode, setdiscountCode] = useState([])
  // useEffect(() => {
  //   getUserQandaAsync()
  // }, [userQandaData])
  useEffect(() => {
    getUserQandaAsync()
    addUserQandaDataAsync()
  }, [])
  console.log('uQA-props', props)
  console.log('userQAData', userQandaData)
  console.log('uQA-props-userQandaData', props.userQandaData)
  // const addGiviData = async () => {
  //   const GiviFormData = {
  //     memberId,
  //     discountCode,
  //   }
  //   console.log('GiviFormData', GiviFormData)
  //   props.addUserCouponDataAsync(GiviFormData)
  // }
  // console.log('discountCode', discountCode)
  // console.log('adduserCouponData', adduserCouponData)
  let qandaList = userQandaData.map((item) => {
    return (
      <div className="qa-pane">
        <div class="row">
          <div class="col-1 qaleft-title mt-2 pl-4 font-weight-bold">問題</div>
          <div class="col-11 mt-2 pl-4">{item.question}</div>
          <div class="col-1 qaleft-title mt-2 pl-4 font-weight-bold">商品</div>
          <div class="col-11 mt-2 pl-4">{item.productName}</div>
          <div class="col-1 qa left-title mt-2 pl-4 font-weight-bold">答覆</div>
          <div class="col-11 mt-2 pl-4">{item.answer}</div>
        </div>
      </div>
    )
  })

  return (
    <>
      <div className="usercontainer">
        <h2 className="usertitle">問與答</h2>
        {qandaList}
      </div>
    </>
  )
}
const qandaStateToProps = (store) => {
  return {
    userQandaData: store.qandaReducer.userQandaData,
    adduserQandaData: store.qandaReducer.adduserQandaData,
  }
}

export default withRouter(
  connect(qandaStateToProps, {
    getUserQandaAsync,
    addUserQandaDataAsync,
  })(UserQanda)
)
