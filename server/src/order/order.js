const express = require("express");
const db = require(__dirname + "/../db_connect2");
const upload = require(__dirname + "/../upload-module");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

//願望清單取得
router.get("/member/wishlist/:memberId", async (req, res) => {
  const memberId = req.params.memberId;
  const wishsql =
    "SELECT `wishlist`.`productId`,`product`.`productImg`,`product`.`productName`,`product`.`star`,`product`.`productPrice`,`product`.`productEndingDate`,`product`.`productAddress` FROM `wishlist` INNER JOIN `product` ON `wishlist`.`productId` = `product`.`productId`  WHERE `memberId` = ?";
  const [wishlist] = await db.query(wishsql, [memberId]);

  res.json(wishlist);
});
//願望清單新增

router.post("/member/wishlistAdd/:memberId", async (req, res) => {
  console.log("新增願望清單");
  console.log(req.body);
  const memberId = req.params.memberId;
  const productId = req.body.productId;
  const wishsql = "INSERT INTO `wishlist` (`memberId`,`productId`) VALUES(?,?)";
  const [wishlist] = await db.query(wishsql, [memberId, productId]);

  res.json(wishlist);
});
//願望清單刪除
router.delete("/member/wishlistDel/:memberId", async (req, res) => {
  console.log(req.body.memberId + "刪除願望清單");
  const memberId = req.params.memberId;
  const productId = req.body.productId;
  const wishsql =
    "DELETE FROM `wishlist` WHERE `memberId` = ? && `productId`=?";
  const [wishlist] = await db.query(wishsql, [memberId, productId]);

  res.json(wishlist);
});
//訂單列表
router.get("/member/order/:memberId", async (req, res) => {
  console.log("買家訂單請求");
  const memberId = req.params.memberId;
  //每一頁幾筆
  const perPage = 4;

  const data = {
    status: true,
    totalRows: 0, // 總筆數
    perPage: perPage, // 每一頁最多幾筆
    totalPages: 0, //總頁數
  };

  //取得總筆數
  const totalsql = "SELECT COUNT(1) num FROM `orderlist` WHERE `memberId` = ?";
  const [totalPages] = await db.query(totalsql, [memberId]);
  data.totalRows = totalPages[0].num;
  data.totalPages = Math.ceil(data.totalRows / perPage);
  const sqlorder = `SELECT * FROM orderlist WHERE memberId = ? ORDER BY created_at DESC`;

  const sqlorderlist =
    "SELECT `product`.`productName`,`product`.`productImg`,`item_lists`.`orderId`,`item_lists`.`productId`,`item_lists`.`date`,`item_lists`.`checkPrice`,`item_lists`.`checkQty`,`item_lists`.`checkSubtotal`,`item_lists`.`created_at`FROM `member` INNER JOIN `orderlist` ON `member`.`memberId` = `orderlist`.`memberId` INNER JOIN `item_lists` ON `orderlist`.`orderId`=`item_lists`.`orderId` INNER JOIN `product` ON `item_lists`.`productId` = `product`.`productId` WHERE `member`.`memberId`=?";

  const [r1] = await db.query(sqlorder, [memberId]);
  const [r2] = await db.query(sqlorderlist, [memberId]);
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
  const memberId = req.body.orderMemberId;
  const orderItems = req.body.orderItems;
  const email = req.body.email;
  const phone = req.body.phone;
  const contact = req.body.lastName + req.body.firstName;
  const sumdiscount = req.body.sumdiscount;
  const sumless = req.body.sumless;
  const discountcode = req.body.discountcode;
  const paymentType = req.body.paymentType;

  //取得總筆數
  let orderId;
  const total = "show table status like 'orderlist'";
  const [r1] = await db.query(total);
  let rows = (r1[0].Auto_increment + 1).toString();
  rows = rows.padStart(5, 0);
  //訂單編號
  orderId = "O" + year + month + date + rows;

  const addorderlist =
    "INSERT INTO `item_lists` (`orderId`,`memberId`,`productId`,`date`,`checkPrice`,`checkQty`,`checkSubtotal`) VALUES (?,?,?,?,?,?,?)";
  const addorder =
    "INSERT INTO `orderlist` (`orderId`,`memberId`,`coupon`,`discount`,`orderTotal`,`paymentTotal`,`paymentTypeId`,`contact`,`mobile`,`email`) VALUES(?,?,?,?,?,?,?,?,?,?)";

  //新增商品到訂單
  const [r2] = await db.query(addorder, [
    orderId,
    memberId,
    discountcode,
    sumless,
    req.body.total,
    sumdiscount,
    paymentType,
    contact,
    phone,
    email,
  ]);
  //訂單新增成功到評論
  for (let i = 0; i < orderItems.length; i++) {
    db.query(addorderlist, [
      orderId,
      memberId,
      orderItems[i].productId,
      orderItems[i].date,
      orderItems[i].checkPrice,
      orderItems[i].checkQty,
      orderItems[i].checkSubtotal,
    ]).then(([res]) => {
      const additemListId = "INSERT INTO `comments` (`itemListId`) VALUES(?)";
      return db.query(additemListId, [res.insertId]);
    });
  }
  console.log("訂單新增成功" + orderId);
  //有使用優惠券扣除優惠券
  if (discountcode != null && discountcode != "") {
    const coupon =
      "UPDATE `rel_member_coupon` SET `memberCouponNum`=0 WHERE `memberId`=? && discountCode =?";
    db.query(coupon, [memberId, discountcode]);
  }
  //訂單成功送出email
  console.log("送出電子郵件");
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
  let text = orderItems.map((item) => {
    return `<div style="display:flex;padding:0px 40px;">
        <div style="width: 150px;height: 100px;margin-right: 12px;">
          <img src="cid:${
            item.productId
          }"style="object-fit: cover; width: 100%;height: 100%;"/>
        </div>
        <div style="width: 60%;">
          <p style="font-size: 16px;color: black;font-weight: bolder;margin:0;">
            ${item.name}
          </p>
          <p style="font-size: 12px;color: black;margin:0;">
            數量:${item.checkQty}
          </p>
          <p style="font-size: 12px;color: black;margin:0;">
            價格:NT$${item.checkPrice}
          </p>
          <p style="font-size: 12px;color: black;margin:0;">
            日期:${item.date}
          </p>
        </div>
        <div style="width: 40%;text-align:right; line-height:100px">
          <p style="font-size:16px;margin:0;">小計:NT$${
            item.checkPrice * item.checkQty
          }</p>
        </div>
      </div>`;
  });
  var img = [];
  for (let i = 0; i < orderItems.length; i++) {
    let imgbox = {
      filename: orderItems[i].img.replace("\r\n", ""),
      path:
        __dirname +
        `/../../public/images/product/${orderItems[i].img.replace("\r\n", "")}`,
      cid: orderItems[i].productId.toString(),
    };
    img.push(imgbox);
  }
  var mailOptions = {
    from: '"Hipster文青地圖" <e24971234@gmail.com>',
    to: email,
    subject: "感謝您在本站消費",
    html: `<div style="width:80%">
    <p style="font-size: 16px;color: black;font-weight: bolder">訂單編號:${orderId}</p>
    <hr />
    <div>${text}</div>
    <hr/>
    <div className="cartdetail-footer">
      <div style="display: flex;justify-content: space-between;width:100%;">
        <p>總計:</p>
        <span>
          NT$${req.body.total}
        </span>
      </div>
      <div style="display: flex;justify-content: space-between;width:100%;">
        <p>折扣:</p>
        <span>
          -NT$${sumless}
        </span>
      </div>
      <div style="display: flex;justify-content: space-between;width:100%;">
        <p>結帳金額:</p>
        <span style=" font-weight: bold;font-size: 20px;color: #ff3400;">
          NT$${sumdiscount}
        </span>
      </div>
    </div>
  </div>`,
    attachments: img,
  };
  // 準備發送信件
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return console.log(err);
    }
  });
  const ordertime = "SELECT * FROM `orderlist` WHERE `orderListId`= ?";
  const [r3] = await db.query(ordertime, [r2.insertId]);
  //傳送回前端
  const buytime = r3[0].created_at.toLocaleString();
  let data = {
    orderId,
    buytime,
  };

  res.json(data);
});

module.exports = router;
