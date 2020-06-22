const express = require('express')
const moment = require('moment-timezone')
const multer = require('multer')
const router = express.Router()

const db = require(__dirname + './../db_connect2')

const getBlogList = async (req) => {
  const output = {          
    rows: [],
  }
  
  const sql = `SELECT * FROM article ORDER BY articleId ASC`
  const [r] = await db.query(sql)
  if (r) output.rows = r
  for (let i of r) {
    i.created_at = moment(i.created_at).format('YYYY-MM-DD')
    i.updated_at = moment(i.updated_at).format('YYYY-MM-DD')
  }
  return output
}

router.get('/blog', async (req, res) => {
  const output = await getBlogList(req)
  
  res.json(output)
})

module.exports = router
