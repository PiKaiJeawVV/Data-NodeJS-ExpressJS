const connect = true
const url1 = "google.com/JingJing.jpg"
const url2 = "google.com/Nana.jpg"
const url3 = "google.com/Gigy.jpg"
const url4 = "google.com/Kae.jpg"
const url5 = "google.com/Minnie.jpg"

function downloading(url) {
    console.log(`โหลดไฟล์์ ${url}`)
    return new Promise(function(resolve,reject){
        setTimeout(() =>{
            if (connect){
                resolve(`โหลด ${url} เรียบร้อย`)
            }else{
                reject(`โหลดไม่ผ่าน`)
            }
        }, 3000)
        
    })
}

//downloading(url1).then(function(result){
//    console.log(result)
//    downloading(url2).then(function(result){
//        console.log(result)
//        downloading(url3).then(function(result){
//            console.log(result)
//        })
//    })
//})

downloading(url1).then(function(result){
    console.log(result)
    return downloading(url2)
}).then(function(result){
    console.log(result)
    return downloading(url3)
}).then(function(result){
    console.log(result)
}).finally(()=>{
    console.log(`จบการทำงาน`)
})