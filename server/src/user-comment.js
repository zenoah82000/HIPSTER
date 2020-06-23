const express = require("express");
const db = require(__dirname + "/db_connect2");
const upload = require(__dirname + "/upload-module");
const router = express.Router();

//訂單列表
router.get("/comments/:memberId", async (req, res) => {
  const data = {
    comment: [],
    notcomment: [],
  };

  const sqlcommentlist =
    "SELECT `comments`.`commentId`, `comments`.`memberId`,`comments`.`content`, `comments`.`rating`, `comments`.`itemId`, `comments`.`created_at`, `comments`.`updated_at`,`item_lists`.`productId`,`orderlist`.`memberId`,`item_lists`.`orderId`,`product`.`productName`,`item_lists`.`itemListId`FROM `comments`LEFT JOIN `item_lists` ON `comments`.`itemId` =`item_lists`.`productId` LEFT JOIN `product`ON `comments`.`itemId` =`product`.`productId` LEFT JOIN `orderlist` ON `item_lists`.`orderId` =`orderlist`.`orderId` WHERE `comments`.`memberId` = ?";

  const sqlnotcommentlist = "SELECT * FROM `item_lists`";

  const [r1] = await db.query(sqlcommentlist, [req.params.memberId]);
  const [r2] = await db.query(sqlnotcommentlist, [req.params.memberId]);

  data.comment = r1;
  data.notcomment = r2;

  res.json(data);
});

module.exports = router;
