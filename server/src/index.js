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
app.get('/sales-json',(req,res)=>{
    const sales =require(__dirname+'/../data/sales');
    // 
    res.render('sales-json',{ sales });
});
app.get('/try-query',(req,res)=>{
    res.json(req.query);
});

app.get('/try-post-form',(req,res)=>{
    res.render('try-post-form',{pagetitle:'測試表單'});
})
// app.get('/try-upload',(req,res)=>{
//     res.render('try-upload');
// })
// app.post('/try-upload',upload.single('avater'),(req,res)=>{
//     const output={
//         succes:'false',
//         uploadImg :"",
//         nickname:"",
//         error:''
//     }
//     output.nickname=req.body.nickname || '';
//     if(req.file&& req.file.originalname){
//         switch(req.file.mimetype){
//             case 'image/jpeg':
//             case 'image/png':
//                 fs.rename(req.file.path,'./public/img/'+req.file.originalname,error=>{
//                     if(!error){
//                         output.succes = 'true';
//                         output.uploadImg ="/img/"+req.file.originalname;
//                     }
//                     res.render('try-upload',output)
//                 });
//                 break;
//             default:
//                 fs.unlink(req.file.path,error=>{
//                     res.render('try-upload',{output})
//                 })
//         }
        
//     }
// });
// const fun = (req,res)=>{
//     res.json(req.params);
// }

const admin2router = require(__dirname+'/admins/admin2')
app.use('/my',admin2router)


app.get('/my-params1/*/*/*',(req,res)=>{
    res.json(req.params);
})
app.get('/try-session',(req,res)=>{
    req.session.my_var = req.session.my_var || 0 ;
    req.session.my_var++;
    res.json({
        my_var:req.session.my_var,
        session:req.session
    })
})

app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',upload.none(),(req,res)=>{
    const user={
        'shink':{
            pass:'123',
            nickname:"aaa"
        },
        'fred':{
            pass:'1234',
            nickname:'bbb'
        }
    }
    const output={
        success:false,
        body:req.body, 
    }
    if(user[req.body.account] && user[req.body.account].pass === req.body.password){
        output.success = true;
        req.session.user ={
            id:req.body.account,
            nickname :user[req.body.account].nickname

        }
        output.sess_user = req.session.user;

    }
    res.json(output)
})
app.get('/logout',(req,res)=>{
    delete req.session.user;
    res.redirect('/login')
})

app.use('/address-book', require(__dirname+'/address_book'))

app.get('/try-moment',(req,res)=>{
    const fm = "YYYY-MM-DD HH:mm:ss";
    const m1 = moment(new Date());
    const m2 = moment(req.session.cookie.expires);
    // const m3 = '2020-01-23';

    res.json({
        "m1":m1.format(fm),
        "m2":m2.format(fm),
        // m3:m3.format(fm),
        "m1":m1.tz('Europe/London').format(fm),
        "m2":m2.tz('Europe/London').format(fm),
        // m3:m3.tz('Europe/London').format(fm),
    });
})
app.get(/^\/mobile\/09\d{2}-?\d{3}-?\d{3}$/,(req,res)=>{
    let url = req.url;
    url = url.slice(8).split('?')[0];
    url= url.split('-').join('');
    res.json(url);
})
app.post('/try-upload2',upload.single('avater'),(req,res)=>{
    res.json({
        "filename":req.file.filename,
        "body":req.body
    })
})
app.post('/try-post-form',(req,res)=>{
    res.locals.pagetitle = '測試表單-posted';
    res.render('try-post-form',req.body);
});
app.post('/try-json-form',(req,res)=>{
    req.body.contenType = req.get('Content-Type')
    res.json(req.body)
});
app.get('/pending',(req,res)=>{

});
app.use(express.static('public'));
app.use((req,res)=>{
    res.status(404);
    res.send(`<h2>找不到你要的頁面</h2> <img src="https://cdn.pixabay.com/photo/2020/04/17/14/16/mountains-5055387_1280.jpg">`);
})
app.listen(3000,()=>{
    console.log('開始監聽');
});