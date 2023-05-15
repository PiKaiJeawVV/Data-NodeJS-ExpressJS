const http = require('http')
const fs = require('fs')
const url = require('url')

const indexpage = fs.readFileSync(`${__dirname}/templates/index.html`,'utf-8')
const product1 = fs.readFileSync(`${__dirname}/templates/product1.html`,'utf-8')
const product2 = fs.readFileSync(`${__dirname}/templates/product2.html`,'utf-8')
const product3 = fs.readFileSync(`${__dirname}/templates/product3.html`,'utf-8')

const server = http.createServer((req,res)=>{
    const {pathname,query} = url.parse(req.url,true)
    if(pathname==="/" || pathname==="/home"){
        res.end(indexpage)
    }else if(pathname==='/product'){
        //สินค้าชิ้นที่ 1
        if(query.id === "1"){
            res.end(product1)
        }else if(query.id === "2"){
            res.end(product2)
        }else if(query.id === "3"){
            res.end(product3)
        }else{
            res.end("Path Fail")
        }
        res.end()
    }else{
        res.writeHead(404)
        res.end("Path Fail")
    }
})
server.listen(3000,()=>{
    console.log("Start Server Port : 3000")
})

//res.write("Hello JingJing nana Ping")
//res.end()