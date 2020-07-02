import React, { useEffect, useState } from 'react'
import '../styles/forgetpwd.scss'
import { Link, withRouter } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap'
//引入自訂元件

function Forgetpwd(props) {
  //頁面顯示(驗證碼&密碼)
  const [display, setdisplay] = useState(true)
  //提示小視窗顯示與否
  const [promptdisplay, setpromptdisplay] = useState(true)
  //提示視窗內容切換
  const [promptchang, setpromptchang] = useState(0)

  let code, pwd1, pwd2

  //提示視窗-驗證碼錯誤=0
  const promptCodeError = (
    <>
      <p className="SignOk-title">驗證碼有誤，請重新輸入</p>
      <div
        className="SignOkbtn"
        onClick={() => {
          setpromptdisplay(false)
        }}
      >
        確認
      </div>
    </>
  )
  //提示視窗-驗證碼成功=1
  const promptCodeOk = (
    <>
      <p className="SignOk-title">驗證成功，請更新密碼</p>
      <div
        className="SignOkbtn"
        onClick={() => {
          setpromptdisplay(false)
        }}
      >
        確認
      </div>
    </>
  )
  //提示視窗-密碼錯誤=2
  const promptPwdError = (
    <>
      <p className="SignOk-title">密碼有誤，請確認密碼欄位與確認欄位必需相同</p>
      <div
        className="SignOkbtn"
        onClick={() => {
          setpromptdisplay(false)
        }}
      >
        確認
      </div>
    </>
  )
  //提示視窗-密碼正確=3
  const promptPwdOk = (
    <>
      <p className="SignOk-title">密碼更新完成，還請重新登入網站</p>
      <div
        className="SignOkbtn"
        onClick={() => {
          setpromptdisplay(false)
          props.history.push('/')
        }}
      >
        確認
      </div>
    </>
  )

  //提示視窗內容顯示
  const promptcontent = () => {
    if (promptchang == 0) {
      return promptCodeError
    } else if (promptchang == 1) {
      return promptCodeOk
    } else if (promptchang == 2) {
      return promptPwdError
    } else if (promptchang == 3) {
      return promptPwdOk
    }
  }

  ////提示視窗
  function Cprompt(props) {
    return (
      <Modal
        className="SignOk"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="SignOk-bg">{promptcontent()}</Modal.Body>
      </Modal>
    )
  }
  // ==================================================
  //驗證碼頁面
  const inputcode = (
    <>
      <p className="forgetpwd-title">請輸入驗證號碼</p>
      <Form.Group className="">
        <Form.Control
          ref={(input) => (code = input)}
          type="text"
          // id="forgetpwdinput"
          // required="required"
          placeholder=""
        />
        <Form.Text className="text-muted text-center forgetpwd-text">
          請輸入系統重製密碼信件中所提供的驗證碼
        </Form.Text>
      </Form.Group>
      <div className="forgetpwdbtn" onClick={() => {}}>
        送出
      </div>
    </>
  )
  //密碼頁面
  const inputpwd = (
    <>
      <p className="forgetpwd-title">請輸入更新密碼</p>
      <Form.Group className="">
        <Form.Control
          ref={(input) => (pwd1 = input)}
          type="text"
          // id="forgetpwdinput"
          // required="required"
          placeholder="請輸入修改密碼"
        />
        <br />
        <Form.Control
          ref={(input) => (pwd2 = input)}
          type="text"
          // id="forgetpwdinput"
          // required="required"
          placeholder="請再次輸入修改密碼"
        />
      </Form.Group>
      <div className="forgetpwdbtn" onClick={() => {}}>
        送出
      </div>
    </>
  )

  return (
    <>
      <Cprompt show={promptdisplay} onHide={() => setpromptdisplay(false)} />
      <div className="forgetpwdbg">
        <div className="forgetpwdgroup">{display ? inputcode : inputpwd}</div>
      </div>
    </>
  )
}

export default withRouter(Forgetpwd)
