const express = require("express");
const db = require(__dirname + "/db_connect2");
const upload = require(__dirname + "/upload-module");
const router = express.Router();

//訂單列表
router.get("/mymap/:memberId", async (req, res) => {
  const data = {
   myItemList: [],
  };



  const sqlmyItemList = "SELECT `item_lists`.`itemListId`, `item_lists`.`orderId`, `item_lists`.`memberId`, `item_lists`.`productId`, `item_lists`.`date`, `item_lists`.`checkPrice`, `item_lists`.`checkQty`, `item_lists`.`checkSubtotal`, `item_lists`.`created_at`, `item_lists`.`updated_at`,`product`.`productName`,`product`.`lat`,`product`.`log` FROM `item_lists` LEFT JOIN `product`ON `item_lists`.`productId` =`product`.`productId`  WHERE `item_lists`.`memberId` = ? ORDER BY `item_lists`.`date` DESC ";

 
  const [r1] = await db.query(sqlmyItemList, [req.params.memberId]);


  data.myItemList = r1;

  res.json(data);
});

module.exports = router;