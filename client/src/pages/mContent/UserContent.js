import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import '../../styles/mContent/usercontent.scss'

function UserContent() {
  //切換顯示&編輯
  const [edit, setedit] = useState(false)
  //編輯下>切換生日輸入欄樣式
  const [brthdayedit, setbrthdayedit] = useState(false)

  const userId = {
    memberId: JSON.parse(localStorage.getItem('member')).id,
  }

  //顯示會員資料
  const [mdata, setmdata] = useState('') //回傳資料存放
  const memberName = mdata.memberName
  const memberGender = mdata.memberGender
  const memberBirth = new Date(mdata.memberBirth).toLocaleDateString()
  const memberPhone = mdata.memberPhone
  const memberAddress = mdata.memberAddress
  const memberMail = mdata.memberMail
  const memberPwd = mdata.memberPwd
  const memberImg = mdata.memberImg

  //存放個欄位輸入值
  let editmemberName,
    editmemberGender,
    editmemberBirth,
    editmemberPhone,
    editmemberAddress,
    editmemberMail,
    editmemberPwd,
    editAllData

  // function datainput(){
  //   (editmemberName.value == '')? memberName : editmemberName.value,
  //   (editmemberGender.value == '')? memberGender : editmemberGender.value,
  //   (editmemberBirth.value == '')? memberBirth : editmemberBirth.value,
  //   (editmemberPhone.value == '') ? memberPhone : editmemberPhone.value,
  //   (editmemberAddress.value == '') ? memberAddress : editmemberAddress.value,
  // }

  useEffect(() => {
    memberData(userId)
  }, [])

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
    setmdata(data)
  }

  const dataDisplay = (
    <>
      <Form.Row>
        <Col sm={4}>
          <Form.Group controlId="displaymemberName">
            <Form.Label>會員名稱：</Form.Label>
            <Form.Text className="text-muted">{memberName}</Form.Text>
            {/* <Form.Control
              type="email"
              id="username"
              plaintext
              readOnly
              Value={memberName}
            /> */}
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="displaymemberGender">
            <Form.Label>性別：</Form.Label>
            <Form.Text className="text-muted">{memberGender}</Form.Text>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="displaymemberBirth">
            <Form.Label>出生日期：</Form.Label>
            <Form.Text className="text-muted">{memberBirth}</Form.Text>
          </Form.Group>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col sm={4}>
          <Form.Group controlId="displaymemberPhone">
            <Form.Label>連絡電話：</Form.Label>
            <Form.Text className="text-muted">{memberPhone}</Form.Text>
          </Form.Group>
        </Col>
        <Col sm={8}>
          <Form.Group controlId="displaymemberAddress">
            <Form.Label>連絡地址：</Form.Label>
            <Form.Text className="text-muted">{memberAddress}</Form.Text>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={4}>
          <Form.Group controlId="displaymemberMail">
            <Form.Label>信箱帳號：</Form.Label>
            <Form.Text className="text-muted">{memberMail}</Form.Text>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="displaymemberPwd">
            <Form.Label>登入密碼：</Form.Label>
            <Form.Text className="text-muted">已設置登入密碼</Form.Text>
          </Form.Group>
        </Col>
      </Form.Row>
      <Button
        className="EditBtn"
        variant="primary"
        type="button"
        onClick={() => {
          setedit(true)
        }}
      >
        編輯
      </Button>
    </>
  )

  const editDisplay = (
    <>
      <Form.Row>
        <Col sm={4}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>會員名稱：</Form.Label>
            <Form.Control
              ref={(input) => (editmemberName = input)}
              type="email"
              id="editmemberName"
              placeholder={memberName}
            />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>性別：</Form.Label>
            <Form.Control
              // ref={(input) => (editmemberGender = input)}
              id="editmemberGender"
              as="select"
              defaultValue={memberGender}
            >
              <option value="男">男</option>
              <option value="女">女</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>出生日期：</Form.Label>
            {brthdayedit ? (
              <>
                <Form.Control
                  type="date"
                  id="editmemberBirth"
                  ref={(input) => (editmemberBirth = input)}
                />
              </>
            ) : (
              <Form.Control
                type="text"
                value={memberBirth}
                onClick={() => {
                  setbrthdayedit(true)
                }}
              />
            )}
          </Form.Group>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col sm={4}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>連絡電話：</Form.Label>
            <Form.Control
              ref={(input) => (editmemberPhone = input)}
              type="text"
              placeholder={memberPhone}
              id="editmemberPhone"
            />
          </Form.Group>
        </Col>
        <Col sm={8}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>連絡地址：</Form.Label>
            <Form.Control
              ref={(input) => (editmemberAddress = input)}
              type="text"
              placeholder={memberAddress}
              id="editmemberAddress"
            />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col sm={4}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>信箱帳號：</Form.Label>
            <Form.Control type="email" disabled placeholder={memberMail} />
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>登入密碼：</Form.Label>
            <Form.Control
              ref={(input) => (editmemberPwd = input)}
              type="text"
              id="editmemberPwd"
              placeholder="如未需更換，則不用填寫"
            />
          </Form.Group>
        </Col>
      </Form.Row>

      <Button
        className="cancelBtn"
        variant="primary"
        type="button"
        onClick={() => {
          setedit(false)
        }}
      >
        取消
      </Button>
      <Button
        className="submitBtn"
        variant="primary"
        type="button"
        onClick={() => {
          editAllData = {
            memberName: editmemberName.value,
            memberGender: editmemberGender,
            memberBirth: editmemberBirth.value,
            memberPhone: editmemberPhone.value,
            memberAddress: editmemberAddress.value,
            memberPwd: editmemberPwd.value,
          }
          console.log(editAllData)
        }}
      >
        送出
      </Button>
    </>
  )

  return (
    <>
      <div className="contentBlock">
        <div className="contentTitle">會員資料</div>

        <Form>{edit ? editDisplay : dataDisplay}</Form>
      </div>
    </>
  )
}

export default UserContent
