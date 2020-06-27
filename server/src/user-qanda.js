const express = require('express')
const db = require('./db_connecthipster')
const upload = require(__dirname + '/upload-module');
const router = express.Router()

router.get('/member/qanda/:memberId', async (req, res) => {
    console.log("請求使用者問題資料");
    const data = {
        status: true,
        qalist: [],
      };
    const sqlqanda = "SELECT * FROM `qalist` WHERE `memberId`=? ORDER BY `created_at` DESC";

    const [r1] = await db.query(sqlqanda, [req.params.memberId]);

    if (r1.length > 0 ) {
        r1.forEach((item) => {
            item.created_at = item.created_at.toLocaleString('zh');
            item.updated_at = item.updated_at.toLocaleString('zh');
        });
        data.qalist = r1;
        res.json(data);
      }else{
        res.json({
            'status' :        404,
            'msg':            '此會員尚無建立此問題'
        })
      }    
});

// 會員新增QA
router.post("/member/addqa", async (req, res) => {
    // console.log(req.body)  
    const addqa =
      "INSERT INTO `qalist` (`memberId`,`question`, `productName`,`answer`) VALUES(?,?,?,?)";
    const [r2] = await db.query(addqa, [
      req.body.memberId,
      req.body.question,
      req.body.productName,
      req.body.answer,
    ]);
    
    // console.log(`優惠券新增成功，優惠券代碼 ${req.body.discountCode}`);
    res.send(`QA新增成功，
              memberId${req.body.memberId}/n
              question ${req.body.question}/n
              productName ${req.body.productName}/n
              answer ${req.body.answer}
              `);
  });

module.exports = router
