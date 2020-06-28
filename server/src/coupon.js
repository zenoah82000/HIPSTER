const express = require('express')
const db = require('./db_connecthipster')
const upload = require(__dirname + '/upload-module');
const router = express.Router()

router.get('/member/coupon/:memberId', async (req, res) => {
    console.log("買家優惠券請求");
    const data = {
        status: true,
        coupon: [],
      };
    const sqlcoupon = "SELECT `coupon`.`couponId`, `coupon`.`discountName`, `coupon`.`discountCode`, `coupon`.`discountPercent`, `coupon`.`startTime`, `coupon`.`endTime`, `coupon`.`created_at`, `coupon`.`updated_at`,`rel_member_coupon`.`id`,`rel_member_coupon`.`memberId`,`rel_member_coupon`.`memberCouponNum` FROM `coupon` INNER JOIN `rel_member_coupon` ON `coupon`.`discountCode` = `rel_member_coupon`.`discountCode` WHERE `rel_member_coupon`.`memberId`=? ORDER BY `couponId`,`memberId` ASC";

    const [r1] = await db.query(sqlcoupon, [req.params.memberId]);

    if (r1.length > 0 ) {
        r1.forEach((item) => {
          item.startTime = item.startTime.toLocaleString('zh');
          item.endTime = item.endTime.toLocaleString('zh');
          item.created_at = item.created_at.toLocaleString('zh');
          item.updated_at = item.updated_at.toLocaleString('zh');
        });
        data.coupon = r1;
        res.json(data);
      }else{
        res.json({
            'status' :        404,
            'msg':            '此會員尚無建立優惠券'
        })
      }    
});

//會員新增優惠券
router.post("/member/addcoupon", async (req, res) => {
    // console.log(req.body)  
    const addcoupon =
      "INSERT INTO `rel_member_coupon` (`discountCode`, `memberId`, `memberCouponNum`) VALUES(?,?,?)";
    const [r2] = await db.query(addcoupon, [
      req.body.discountCode,
      req.body.memberId,
      "1",
    ]);
    
    // console.log(`優惠券新增成功，優惠券代碼 ${req.body.discountCode}`);
    res.send(`優惠券新增成功，會員${req.body.memberId}優惠券代碼 ${req.body.discountCode}`);
  });

module.exports = router





