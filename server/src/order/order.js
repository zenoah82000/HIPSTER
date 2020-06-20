const express = require("express");
const db = require(__dirname + "/../db_connect2");
const upload = require(__dirname + "/../upload-module");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

//訂單列表
router.get("/oreder/:memberId", async (req, res) => {
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
router.post("/member/checkout", (req, res) => {
  console.log("訂單新增", req.body);
});

//完成訂單寄發EMAIL
router.post("/member/email", (req, res) => {
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
    subject: "(測試寄信)訂閱好康秘密報報報...馬仔",
    text: "2223",
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
