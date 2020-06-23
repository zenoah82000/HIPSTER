import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../../styles/mContent/usercontent.scss'

function UserContent() {
  const [edit, setedit] = useState(false)
  const success = edit ? '' : 'disabled'

  const userId = { memberId: JSON.parse(localStorage.getItem('member')).id }

  let memberName,
    memberGender,
    memberBirth,
    memberPhone,
    memberAddress,
    memberMail,
    memberPwd,
    memberImg
  //傳後端取得會員基本資料
  async function memberData(item) {
    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:5000/getmemberdata/', {
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

    // //將回傳會員資料放入變數
    memberName = data.memberName
    memberGender = data.memberGender
    memberBirth = data.memberBirth
    memberPhone = data.memberPhone
    memberAddress = data.memberAddress
    memberMail = data.memberMail
    memberPwd = data.memberPwd
    memberImg = data.memberImg
  }
  memberData(userId)
  console.log(memberName)

  const dataDisplay = (
    <>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>會員名稱</Form.Label>
        <Form.Control type="email" id="username" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>性別</Form.Label>
        <Form.Control as="select">
          <option value="預設">預設</option>
          <option value="男">男</option>
          <option value="女">女</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>出生日期</Form.Label>
        <Form.Control type="text" id="birth" placeholder="Date" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>連絡電話</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>連絡地址</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>信箱帳號</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>登入密碼</Form.Label>
        <Form.Control type="password" placeholder="已設置登入密碼" />
      </Form.Group>
      <Button
        className="userEditBtn"
        variant="primary"
        type="button"
        onClick={() => {
          //   setedit(true)
          console.log(memberName)
        }}
      >
        編輯
      </Button>
    </>
  )

  return (
    <>
      <div className="contentBlock">
        <div className="contentTitle">會員資料</div>

        <Form>{dataDisplay}</Form>
      </div>
    </>
  )
}

export default UserContent
