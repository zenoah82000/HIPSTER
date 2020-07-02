import React, { useState, useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProductQandaAsync } from '../../actions/qanda/qanda_Action'

import $ from 'jquery'

function ProductQanda(props) {
  const { productQandaData, getProductQandaAsync } = props
  useEffect(() => {
    getProductQandaAsync()
  }, [])
  console.log('getProductQanda-props-productNameNow', props.productNameNow)
  console.log('productQandaData', productQandaData)
  // console.log('this.props', this.props)

  let productQaList = productQandaData.map((item) => {
    if (item.productName == props.productNameNow) {
      return (
        <div className="qa-product">
          <div class="row">
            <h2 className="eventTitle col-12 h5">問與答 </h2>
            <div class="col-1 qaleft-title mt-2 font-weight-bold">會員</div>
            <div class="col-11 mt-2 pl-4 text-break">{item.memberName}</div>
            <div class="col-1 qaleft-title mt-2 font-weight-bold">問題</div>
            <div class="col-11 mt-2 pl-4">{item.question}</div>
            <div class="col-1 qa left-title mt-2 font-weight-bold">答覆</div>
            <div class="col-11 mt-2 pl-4 text-break">{item.answer}</div>
          </div>
        </div>
      )
    }
  })

  return (
    <>
      <div className="productqa-container">{productQaList}</div>
    </>
  )
}
const qandaStateToProps = (store) => {
  return {
    productQandaData: store.qandaReducer.productQandaData,
  }
}

export default withRouter(
  connect(qandaStateToProps, {
    getProductQandaAsync,
  })(ProductQanda)
)
