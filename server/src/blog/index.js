const express = require('express')
const moment = require('moment-timezone')
// const multer = require('multer')
const upload = require(__dirname + './../upload-module');
const router = express.Router()
const fs =require('fs')

const db = require(__dirname + './../db_connect2')

//取得文章資料
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

//新增文章圖片
router.post('/blogAdd', upload.none(), (req, res)=>{
  // console.log(req.body)
  
//   res.json({
//     uploaded: true,
//     url: "http://127.0.0.1/image001.jpg",
//     filename: req.file.filename,
//     body: req.body
// });
  const output ={
    success: false,
    error:'',
    status: 0,
    body: req.body,
  }
  const sql = "INSERT INTO `article`(`articleTitle`,`articleContent`,`categoryId`) VALUES(?,?,?)";

  db.query(sql , [
    req.body.articleTitle,
    req.body.articleContent,
    req.body.categoryId,
    ])
  .then(r=>{
      output.result = r;
      output.success = true;
      console.log('result:', r);
      res.json(output);
  })
  .catch(error=>{
      return res.json(output);
  })

})

module.exports = router
