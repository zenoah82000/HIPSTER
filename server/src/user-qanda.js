const express = require('express')
const db = require('./db_connecthipster')
const upload = require(__dirname + '/upload-module');
const router = express.Router()

router.get('/member/qanda', async (req, res) => {
    console.log("請求使用者問與答");
    const data = {
        status: true,
        qalist: [],
      };
    const sqlqanda = "SELECT * FROM `qalist` ORDER BY `created_at` DESC";

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

router.get('/product/qanda/:productId', async (req, res) => {
  console.log("請求產品問與答");
  const data = {
      status: true,
      qalist: [],
    };
  const sqlqanda = "SELECT `product`.`productId`, `product`.`productImg`, `product`.`productName`, `product`.`productPrice`, `product`.`productAmount`, `product`.`categoryId`, `product`.`mapId`, `product`.`productAddress`, `product`.`productContent`, `product`.`productEndingDate`, `product`.`companyId`, `qalist`.`id`, `qalist`.`memberId`, `qalist`.`question`, `qalist`.`productName`, `qalist`.`answer`,`qalist`.`created_at` FROM `product` INNER JOIN `qalist` ON `product`.`productName` = `qalist`.`productName` WHERE `product`.`productId`= ? ORDER BY `qalist`.`created_at`";

  const [r1] = await db.query(sqlqanda, [req.params.productId]);

  if (r1.length > 0 ) {
      r1.forEach((item) => {
          item.created_at = item.created_at.toLocaleString('zh');
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
    const output = {
      status: false,
      memberId: req.body.memberId,
      question: req.body.question,
      productName: req.body.productName,
      answer: req.body.answer,
      rows: []
    }
    const addqasql =
      "INSERT INTO `qalist` (`memberId`,`question`, `productName`,`answer`) VALUES(?,?,?,?)";
    db.query(addqasql, [
      req.body.memberId,
      req.body.question,
      req.body.productName,
      req.body.answer,
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