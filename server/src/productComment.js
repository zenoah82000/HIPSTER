const express = require("express");
const db = require(__dirname + "/db_connect2");
const upload = require(__dirname + "/upload-module");
const router = express.Router();

//個人地圖列表
router.get("/productComment/:productId", async (req, res) => {
  const data = {
    commentData: [],
  };

  const sqlmyItemList =
    "SELECT `comments`.`commentId`, `comments`.`itemListId`,`comments`.`content`, `comments`.`star`, `comments`.`commentImg`,`comments`.`created_at`, `comments`.`updated_at`,`item_lists`.`productId`,`item_lists`.`orderId`,`item_lists`.`date`,`product`.`productName`,`product`.`productImg`, `item_lists`.`memberId` FROM `comments`LEFT JOIN `item_lists` ON `comments`.`itemListId` =`item_lists`.`itemListId` LEFT JOIN `product`ON `item_lists`.`productId` =`product`.`productId` LEFT JOIN `orderlist` ON `item_lists`.`orderId` =`orderlist`.`orderId` WHERE `item_lists`.`productId` = ?  AND `comments`.`content` IS NULL ORDER BY `comments`.`updated_at` DESC";

  const [r1] = await db.query(sqlmyItemList, [req.params.productId]);

  data.commentData = r1;

  res.json(data);
});

module.exports = router;
