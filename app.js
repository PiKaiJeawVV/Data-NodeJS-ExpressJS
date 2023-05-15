const express = require('express')
const app = express()
const path = require('path')
const router = require('./route/myroute.js')
const cookieParser = require('cookie-parser')
const session = require('express-session')


app.set(`views`,path.join(__dirname,`views`))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false})) //ทำให่อ่านข้อมูลจาก POST ได้
app.use(cookieParser())
app.use(session({secret:"mysessionn",resave:false,saveUninitialized:false}))
app.use(router)


//app.use(router)
app.use(express.static(path.join(__dirname,`public`)))

app.listen(8080,()=>{
    console.log("Start Server Port 8080")
}) 