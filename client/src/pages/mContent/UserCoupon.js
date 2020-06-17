import React from 'react'
import '../../styles/mContent/usercoupon.scss'
function UserCoupon() {
  return (
    <>
      <div className="usercontainer">
        <h2 className="usertitle">我的優惠券</h2>
        <div className="input-group mb-3 mt-4 input-container mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="請輸入優惠碼"
          />
          <div className="input-group-append">
            <button
              className="btn buttonstyle"
              type="submit"
              id="button-addon2"
            >
              兌換
            </button>
          </div>
        </div>
        <div className="d-flex coupon-bar border-bottom">
          <div className="tabcontainer active">可使用</div>
          <div className="tabcontainer">已過期</div>
        </div>
        <table class="table">
          <thead>
            <tr className="table-active">
              <th scope="col">折價券</th>
              <th scope="col">使用日期</th>
              <th scope="col">適用規則</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UserCoupon
