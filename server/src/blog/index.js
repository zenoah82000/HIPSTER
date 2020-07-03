const express = require('express')
const moment = require('moment-timezone')
const upload = require('./upload-module')
const router = express.Router()

const db = require(__dirname + './../db_connect2')

//取得文章資料
const getBlogList = async (req) => {
  const output = { 
    success: false,         
    rows: [],
  }
  
  const sql = "SELECT `article`.`articleId`,`article`.`memberId`,`article`.`articleTitle`,`article`.`categoryId`,`article`.`articleContent`,`article`.`articleImg`,`article`.`created_at`,`article`.`updated_at`,`member`.`memberId`,`member`.`memberName`,`member`.`memberImg` FROM `article` LEFT JOIN `member` ON `article`.`memberId` = `member`.`memberId` ORDER BY articleId ASC"
  const [r] = await db.query(sql)
  if (r) {
    output.success = true;
    output.rows = r;
  }  
  for (let i of r) {
    //設定時間格式
    i.created_at = moment(i.created_at).format('MM/DD');
    // i.updated_at = moment(i.updated_at).format('MM月DD日');
  }
  return output
}

//http://localhost:5000/blog
router.get('/blog', async (req, res) => {
  const output = await getBlogList(req)  
  res.json(output)
})

//新增圖片到CKEditor
//http://localhost:5000/blogAddImg
router.post('/blogAddImg', upload.single('upload'), (req, res)=>{
  console.log('req.file',req.file)
  
  res.json({
    uploaded: true,
    url: 'http://localhost:5000/images/blog/'+req.file.filename
});
})

//新增文章
//http://localhost:5000/blogAdd
router.post('/blogAdd', upload.none(), async (req, res)=>{
  console.log('req.body',req.body)
  const output ={
    success: false,
    // error:'',
    // status: 0,
    body: req.body,
  }
  const sql = "INSERT INTO `article`(`memberId`,`articleTitle`,`articleContent`,`categoryId`,`articleImg`) VALUES(?,?,?,?,?)"

  const [r] = await db.query(sql , [
    req.body.memberId,
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

//修改文章
//http://localhost:5000/blogEdit
router.post('/blogEdit', upload.none(), async (req, res)=>{
  console.log(req.body)
  const output ={
    success: false,
    // error:'',
    // status: 0,
    body: req.body,
  }
  const sql = "UPDATE `article` SET `articleTitle`=?,`articleContent`=?,`categoryId`=?,`articleImg`=? WHERE `articleId`=?"

  const [r] = await db.query(sql , [
    req.body.articleTitle,
    req.body.articleContent,
    req.body.categoryId,
    req.body.articleImg,
    req.body.articleId,
    ])
  if (r) {
      output.result = r;
      output.success = true;
      console.log('result:', r);
    }
  res.json(output);
})

//刪除文章
//http://localhost:5000/blogDelete
router.post('/blogDelete', upload.none(), async (req, res)=>{
  console.log(req.body)
  const output ={
    success: false,
    // error:'',
    // status: 0,
    body: req.body,
  }
  const sql = "DELETE FROM `article` WHERE `articleId`=?"

  const [r] = await db.query(sql , [    
    req.body.articleId,
    ])
  if (r) {
      output.result = r;
      output.success = true;
      console.log('result:', r);
    }
  res.json(output);
})

module.exports = router
