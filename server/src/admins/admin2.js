const express= require('express');
const router = express.Router();

router.get('/admin2/:action?/:id?',(req,res)=>{
    const output ={
        ...req.params,
        url:req.url,
        baseurl:req.baseUrl,
        locals:res.locals
    }
    res.json(output);
});
module.exports=router;