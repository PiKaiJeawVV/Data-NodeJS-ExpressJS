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
        }, 1000)
        
    })
}

async function start(){
    console.log(await downloading(url1))
    console.log(await downloading(url2))
    console.log(await downloading(url3))
    console.log(await downloading(url4))
    console.log(await downloading(url5))
}

start()