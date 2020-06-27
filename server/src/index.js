const express = require("express");
// var multer = require('multer');
// var upload = multer({dest:'tmp_uploads/'})
const moment = require("moment-timezone");
const fs = require("fs");
const db = require(__dirname + "/db_connect2");
const session = require("express-session");
const Mysqlstore = require("express-mysql-session")(session);
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const upload = require(__dirname + "/upload-module");

const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const whitelist = ["http://localhost:5000", undefined, "http://localhost:3000"];
const corsOptions = {
  credentials: true,
  origin: function (origin, cb) {
    // console.log('origin:'+origin);
    if (whitelist.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
app.use(cors(corsOptions));

const sessionStore = new Mysqlstore({}, db);
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "qweqweqweqewdsfwfewe",
    store: sessionStore,
    cookie: {
      maxAge: 1200000,
    },
  })
);
app.use((req, res, next) => {
  res.locals.sess = req.session || {}; //預設網頁session

  next();
});

app.use(require(__dirname + "/coupon"));

app.use((req, res, next) => {
  res.locals.session = req.session || {}; //預設網頁session
  next();
});

app.use(require(__dirname + "/user-qanda"));

app.use(require(__dirname + "/user-comment"));

app.use(require(__dirname + "/user-map"));

app.use(require(__dirname + "/order/order"));

app.use(require(__dirname + "/blog"));

app.use(require(__dirname + "/productCategory"));

app.use(require(__dirname + "/productList"));

app.use(require(__dirname + "/map/map"));

app.use(require(__dirname + "/member/users-router"));

app.use(require(__dirname + "/user-map"));

//設定公開資料夾
app.use(express.static("public"));

//首頁
app.get("/", (req, res) => {
  console.log("Request Hipster Api");
  res.send(
    `<h1>Hipster Api Start</h1><img src="https://www.akamai.com/cn/zh/multimedia/images/intro/2018/big-data-connector-intro.jpg?imwidth=1366">`
  );
});

//找不到頁面
app.use((req, res) => {
  res.status(404);
  res.send(`<img src="https://i.imgur.com/AVAbDse.png">`);
});
app.listen(5000, () => {
  console.log("開始監聽");
});
