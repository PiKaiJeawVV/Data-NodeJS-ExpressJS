const express = require('express')
const router = express.Router()
const Product = require('../model/products')

//const path = require('path')

//อัพโหลดไฟล์
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/products')//ตำแหน่งจัดเก็บไฟล์
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg")//เปลี่ยนชื่อไฟล์
    }
})

const upload = multer({
    storage:storage
})
//จัดการ Routing
router.get(`/`,(req,res)=>{
    Product.find().exec((err,doc)=>{
        console.log(doc)
        res.render('index',{name_member:doc})
    })
//     const name = `JingJing`
//     const age = '18'
//     res.render('index.ejs',{name:name,age:age})
//     const name_member = [
//         {name :'JingJing', member: 'CGM'},
//         {name :'NaNa', member: 'CGM'},
//         {name :'Ping', member: 'CGM'},
//         {name :'Sita', member: 'CGM'},
//         {name :'Mei', member: 'CGM'},
//     ]
//    res.render('index.ejs',{name_member:name_member})
})
router.get(`/addform`,(req,res)=>{
    if (req.session.login){
        res.render('form.ejs')
    }else{
        res.render('admin.ejs')
    }
    //res.render('admin.ejs')
    
})

// clear cookie ออกจากระบบ
router.get('/logout',(req,res)=>{
    // res.clearCookie('username')
    // res.clearCookie('password')
    // res.clearCookie('login')
    // res.redirect('/manage')
    req.session.destroy((err)=>{
        res.redirect('/manage')
    })
})

router.get(`/manage`,(req,res)=>{
    if (req.session.login){
        Product.find().exec((err,doc)=>{
            //console.log(doc)
            res.render('manage',{name_member:doc})
        })
    }else{
        res.render('admin')
    }
    //res.render('admin')
    // แสดงข้อมูล Session
    // console.log(req.sessionID)
    // console.log(req.session)
    // Product.find().exec((err,doc)=>{
    //     //         //console.log(doc)
    //     res.render('manage',{name_member:doc})
    // })
})

// ลบข้อมูล By ID
router.get(`/delete/:id`,(req,res)=>{
    console.log(req.params.id)
    Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec(err=>{
        if(err) console.log(err)
        res.redirect('/manage')
    })
    // Product.find().exec((err,doc)=>{
    //     console.log(doc)
    //     res.render('manage',{name_member:doc})
    // })
})

// Insert ข้อมูล
router.post('/insert',upload.single("image"),(req,res)=>{
    // console.log(req.file)
    // console.log(req.body.name)
    // console.log(req.body.member)
    // console.log(req.body.image)
    // console.log(req.body.description)
    let data = new Product({
        name:req.body.name,
        price:req.body.member,
        image:req.file.filename,
        description:req.body.description
        
    })
    //console.log(data)
    Product.saveProduct(data,(err)=>{
         if(err) console.log(err)
         res.redirect('/')
    })
    res.redirect('/')


})
// Access 1 page
router.get(`/:id`,(req,res)=>{
    const product_id = req.params.id
    Product.findOne({_id:product_id}).exec((err,doc)=>{
        //console.log(doc)
        res.render('product.ejs',{detail:doc}) //<-- detail คือค่าที่เราส่งไปให้ EJS
    })
    //console.log(product_id)
    //res.render('product.ejs')
})

router.post(`/edit`,(req,res)=>{
    const edit_id = req.body.edit_id
    Product.findOne({_id:edit_id}).exec((err,doc)=>{
        // นำข้อมูลเดิมที่จะแก้ไข มาแสดง
        res.render('edit.ejs',{detail:doc})
    })
    //res.render('form.ejs')
})

router.post('/update',(req,res)=>{
    //ข้อมูลใหม่ที่มาจาก form edit
    const update_id = req.body.update_id
    let data = {
        name:req.body.name,
        price:req.body.member,
        description:req.body.description
    }
    Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).exec((err=>{
        res.redirect("manage")
    }))
    // Product.saveProduct(data,(err)=>{
    //      if(err) console.log(err)
    //      res.redirect('/')
    // })
    
})

router.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const time_cookie = 20000 //60 sec

    if (username === "admin" && password === "1qaz2wsx"){
        //สร้าง cookie
        // res.cookie('username',username,{maxAge:time_cookie})
        // res.cookie('password',username,{maxAge:time_cookie})
        // res.cookie('login',true,{maxAge:time_cookie}) //true = login เข้ามาแล้ว
        //สร้าง session
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = time_cookie
        res.redirect('/manage')
    }else{
        res.render("404.ejs")
    }
})


// router.get(`/form`,(req,res)=>{
//     res.render('form.ejs')
// })
//router.get("/",(req,res)=>{
//    res.status(200)
//    res.type('text/html')
//    res.sendFile(path.join(__dirname,"../templates/index.html"))
//})

//router.get("/product/:id",(req,res)=>{
//    const productID = req.params.id
//    if (productID === "1"){
//        res.sendFile(path.join(__dirname,"../templates/product1.html"))
//    }else if (productID === "2"){
//        res.sendFile(path.join(__dirname,"../templates/product2.html"))
//    }else if (productID === "3"){
//        res.sendFile(path.join(__dirname,"../templates/product3.html"))
//    }else{
//        res.redirect(`/`) 
//    }
//    //res.sendFile(path.join(__dirname,"../templates/product1.html"))
//})

module.exports = router