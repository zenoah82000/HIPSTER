const multer = require('multer');
// const {v4:uuidv4} = require('uuid');
const moment = require('moment-timezone')

const extMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
};
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__dirname+'./../../public/images/member');

    },
    filename:(req,file,cb)=>{
        let ex = extMap[file.mimetype];
        const fm = 'YYYYMMDDHHmmss';
        const time = moment(new Date()).format(fm);
        cb(null,time+ex);
    }

});
const fileFilter=(req,file,cb)=>{
    cb(null,!!extMap[file.mimetype]);
};

const upload=multer({storage,fileFilter});

module.exports=upload;