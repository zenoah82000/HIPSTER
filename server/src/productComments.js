const express = require("express");
const db = require(__dirname + "/db_connect2");
const upload = require(__dirname + "/upload-module");
const router = express.Router();

const getProductComments = async (req) => {
  const sql =
    "SELECT `comments`.`commentId`, `comments`.`itemListId`,`comments`.`content`, `comments`.`star`, `comments`.`commentImg`,`comments`.`created_at`, `comments`.`updated_at`,`item_lists`.`productId`,`item_lists`.`orderId`,`item_lists`.`date`,`product`.`productName`,`product`.`productImg`, `item_lists`.`memberId`,`member`.`memberName`,`member`.`memberImg` FROM `comments`LEFT JOIN `item_lists` ON `comments`.`itemListId` =`item_lists`.`itemListId` LEFT JOIN `product`ON `item_lists`.`productId` =`product`.`productId` LEFT JOIN `orderlist` ON `item_lists`.`orderId` =`orderlist`.`orderId` LEFT JOIN `member` ON `item_lists`.`memberId` = `member`.`memberId` WHERE `item_lists`.`productId` = ?  AND `comments`.`content` IS NOT NULL ORDER BY `comments`.`updated_at` DESC";
  const [result] = await db.query(sql, [req.params.productId]);
  return result;
};

router.get("/productComments/:productId", async (req, res) => {
  const output = await getProductComments(req);
  res.json(output);
});

module.exports = router;
