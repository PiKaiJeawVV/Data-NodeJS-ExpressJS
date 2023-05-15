const name = "JingJing"
const timecurrent = require('./module/module.js').gettime
const plus = require('./module/module.js').add


console.log(timecurrent())
console.log(plus(100,500))
console.log(`ชื่อ = ${name}`)

