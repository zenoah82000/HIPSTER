const express = require("express");
const db = require( "./db_connect2");
const upload = require("./upload-module");
const router = express.Router();
const getProductInfo = async (req) => {   
    const sql = "SELECT * FROM `product` WHERE `productId` = ?"
    const [result] = await db.query(sql,[req.params.productId]);
    return result
};


router.get('/product/:productId', async (req, res) => {
    const output = await getProductInfo(req);
    res.json(output);

})
module.exports = router





