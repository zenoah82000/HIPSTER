const express = require("express");
const db = require(__dirname + "/db_connect2");
const upload = require(__dirname + "/upload-module");
const router = express.Router();

//個人地圖列表
router.get("/mymap/:memberId", async (req, res) => {
  const data = {
    myItemList: [],
  };

  const sqlmyItemList =
    "SELECT `item_lists`.`itemListId`, `item_lists`.`orderId`, `item_lists`.`memberId`, `item_lists`.`date`, `product`.`productName`,`product`.`productAddress`,`product`.`lat`,`product`.`log`,`comments`.`commentImg`,`comments`.`content` FROM `item_lists` LEFT JOIN `product`ON `item_lists`.`productId` =`product`.`productId`  LEFT JOIN `comments` ON `item_lists`.`itemListId` = `comments`.`itemListId` WHERE `item_lists`.`memberId` = ?  and  `comments`.`commentImg` is not null ORDER BY `item_lists`.`date` DESC ";

  const [r1] = await db.query(sqlmyItemList, [req.params.memberId]);

  data.myItemList = r1;

  res.json(data);
});

module.exports = router;
