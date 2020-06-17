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
          <div className="tabcontainer couponactive">可使用</div>
          <div className="tabcontainer">已過期</div>
        </div>
      </div>
      <div className="tab-pane">
        <div className="table-head hidden-xs">
          <div class="row">
            <div class="col-sm-3">折扣券</div>
            <div class="col-sm-4">使用效期</div>
            <div class="col-sm-5">適用規則</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserCoupon
