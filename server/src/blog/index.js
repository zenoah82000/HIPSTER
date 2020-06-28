const express = require('express')
const moment = require('moment-timezone')
// const multer = require('multer')
const upload = require('./upload-module')
const router = express.Router()
const fs =require('fs')

const db = require(__dirname + './../db_connect2')

//取得文章資料
const getBlogList = async (req) => {
  const output = {          
    rows: [],
  }
  
  const sql = "SELECT * FROM article ORDER BY articleId ASC"
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

//新增圖片到CKEditor
router.post('/blogAddImg', upload.single('upload'), (req, res)=>{
  console.log('req.file',req.file)
  
  res.json({
    uploaded: true,
    url: 'http://localhost:5000/images/blog/'+req.file.filename
});
})

//新增文章
router.post('/blogAdd', upload.none(), async (req, res)=>{
  console.log(req.body)
  const output ={
    success: false,
    error:'',
    status: 0,
    body: req.body,
  }
  const sql = "INSERT INTO `article`(`articleTitle`,`articleContent`,`categoryId`,`articleImg`) VALUES(?,?,?,?)"


  const [r] = await db.query(sql , [
    req.body.articleTitle,
    req.body.articleContent,
    req.body.categoryId,
    req.body.articleImg,
    ])
  if (r) {
      output.result = r;
      output.success = true;
      console.log('result:', r);
    }
  res.json(output);
})

module.exports = router
