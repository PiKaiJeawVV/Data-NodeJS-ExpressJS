//Import Module
const fs = require('fs')
//อ่านไฟล์
fs.readFile(`./myfile/input.txt`,'utf-8',(err,data)=>{
    console.log(data)
    if (err) {
        return console.log('เกิดข้อผิดพลาด',err)
    }
    const outfile = `Hello JingJing\n${data}\nไฟล์ถูกเขียนเมื่อ_${new Date}`
    fs.writeFile(`./myfile/ouput.txt`,outfile,err=>{
        if (err) {
            return console.log('เกิดข้อผิดพลาด',err)
        }
        console.log('จบการทำงาน')
    })
    
})








    //const outputext = `Hello node.js\n${data}\nไฟล์นี้ถูกสร้างเมื่อ ${new Date()}`
    //fs.writeFile(`./myfile/output.txt`,outputext,err=>{
    //console.log(data)


