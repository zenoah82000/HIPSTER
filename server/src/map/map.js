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
    "SELECT `product`.`productId`,`product`.`productAddress`,`product`.`productName`,`product`.`productImg`,`product`.`categoryId`,`product`.`lat`,`product`.`log`,`product`.`category`,`product`.`productPrice`,`category`.`categoryName` FROM`product`LEFT JOIN `category` ON  `product`.`categoryId` =`category`.`categoryId`";

  const sqlcafelist = "SELECT * FROM `map_cafe`";

  const [r1] = await db.query(sqlproductlist);
  const [r2] = await db.query(sqlcafelist);

  data.productlist = r1;
  data.cafelist = r2;

  res.json(data);
});

module.exports = router;
