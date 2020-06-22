const express = require("express");
const db = require(__dirname + "/../db_connect2");
const upload = require(__dirname + "/../upload-module");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

//訂單列表
router.get("/member/order/:memberId", async (req, res) => {
  console.log("買家訂單請求");
  const data = {
    status: true,
    orderdetails: [],
    order: [],
  };
  const sqlorderlist =
    "SELECT `product`.`productName`,`item_lists`.`orderId`,`item_lists`.`date`,`item_lists`.`checkPrice`,`item_lists`.`checkQty`,`item_lists`.`checkSubtotal`,`item_lists`.`created_at`FROM `member` INNER JOIN `orderlist` ON `member`.`memberId` = `orderlist`.`memberId` INNER JOIN `item_lists` ON `orderlist`.`orderId`=`item_lists`.`orderId` INNER JOIN `product` ON `item_lists`.`productId` = `product`.`productId` WHERE `member`.`memberId`=?";

  const sqlorder = "SELECT * FROM `orderlist` WHERE `memberId` = ?";
  const [r1] = await db.query(sqlorder, [req.params.memberId]);
  const [r2] = await db.query(sqlorderlist, [req.params.memberId]);
  if (r1.length > 0 && r2.length > 0) {
    r1.forEach((item) => {
      item.created_at = item.created_at.toLocaleString();
    });
    r2.forEach((item) => {
      item.date = item.date.toLocaleDateString();
    });
    data.orderdetails = r2;
    data.order = r1;
  }

  res.json(data);
});

//訂單新增
router.post("/member/checkout", async (req, res) => {
  let year = new Date().getFullYear().toString();
  let month = new Date().getMonth().toString();
  let date = new Date().getDate().toString();
  const memberId = 2;
  const orderItems = req.body.orderItems;
  //取得總筆數
  let orderId;
  const total = "show table status like 'item_lists'";
  const [r1] = await db.query(total);
  //訂單編號
  orderId =
    "O" + year + month + date + (r1[0].Auto_increment + 1) + (r1[0].Rows + 1);

  const addorderlist =
    "INSERT INTO `item_lists` (`orderId`,`memberId`,`productId`,`date`,`checkPrice`,`checkQty`,`checkSubtotal`) VALUES (?,?,?,?,?,?,?)";
  const addorder =
    "INSERT INTO `orderlist` (`orderId`,`memberId`,`orderTotal`,`paymentTypeId`) VALUES(?,?,?,?)";

  //新增商品到訂單
  const [r2] = await db.query(addorder, [orderId, memberId, req.body.total, "2"]);
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
  res.json(orderId);
});

//完成訂單寄發EMAIL
router.get("/member/email", (req, res) => {
  console.log("發送電子郵件");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.ACCOUNT,
      clientId: process.env.CLINENTID,
      clientSecret: process.env.CLINENTSECRET,
      refreshToken: process.env.REFRESHTOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  var mailOptions = {
    from: '"hisper" <e24971234@gmail.com>',
    to: "kengp6@gmail.com",
    cc: "e24971234@gmail.com",
    subject: "感謝你在本站消費",
    text: "GGGGGGGGGGGGGG",
  };
  // 準備發送信件
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return console.log(err);
    }
    res.send("發送成功");
  });
});

module.exports = router;
