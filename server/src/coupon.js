const express = require('express')
const db = require('./db_connect2')
// const upload =require(__dirname+'/../upload-module')
const upload = require(__dirname + '/upload-module');
const router = express.Router()

const getDataList = async (req) => {   
    const sql = `SELECT * FROM coupon WHERE 1 `
    const [r2] = await db.query(sql);
    return r2
};


router.get('/coupon', async (req, res) => {
    const output = await getDataList(req);
    res.json(output);

})
module.exports = router





