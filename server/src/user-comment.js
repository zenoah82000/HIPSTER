const express = require("express");
const db = require(__dirname + "/db_connect2");
const upload = require(__dirname + "/upload-module");
const router = express.Router();

//訂單列表
router.get("/comments/:memberId", async (req, res) => {
  const data = {
    comment: [],
    notcomment: [],
  };

  const sqlcommentlist =
    "SELECT `comments`.`commentId`, `comments`.`itemListId`,`comments`.`content`, `comments`.`star`, `comments`.`created_at`, `comments`.`updated_at`,`item_lists`.`productId`,`item_lists`.`orderId`,`item_lists`.`date`,`product`.`productName`,`product`.`productImg`, `item_lists`.`memberId` FROM `comments`LEFT JOIN `item_lists` ON `comments`.`itemListId` =`item_lists`.`itemListId` LEFT JOIN `product`ON `item_lists`.`productId` =`product`.`productId` LEFT JOIN `orderlist` ON `item_lists`.`orderId` =`orderlist`.`orderId` WHERE `item_lists`.`memberId` = ?";

  const sqlnotcommentlist =
    "SELECT `item_lists`.`itemListId`, `item_lists`.`orderId`, `item_lists`.`memberId`, `item_lists`.`productId`, `item_lists`.`date`, `item_lists`.`checkPrice`, `item_lists`.`checkQty`, `item_lists`.`checkSubtotal`, `item_lists`.`created_at`, `item_lists`.`updated_at`,`product`.`productName`,`product`.`productImg`, `comments`.`content` FROM `item_lists` LEFT JOIN `product`ON `item_lists`.`productId` =`product`.`productId` LEFT JOIN `comments` ON `item_lists`.`itemListId` = `comments`.`itemListId` WHERE `comments`.`content` is null and `item_lists`.`memberId` = ?";

  const [r1] = await db.query(sqlcommentlist, [req.params.memberId]);
  const [r2] = await db.query(sqlnotcommentlist, [req.params.memberId]);

  data.comment = r1;
  data.notcomment = r2;

  res.json(data);
});

//新增評論到資料庫
router.post("/sendComments", async (req, res) => {
  console.log(req.body);
  // const commentImg =
  //   req.body.commentImg != "" ? `itemListId_${req.body.itemListId}_0.jpg` : "";
  // const commentImg1 =
  //   req.body.commentImg1 != "" ? `itemListId_${req.body.itemListId}_1.jpg` : "";
  // const commentImg2 =
  //   req.body.commentImg2 != "" ? `itemListId_${req.body.itemListId}_2.jpg` : "";
  // const commentImg3 =
  //   req.body.commentImg3 != ""
  //     ? `itemListId_${req.body.itemListId}_3.jpg}`
  //     : "";

  console.log(commentImg, commentImg1, commentImg2, commentImg3);
  const addCommentList =
    "INSERT INTO `comments` (`itemListId`,`content`, `star`,`commentImg`,`commentImg1`,`commentImg2`,`commentImg3`) VALUES (?,?,?,?,?,?,?)";

  const [r2] = await db.query(addCommentList, [
    req.body.itemListId,
    req.body.commentContent,
    req.body.star,
    req.body.commentImg[0],
    req.body.commentImg[1],
    req.body.commentImg[2],
    req.body.commentImg[3],
  ]);
  res.json("ok");
});

// 評論圖片新增到後端資料夾
router.post("/commentimgdata", upload.single("avatar"), async (req, res) => {
  const filename = req.body.memberImg.split(".").pop(); //副檔名
  if (req.file && req.file.path) {
    fs.rename(
      req.file.path,
      __dirname +
        "/../../public/images/comments/" +
        "itemListId_" +
        req.body.itemListId +
        "." +
        filename,
      (error) => {}
    );
  }
  res.json("ok");
});

module.exports = router;
