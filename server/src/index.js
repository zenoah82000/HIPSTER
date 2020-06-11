const express = require('express');
// var multer = require('multer');
// var upload = multer({dest:'tmp_uploads/'})
const moment = require('moment-timezone');
const fs = require('fs');
const db = require(__dirname + '/db_connect2');
const session =require('express-session');
const Mysqlstore =require('express-mysql-session')(session);
const cors = require('cors');



const upload = require(__dirname+"/upload-module");

const app = express();

app.set('view engine','ejs');

//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json());

const whitelist=['http://localhost:8080',undefined,'http://localhost:3000'];
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
    res.locals.sess= req.session || {}

   next()
})





app.get('/',(req,res)=>{
    res.render('main',{name:'vireee',pagetitle:'我的網站'});
});
app.use(express.static('public'));
app.use((req,res)=>{
    res.status(404);
    res.send(`<h2>找不到你要的頁面</h2> <img src="https://cdn.pixabay.com/photo/2020/04/17/14/16/mountains-5055387_1280.jpg">`);
})
app.listen(3000,()=>{
    console.log('開始監聽');
});