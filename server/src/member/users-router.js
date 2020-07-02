const express = require("express");
const upload = require("./upload-module");
const fileUpload = require("express-fileupload");
// mysql2 async-await用的
const db = require(__dirname + "./../db_connect2");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

// 執行sql用的async-await的函式
// sql 執行用的sql
// res 回應
// method restful的方法，預設為get
// multirow 是否為多資料回傳，預設為是
// instance 物件實體，預設為空物件
async function executeSQL(
  sql,
  res,
  method = "get",
  multirows = true,
  instance = {}
) {
  try {
    const [rows, fields] = await db.promisePool.query(sql);

    switch (method) {
      case "post": {
        // 仿照json-server的回傳
        const insertId = { id: rows.insertId };
        // 合併id值
        const result = { ...instance, ...insertId };
        //回傳
        res.status(200).json(result);
        break;
      }
      case "put": {
        // 仿照json-server的回傳，有更新到會回傳單一值，沒找到會回到空的物件字串
        // console.log(rows.affectedRows)
        let result = {};
        if (rows.affectedRows) result = { ...instance };
        //回傳
        res.status(200).json(result);
        break;
      }
      case "delete": {
        // 仿照json-server的回傳
        res.status(200).json({});
        break;
      }
      case "get":
      default:
        {
          if (multirows) {
            res.status(200).json({
              users: rows,
            });
          } else {
            // 仿照json-server的回傳，有找到會回傳單一值，沒找到會回到空的物件字串
            let result = {};
            if (rows.length) result = rows[0];
            res.status(200).json(result);
          }
        }
        break;
    }
  } catch (error) {
    // 錯誤處理
    console.log(error);

    // 顯示錯誤於json字串
    res.status(200).json({
      message: error,
    });
  }
}

// 以下為路由

// 處理會員登入
router.post("/loginmember", async (req, res, next) => {
  // console.log(typeof req.body)
  // console.log(req.body)
  const memberMail = req.body.memberMail;
  const memberPwd = req.body.memberPwd;
  // console.log('acc:'+memberMail)
  // console.log('pwd:'+memberPwd)
  const loginMemberSql = `SELECT * FROM member WHERE  memberMail=? AND memberPwd=? `;
  const [r1] = await db.query(loginMemberSql, [memberMail, memberPwd]);

  const memberId = [r1][0][0].memberId;
  const memberName = [r1][0][0].memberName;
  const memberImg = [r1][0][0].memberImg;
  const memberSuccess = [r1][0].length ? true : false;
  // console.log(memberId,memberName,memberSuccess)

  const output = {
    //建立判斷登入
    success: memberSuccess,
    id: memberId,
    name: memberName,
    img: memberImg,
  };

  res.json(output);
});

// 處理會員註冊
router.post("/addmember", async (req, res, next) => {
  // 測試response，會自動解析為物件
  // console.log(typeof req.body)
  // console.log(req.body)
  const memberMail = req.body.memberMail;
  const memberPwd = req.body.memberPwd;
  const addMemberSql = `INSERT INTO member(memberName, memberGender, memberBirth, memberPhone, 	memberAddress	,	memberMail,	memberPwd,	memberImg, memberStatus) VALUES('訪客','男','2020-01-01','0900000000','請輸入地址',?,?,'tmp.jpg','true')`;

  const [r1] = await db.query(addMemberSql, [memberMail, memberPwd]);
  res.json(req.body);
});

// 取得會員基本資料
router.post("/getmemberdata", async (req, res, next) => {
  // console.log(req.body.memberId)
  const userId = req.body.memberId;
  const getMemberSql = `SELECT * FROM member WHERE  memberId=? `;

  const [r1] = await db.query(getMemberSql, userId);
  res.json(r1[0]);
});

// 更新會員資料
router.post("/updatememberdata", async (req, res, next) => {
  // console.log(req.body)

  const filename = req.body.memberImg.split(".").pop();
  const memberId = req.body.memberId;
  const memberName = req.body.memberName;
  const memberGender = req.body.memberGender;
  const memberBirth = req.body.memberBirth;
  const memberPhone = req.body.memberPhone;
  const memberAddress = req.body.memberAddress;
  const memberPwd = req.body.memberPwd;
  // const memberImg = req.body.memberImg
  const memberImg = req.body.memberImgState
    ? `memberid_${req.body.memberId}.${filename}`
    : req.body.memberImg;

  // console.log("memberid_"+req.body.memberId+"."+filename)

  const updateMemberSql =
    "UPDATE `member` SET `memberName`=?,`memberGender`=?,`memberBirth`=?,`memberPhone`=?,`memberAddress`=?,`memberPwd`=?,`memberImg`=? WHERE  `memberId`=? ";

  const [r1] = await db.query(updateMemberSql, [
    memberName,
    memberGender,
    memberBirth,
    memberPhone,
    memberAddress,
    memberPwd,
    memberImg,
    memberId,
  ]);

  // console.log(r1)

  //重新撈該會員資料
  const searchMemberSql = "SELECT * FROM member WHERE  `memberId`=? ";
  const [r2] = await db.query(searchMemberSql, [memberId]);
  const localmemberId = [r2][0][0].memberId;
  const localmemberName = [r2][0][0].memberName;
  const localmemberImg = [r2][0][0].memberImg;
  const localmemberSuccess = [r2][0].length ? true : false;
  // console.log(localmemberId,localmemberName,localmemberSuccess,localmemberImg)

  //傳回前端
  const output = {
    success: localmemberSuccess,
    id: localmemberId,
    name: localmemberName,
    img: localmemberImg,
  };

  res.json(output);
});

// 更新會員圖片
router.post(
  "/updatememberimgdata",
  upload.single("avatar"),
  async (req, res) => {
    // console.log(req.file)//撈上傳檔案的資訊
    // console.log(req.body)//撈額外提供的資訊
    const filename = req.body.memberImg.split(".").pop(); //副檔名
    if (req.file && req.file.path) {
      fs.rename(
        req.file.path,
        __dirname +
          "/../../public/images/member/" +
          "memberid_" +
          req.body.memberId +
          "." +
          filename,
        (error) => {}
      );
    }

    res.json({});
  }
);

module.exports = router;
