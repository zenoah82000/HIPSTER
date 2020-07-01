const express = require("express");
const db = require( "./db_connect2");
const upload = require("./upload-module");
const router = express.Router();
const getDataList = async (req) => {   
    const sql = "SELECT `product`.`productId`,`product`.`productImg`,`product`.`productId`,`product`.`productName`,`product`.`productPrice`,`product`.`productAmount`,`product`.`categoryId`,`product`.`productContent`,`product`.`productAddress`,`product`.`locationId`,`product`.`productEndingDate`,`product`.`created_at`,`location_area`.`locationName`,`location_parent`.`locationName` AS `loactionParentName`,`category`.`categoryName` FROM `product` LEFT JOIN `location_area` ON `product`.`locationId` = `location_area`.`locationId` LEFT JOIN `location_area` AS `location_parent` ON `location_area`.`locationParentId` = `location_parent`.`locationId`LEFT JOIN `category`ON `product`.`categoryId` = `category`.`categoryId`"
    const [result] = await db.query(sql);
    return result
};


router.get('/productList', async (req, res) => {
    const output = await getDataList(req);
    res.json(output);

})
module.exports = router





