import React, { useState, useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getProductQandaAsync,
  addUserQandaDataAsync,
} from '../../actions/qanda/qanda_Action'
import $ from 'jquery'

function ProductQanda(props) {
  const { productQandaData, getProductQandaAsync } = props
  console.log('getProductQanda-props-productNameNow', props.productNameNow)
  console.log('productQandaData', productQandaData)
  // console.log('this.props', this.props)
  const { adduserQandaData, addUserQandaDataAsync } = props
  let memberId = 0
  let auth = false
  const [productName, setproductName] = useState([props.productNameNow])
  const [question, setQuestion] = useState([])
  const answer = ' '
  useEffect(() => {
    getProductQandaAsync()
    addUserQandaDataAsync()
  }, [])
  if (JSON.parse(localStorage.getItem('member'))) {
    memberId = JSON.parse(localStorage.getItem('member')).id
    auth = true
  } else {
    memberId = 0
  }

  // const addQaData = async () => {
  //   const GiviFormData = {
  //     memberId,
  //     question,
  //     productName,
  //     answer,
  //   }
  //   console.log('GiviFormData', GiviFormData)
  //   props.addUserQandaDataAsync(GiviFormData)
  // }

  const addQaData = async () => {
    const GiviFormData = {
      memberId,
      question,
      productName,
      answer,
    }
    Swal.fire({
      title: '確定新增此商品問題?',
      icon: 'question',
      showCancelButton: true,
      html:
        '<h5 class="alert-side">商品名稱: ' +
        '<strong>' +
        GiviFormData.productName +
        '</strong>' +
        '</h5>' +
        '<h5 class="alert-side">問題: ' +
        '<strong>' +
        GiviFormData.question +
        '</strong>' +
        '</h5>',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.value) {
        props.addUserQandaDataAsync(GiviFormData)
        Swal.fire({
          title: '問題新增成功',
          icon: 'success',
        }).then(() => {
          props.history.go(0)
        })
      }
    })
  }

  let productQaList = productQandaData.map((item) => {
    if (item.productName == props.productNameNow) {
      return (
        <div className="qa-product">
          <div class="row coupon-listview">
            <div class="col-1 qaleft-title mt-2 font-weight-bold">會員</div>
            <div class="col-11 mt-2 pl-4 text-break">{item.memberName}</div>
            <div class="col-1 qaleft-title mt-2 font-weight-bold">問題</div>
            <div class="col-11 mt-2 pl-4">{item.question}</div>
            <div class="col-1 qa left-title mt-2 font-weight-bold">答覆</div>
            <div class="col-11 mt-2 pl-4 text-break ">{item.answer}</div>
          </div>
        </div>
      )
    }
  })
  // let inputTextarea = () => {
  //   return (
  //     <>
  //       <textarea
  //         className="form-control qatextarea-container"
  //         id="FormControlTextareaqa"
  //         cols="6"
  //         rows="6"
  //         onChange={(event) => setQuestion(event.target.value)}
  //       ></textarea>
  //       <div className="qa-button-center">
  //         <button
  //           className="rt-button rt-button-submit"
  //           onClick={() => {
  //             addQaData()
  //             $('#FormControlTextareaqa').val('')
  //           }}
  //         >
  //           提出問題
  //         </button>
  //         <button
  //           className="rt-button rt-button-default"
  //           onClick={() => {
  //             $('#FormControlTextareaqa').val('')
  //           }}
  //         >
  //           重新填寫
  //         </button>
  //       </div>
  //     </>
  //   )
  // }

  return (
    <>
      <div className="productqa-container">{productQaList}</div>
      {auth ? (
        <>
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
        </>
      ) : (
        ''
      )}
    </>
  )
}
const qandaStateToProps = (store) => {
  return {
    productQandaData: store.qandaReducer.productQandaData,
    adduserQandaData: store.qandaReducer.adduserQandaData,
  }
}

export default withRouter(
  connect(qandaStateToProps, {
    getProductQandaAsync,
    addUserQandaDataAsync,
  })(ProductQanda)
)
