const express = require("express");
const db = require(__dirname + "/../db_connect2");
const upload = require(__dirname + "/../upload-module");
const router = express.Router();


//訂單列表
router.get("/memberuser/comment/:memberId", async (req, res) => {
  console.log("買家訂單請求");
  const data = {
    status: true,
    orderdetails: [],
    order: [],
  };

  const sqlcommentlist =
  "SELECT `comments`.`commentId`, `comments`.`memberId`,`comments`.`content`,  `comments`.`rating`, `comments`.`itemId`, `comments`.`created_at`, `comments`.`updated_at`,`item_lists`.`productId`, `comments`.`adminReply`,`orderlist`.`memberId`,`item_lists`.`orderId`,`product`.`productName`,`item_lists`.`itemListId`
  FROM `comments`
  LEFT JOIN `item_lists` 
  ON  `comments`.`itemId` =`item_lists`.`productId`
  LEFT JOIN `product` 
  ON  `comments`.`itemId` =`product`.`productId`
  LEFT JOIN `orderlist` 
  ON  `item_lists`.`orderId` =`orderlist`.`orderId` 
  WHERE `memberId` = ? ";

  const sqlnotcommentlist = "SELECT * FROM `itemlist` WHERE `memberId` = ?";

  const [r1] = await db.query(sqlcommentlist, [req.params.memberId]);
  const [r2] = await db.query(sqlnotcommentlist, [req.params.memberId]);

  res.json(data);
});

//評論新增
router.post("/memberuser/comment/:memberId", async (req, res) => {
  const memberId = 2;
  const orderItems = req.body.orderItems;
 
  //取得總筆數
  let orderId;
  const total = "show table status like 'item_lists'";
  const [r1] = await db.query(total);
  let rows = (r1[0].Rows + 1).toString();
  rows = rows.padStart(5, 0);
  //訂單編號
  orderId = "O" + year + month + date + rows;


  const addcooment =
    "INSERT INTO `item_lists` (`orderId`,`memberId`,`productId`,`date`,`checkPrice`,`checkQty`,`checkSubtotal`) VALUES (?,?,?,?,?,?,?)";
  const addorder =
    "INSERT INTO `orderlist` (`orderId`,`memberId`,`orderTotal`,`paymentTypeId`) VALUES(?,?,?,?)";

  //新增評論到資料庫
  const [r2] = await db.query(addorder, [
    orderId,
    memberId,
    req.body.total,
    "2",
  ]);
  for (let i = 0; i < orderItems.length; i++) {
    db.query(addorderlist, [
      orderId,
      memberId,
      orderItems[i].productId,
      orderItems[i].date,
      orderItems[i].checkPrice,
      orderItems[i].checkQty,
      orderItems[i].checkSubtotal,
    ]);
  }
  console.log("訂單新增成功" + orderId);
 


//完成訂單寄發EMAIL

module.exports = router;
