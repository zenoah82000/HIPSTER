const express = require('express')
// const User = require(__dirname + '/users-sql')


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
  const Sql = "SELECT `productId`,`productImg`,`productName`,`productAddress`,`rating` FROM `product` INNER JOIN `comments` ON `productId`=`itemId` ORDER BY `rating` DESC LIMIT 3 "
  const [r1] = await db.query(Sql);
  res.json(r1)

})


// 首頁>中間banner商品
  router.post('/homeslickbannerdata', async (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)
  const productId = 67;  //商品id
  const Sql = "SELECT `product`.`productId`,`productName`,`productContent`,`productAddress`,`productImgs` FROM `product` LEFT JOIN `multiple_imgs` ON `product`.`productId` = `multiple_imgs`.`productId` WHERE `product`.`productId` =?  LIMIT 1"
  const [r1] = await db.query(Sql,productId);
  res.json(r1)

})
// 首頁>中間banner商品-多圖
  router.post('/homeslickbannerimgdata', async (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)
  const productId = 67;  //商品id
  const Sql = "SELECT `product`.`productId`,`productName`,`productContent`,`productAddress`,`productImgs` FROM `product` LEFT JOIN `multiple_imgs` ON `product`.`productId` = `multiple_imgs`.`productId` WHERE `product`.`productId` =?  "
  const [r1] = await db.query(Sql,productId);
  res.json(r1)

})

// 首頁>即將結束商品
  router.post('/homeproductendlist', async (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)
  const Sql = "SELECT `productId`,`productImg`,`productName`,`productPrice`,`productAddress`,`productEndingDate` FROM `product` ORDER BY `productEndingDate` LIMIT 5 "
  const [r1] = await db.query(Sql);
  res.json(r1)

})


// 首頁>最新文章
  router.post('/homearticleslist', async (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)
  const Sql = "SELECT `articleId`,`article`.`memberId`,`member`.`memberName` ,`articleTitle`,`articleContent`,`img`,`article`.`created_at` ,`member`.`memberImg` FROM `article` LEFT JOIN `member` ON `article`.`memberId` = `member`.`memberId` ORDER BY `created_at` DESC LIMIT 6  "

  const [r1] = await db.query(Sql);
  res.json(r1)
})


// 首頁>忘記密碼
  router.post('/forgetpwdinput', async (req, res, next) => {
  // console.log(req.body.forgetpwdmail)
  const mail = req.body.forgetpwdmail
  const Sql = `SELECT * FROM member WHERE  memberMail=? `
  const [r1] = await db.query(Sql,mail);

  const mailstate = r1.length?true:false

  let memberId 
  mailstate?memberId = [r1][0][0].memberId:memberId = ''

// 亂數-數字產生
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
  const num = makerandomletter(2)+randomusefloor(1,999)





  const output = {
    success: mailstate,
    id: memberId
  };
  
  console.log(mailstate)

  res.json(output)
})






module.exports = router;
