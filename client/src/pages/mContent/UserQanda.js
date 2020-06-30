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
import $ from 'jquery'
import { getProductListAsync } from '../../actions/product/getProductList'

function UserQanda(props) {
  const { userQandaData, getUserQandaAsync } = props
  const { productListData, getProductListAsync } = props
  const { adduserQandaData, addUserQandaDataAsync } = props
  const memberId = 2
  const [productName, setproductName] = useState([])
  const [question, setQuestion] = useState([])
  // useEffect(() => {
  //   getUserQandaAsync()
  // }, [userQandaData])
  useEffect(() => {
    getUserQandaAsync()
    getProductListAsync()
    addUserQandaDataAsync()
  }, [])
  console.log('uQA-props', props)
  console.log('userQAData.memberId', userQandaData[0])
  console.log('productListData', productListData)
  console.log('uQA-props-userQandaData', props.userQandaData)
  const answer = ' '
  const addQaData = async () => {
    const GiviFormData = {
      memberId,
      question,
      productName,
      answer,
    }
    console.log('GiviFormData', GiviFormData)
    props.addUserQandaDataAsync(GiviFormData)
  }

  let productList = productListData.map((item) => {
    return <option value={item.productName}>{item.productName}</option>
  })

  let qandaList = userQandaData.map((item) => {
    if (item.memberId == 2) {
      // console.log('item', item.memberId == 2)
      return (
        <div className="qa-pane">
          <div class="row">
            <div class="col-1 qaleft-title mt-2 pl-4 font-weight-bold">
              問題
            </div>
            <div class="col-11 mt-2 pl-4 text-break">{item.question}</div>
            <div class="col-1 qaleft-title mt-2 pl-4 font-weight-bold">
              商品
            </div>
            <div class="col-11 mt-2 pl-4">{item.productName}</div>
            <div class="col-1 qa left-title mt-2 pl-4 font-weight-bold">
              答覆
            </div>
            <div class="col-11 mt-2 pl-4 text-break">{item.answer}</div>
            {/* <div class="col-11 mt-2 pl-4">{item.memberId}</div> */}
          </div>
        </div>
      )
    }
  })

  return (
    <>
      <div className="usercontainer">
        <h2 className="usertitle">問與答</h2>
        {qandaList}
        <div class="form-group">
          <label for="FormControlTextareaqa" className="qa-textarea-label">
            提出問題
          </label>
          <div>可留下您的疑問，我們將盡速問您解答。</div>
          <select
            className="form-control productalldata-select"
            id="productControlSelect1"
            onChange={(event) => setproductName(event.target.value)}
          >
            <option selected value="1">
              請選擇想提問的產品
            </option>
            {productList}
          </select>
          <textarea
            className="form-control qatextarea-container"
            id="FormControlTextareaqa"
            cols="6"
            rows="6"
            onChange={(event) => setQuestion(event.target.value)}
          ></textarea>
          <div className="qa-button-center">
            <button
              className="rt-button rt-button-submit"
              onClick={() => {
                addQaData()
                $('#FormControlTextareaqa').val('')
              }}
            >
              提出問題
            </button>
            <button
              className="rt-button rt-button-default"
              onClick={() => {
                $('#FormControlTextareaqa').val('')
              }}
            >
              重新填寫
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
const qandaStateToProps = (store) => {
  return {
    userQandaData: store.qandaReducer.userQandaData,
    adduserQandaData: store.qandaReducer.adduserQandaData,
    productListData: store.productReducer.productListData,
  }
}

export default withRouter(
  connect(qandaStateToProps, {
    getUserQandaAsync,
    addUserQandaDataAsync,
    getProductListAsync,
  })(UserQanda)
)
