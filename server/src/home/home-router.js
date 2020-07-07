const express = require('express')
// const User = require(__dirname + '/users-sql')
const nodemailer = require("nodemailer");
require("dotenv").config();

// mysql2 async-await用的
const db = require(__dirname + './../db_connect2')

const router = express.Router()

// 執行sql用的async-await的函式
// sql 執行用的sql
// res 回應
// method restful的方法，預設為get
// multirow 是否為多資料回傳，預設為是
// instance 物件實體，預設為空物件
async function executeSQL(
  sql,
  res,
  method = 'get',
  multirows = true,
  instance = {}
) {
  try {
    const [rows, fields] = await db.promisePool.query(sql)

    switch (method) {
      case 'post': {
        // 仿照json-server的回傳
        const insertId = { id: rows.insertId }
        // 合併id值
        const result = { ...instance, ...insertId }
        //回傳
        res.status(200).json(result)
        break
      }
      case 'put': {
        // 仿照json-server的回傳，有更新到會回傳單一值，沒找到會回到空的物件字串
        // console.log(rows.affectedRows)
        let result = {}
        if (rows.affectedRows) result = { ...instance }
        //回傳
        res.status(200).json(result)
        break
      }
      case 'delete': {
        // 仿照json-server的回傳
        res.status(200).json({})
        break
      }
      case 'get':
      default:
        {
          if (multirows) {
            res.status(200).json({
              users: rows,
            })
          } else {
            // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
            let result = {}
            if (rows.length) result = rows[0]
            res.status(200).json(result)
          }
        }
        break
    }
  } catch (error) {
    // 錯誤處理
    console.log(error)

    // 顯示錯誤於json字串
    res.status(200).json({
      message: error,
    })
  }
}



// 以下為路由


// 首頁>精選商品
  router.post('/homeproductfeaturedlist', async (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)
  // const Sql = "SELECT `product`.`productId`,`product`.`productImg`,`product`.`productName`,`product`.`productAddress`,`comments`.`star` FROM `product` INNER JOIN `item_lists` ON `product`.`productId`=`item_lists`.`productId` INNER JOIN `comments` ON `comments`.`itemListId`=`item_lists`.`itemListId`  ORDER BY `star` DESC LIMIT 3"
  const Sql = "SELECT * FROM `product` ORDER BY `star` DESC LIMIT 3"
  const [r1] = await db.query(Sql);
  res.json(r1)

})


// 首頁>中間banner商品
  router.post('/homeslickbannerdata', async (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)
  const productId = 3;  //商品id
  const Sql = "SELECT `product`.`productId`,`productName`,`productContent`,`productAddress`,`productImgs` FROM `product` LEFT JOIN `multiple_imgs` ON `product`.`productId` = `multiple_imgs`.`productId` WHERE `product`.`productId` =?  LIMIT 1"
  const [r1] = await db.query(Sql,productId);
  res.json(r1)

})
// 首頁>中間banner商品-多圖
  router.post('/homeslickbannerimgdata', async (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)
  const productId = 3;  //商品id
  const Sql = "SELECT `product`.`productId`,`productName`,`productContent`,`productAddress`,`productImgs` FROM `product` LEFT JOIN `multiple_imgs` ON `product`.`productId` = `multiple_imgs`.`productId` WHERE `product`.`productId` =?  "
  const [r1] = await db.query(Sql,productId);
  res.json(r1)

})

// 首頁>即將結束商品
  router.post('/homeproductendlist', async (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)
  const Sql = "SELECT * FROM `product` ORDER BY `productEndingDate` LIMIT 5 "
  const [r1] = await db.query(Sql);
  res.json(r1)

})


// 首頁>最新文章
  router.post('/homearticleslist', async (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)
  const Sql = "SELECT `articleId`,`article`.`memberId`,`member`.`memberName` ,`articleTitle`,`articleContent`,`articleImg`,`article`.`created_at` ,`member`.`memberImg` FROM `article` LEFT JOIN `member` ON `article`.`memberId` = `member`.`memberId` ORDER BY `created_at` DESC LIMIT 6  "

  const [r1] = await db.query(Sql);
  res.json(r1)
})


// 首頁>忘記密碼
  router.post('/forgetpwdinput', async (req, res, next) => {
  // console.log(req.body.forgetpwdmail)
  const mail = req.body.forgetpwdmail  //傳回信箱
  const Sql = `SELECT * FROM member WHERE  memberMail=? `
  const [r1] = await db.query(Sql,mail);
  
  console.log('mail',mail)
  const mailstate = r1.length?true:false  //判斷是否有該帳號
  let memberId //先定義會員id

  
// 亂數-數字產生========================================================
  function randomusefloor(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
  // 亂數-英文產生
  function makerandomletter(max) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < max; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  //======================================================================
  const num = makerandomletter(2)+randomusefloor(1,999)  //產生亂數
  // mailstate?memberId = [r1][0][0].memberId:memberId = ''

//先定義寫入驗證碼sql
  const Sqlcodeinput = "UPDATE `member` SET `code`=? WHERE `memberId`=?" 

  //如果有帳號>寫入code
  if(mailstate==true){
    memberId = [r1][0][0].memberId 
    memberMail=[r1][0][0].memberMail 
    //執行寫入code
    const [r2] = await db.query(Sqlcodeinput,[num,memberId]);

    //訂單成功送出email
    // console.log("送出電子郵件");
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   secure: true,
    //   auth: {
    //     type: "OAuth2",
    //     user: process.env.ACCOUNT,
    //     clientId: process.env.CLINENTID,
    //     clientSecret: process.env.CLINENTSECRET,
    //     refreshToken: process.env.REFRESHTOKEN,
    //   },
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    // });

    // var mailOptions = {
    //   from: '"Hipster文青地圖" <e24971234@gmail.com>',
    //   to: memberMail,
    //   subject: "重製密碼信件",
    //   html: "<p>驗證碼:" + num + "</p><br/><p>請點擊下列網址輸入上述驗證碼進行密碼重製：http://localhost:3000/forgetpwd/"+memberId+"</p>"
    // };
    // // 準備發送信件
    // transporter.sendMail(mailOptions, function (err, info) {
    //   if (err) {
    //     return console.log(err);
    //   }
    // });



  }else{
    memberId = ''
  }

  const output = {
    success: mailstate,
    id:memberId
  };
  
  // console.log(mailstate,memberId,num)

  res.json(output)
})




//忘記密碼頁-檢查驗證碼
router.post('/codechecking', async (req, res, next) => {
  
  const memberid=req.body.memberid
  const code = req.body.code
  const Sql = "SELECT * FROM member WHERE  memberId=?  && code=? "

  const [r1] = await db.query(Sql,[memberid,code]);
  const codestate = r1.length?true:false  //判斷輸入code&id是否有該帳號
  // console.log(codestate)

  res.json(codestate)
})

//忘記密碼頁-重設密碼
router.post('/pwdchanging', async (req, res, next) => {
  // console.log(req.body)
  const memberid=req.body.memberid
  const pwd = req.body.pwd
  const Sql = "UPDATE `member` SET `memberPwd`=? WHERE `memberId`=? "

  const [r1] = await db.query(Sql,[pwd,memberid]);



  res.json(r1)
})





module.exports = router;
