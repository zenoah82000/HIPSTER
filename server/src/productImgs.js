const express = require("express");
const db = require( "./db_connect2");
const upload = require("./upload-module");
const router = express.Router();
const getProductInfo = async (req) => {   
    const sql = "SELECT * FROM `multiple_imgs` WHERE `productId` = ?"
    const [result] = await db.query(sql,[req.params.productId]);
    return result
};


router.get('/productImgs/:productId', async (req, res) => {
    const output = await getProductInfo(req);
    res.json(output);

})
module.exports = router





