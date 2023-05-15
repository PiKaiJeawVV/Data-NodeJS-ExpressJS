function calculate(x,y,callback) {
    console.log("กำลังคำรนวณ")
    setTimeout(() => {
        const sum = x + y
        callback(sum)
    }, 3000);
    
}



calculate(50,200,function display(result){
    console.log(`ผลลัพธ์คือ ${result}`)
})