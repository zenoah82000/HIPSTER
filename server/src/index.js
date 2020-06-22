const express = require('express');
// var multer = require('multer');
// var upload = multer({dest:'tmp_uploads/'})
const moment = require('moment-timezone');
const fs = require('fs');
const db = require(__dirname + '/db_connect2');
const session =require('express-session');
const Mysqlstore =require('express-mysql-session')(session);
const cors = require('cors');
const nodemailer = require("nodemailer");
require("dotenv").config();


const upload = require(__dirname+"/upload-module");

const app = express();


//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json());

const whitelist=['http://localhost:5000',undefined,'http://localhost:3000'];
const corsOptions={
    credentials:true,
    origin:function(origin,cb){
        // console.log('origin:'+origin);
        if(whitelist.indexOf(origin)!== -1){
            cb(null,true)
        }else{
            cb(null,false)
        }
    }
}
app.use (cors(corsOptions));

const sessionStore=new Mysqlstore({},db);
app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:'qweqweqweqewdsfwfewe',
    store:sessionStore,
    cookie:{
        maxAge:1200000,
    }
}))
app.use((req,res,next)=>{
    res.locals.session= req.session || {}//預設網頁session
   next()
})

app.use(require(__dirname+'/coupon'))

app.use(require(__dirname+'/order/order'));

app.use(require(__dirname+'/blog'));

app.use(require(__dirname+'/member-api/users-router'));

//設定公開資料夾
app.use(express.static('public'));

//找不到頁面
app.use((req,res)=>{
    res.status(404);
    res.send(`<h2>找不到你要的頁面</h2> <img src="https://cdn.pixabay.com/photo/2020/04/17/14/16/mountains-5055387_1280.jpg">`);
})
app.listen(5000,()=>{
    console.log('開始監聽');
});