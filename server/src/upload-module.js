const multer = require('multer');
const {v4:uuidv4} = require('uuid');
const extMap = {
    'image/jpeg':'.jpg',
    'image/png':'.png',
    'image/jpeg':'.gif',
};
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__dirname+'./../public/img-uploads');

    },
    filename:(req,file,cb)=>{
        let ex = extMap[file.mimetype];
        cb(null,uuidv4()+ex);
    }

});
const fileFilter=(req,file,cb)=>{
    cb(null,!!extMap[file.mimetype]);
};
const upload=multer({storage,fileFilter});
module.exports=upload;