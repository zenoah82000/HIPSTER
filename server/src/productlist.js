const express = require("express");
const db = require( "./db_connect2");
const upload = require("./upload-module");
const router = express.Router();
const getDataList = async (req) => {   
    const sql = "SELECT * FROM `product`"
    const [result] = await db.query(sql);
    return result
};


router.get('/productList', async (req, res) => {
    const output = await getDataList(req);
    res.json(output);

})
module.exports = router





