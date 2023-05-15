//Import Module
const fs = require('fs')
//อ่านไฟล์
const display = fs.readFileSync('./myfile/input.txt','utf-8')
console.log(display)

//เขียนไฟล์
const outtext = `Hello Nana\n ${display}\n ไฟล์ถูกเขียนเมื่อ ${new Date()}`
fs.writeFileSync(`./myfile/output_.txt`, outtext)
console.log("สร้างไฟล์เรียบร้อย")