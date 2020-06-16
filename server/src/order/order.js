const express = require('express')
const db = require(__dirname+'/../db_connect2')
const upload =require(__dirname+'/../upload-module')
const router = express.Router()


//訂單列表
router.get('/member/oreder',(req,res)=>{
    console.log('買家訂單請求')
})

//訂單新增
router.post('/member/checkout',(req,res)=>{
    console.log('訂單新增',req.body)
})


