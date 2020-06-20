const express = require('express')
const db = require(__dirname+'/../db_connect2')
const upload =require(__dirname+'/../upload-module')
const router = express.Router()


//訂單列表
router.get('/oreder/:memberId',async (req,res)=>{
    console.log('買家訂單請求')
    const data ={
        status:false,
        order:[],
        orderdetails:[]
    }
    const sqlorderlist = "SELECT `product`.`productName`,`item_lists`.`orderId`,`item_lists`.`checkPrice`,`item_lists`.`checkQty`,`item_lists`.`checkSubtotal`,`item_lists`.`created_at`FROM `member` INNER JOIN `orderlist` ON `member`.`memberId` = `orderlist`.`memberId` INNER JOIN `item_lists` ON `orderlist`.`orderId`=`item_lists`.`orderId` INNER JOIN `product` ON `item_lists`.`productId` = `product`.`productId` WHERE `member`.`memberId`=?";

    const sqlorder = "SELECT * FROM `orderlist` WHERE `memberId` = ?"
    const [r1] = await db.query(sqlorder,[req.params.memberId])
    const [r2] =  await db.query(sqlorderlist,[req.params.memberId])
    console.log(r1)
    data.orderdetails= r2
    data.order=r1
    data.status=true

    res.json(data)
    
    

})

//訂單新增
router.post('/member/checkout',(req,res)=>{
    console.log('訂單新增',req.body)

})

module.exports = router
