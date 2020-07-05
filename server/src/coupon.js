const express = require('express')
const db = require(__dirname + "/db_connect2");
const upload = require(__dirname + '/upload-module');
const router = express.Router()

//買家優惠券請求
router.get('/member/coupon', async (req, res) => {
    console.log("買家優惠券請求");
    const data = {
        status: true,
        coupon: [],
      };
    const sqlcoupon = "SELECT `coupon`.`couponId`, `coupon`.`discountName`, `coupon`.`discountCode`, `coupon`.`discountPercent`, `coupon`.`startTime`, `coupon`.`endTime`, `coupon`.`created_at`, `coupon`.`updated_at`,`rel_member_coupon`.`id`,`rel_member_coupon`.`memberId`,`rel_member_coupon`.`memberCouponNum` FROM `coupon` INNER JOIN `rel_member_coupon` ON `coupon`.`discountCode` = `rel_member_coupon`.`discountCode` ORDER BY `couponId`,`memberId` ASC";

    const [r1] = await db.query(sqlcoupon);

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

//所有優惠券請求
router.get('/all/coupon', async (req, res) => {
  console.log("所有優惠券請求");
  const data = {
      status: true,
      coupon: [],
    };
  const sqlcoupon = "SELECT * FROM `coupon` WHERE 1";

  const [r1] = await db.query(sqlcoupon);

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
          'msg':            '尚無建立優惠券'
      })
    }    
});

//會員新增優惠券
router.post("/member/addcoupon", async (req, res) => {
      
    // const addcoupon =
    //   "INSERT INTO `rel_member_coupon` (`discountCode`, `memberId`, `memberCouponNum`) VALUES ('"+
    //   req.body.discountCode +"','"+
    //   req.body.memberId + "','1')";
    // // const [r2] = await db.query(addcoupon, [
    // //   req.body.discountCode,
    // //   req.body.memberId,
    // //   "1",
    // // ]);

    // console.log(addcoupon) 

    // const result = await db.query(addcoupon)
    // res.json(`優惠券新增成功，會員${req.body.memberId}優惠券代碼 ${req.body.discountCode}`);

    const output = {
      status: false,
      discountCode: req.body.discountCode,
      memberId: req.body.memberId,
      memberCouponNum: req.body.memberCouponNum,
      rows: []
    }
    const addcouponsql =
      "INSERT INTO `rel_member_coupon` (`discountCode`,`memberId`, `memberCouponNum`) VALUES(?,?,1)";
    db.query(addcouponsql, [
      req.body.discountCode,
      req.body.memberId,
      req.body.memberCouponNum,
    ])
    .then(([r])=>{
      output.results = r;
      if(r.affectedRows && r.insertId){
        output.status = true; 
      }
      res.json(output);
    })
   
  });

module.exports = router





