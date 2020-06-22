const express = require("express");
const db = require(__dirname + "/../db_connect2");
const upload = require(__dirname + "/../upload-module");
const router = express.Router();

//地圖列表
router.get("/map", async (req, res) => {
  //   console.log("買家訂單請求");
  const data = {
    productlist: [],
    cafelist: [],
  };
  const sqlproductlist =
    "SELECT `map_product`.`mapId`, `map_product`.`productId`,`product`.`companyId`, `map_product`.`mapParentId`, `map_product`.`created_at`, `map_product`.`updated_at`,`product`.`productId`,`product`.`productAddress`,`product`.`productName`,`product`.`categoryId`,`company`.`companyId`,`category`.`categoryName` FROM `map_product` LEFT JOIN `product` ON  `map_product`.`productId` =`product`.`productId`LEFT JOIN `company` ON  `product`.`companyId` =`company`.`companyId` LEFT JOIN `category` ON  `product`.`categoryId` =`category`.`categoryId`";

  const sqlcafelist = "SELECT * FROM `map_cafe`";

  const [r1] = await db.query(sqlproductlist);
  const [r2] = await db.query(sqlcafelist);

  data.productlist = r1;
  data.cafelist = r2;
  //   if (r1.length > 0 && r2.length > 0) {

  //     r1.forEach((item) => {
  //       item.created_at = item.created_at.toLocaleString();
  //     });
  //     r2.forEach((item) => {
  //       item.date = item.date.toLocaleDateString();
  //     });
  //     data.orderdetails = r2;
  //     data.order = r1;
  //   }

  res.json(data);
});

module.exports = router;
