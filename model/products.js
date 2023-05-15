//ใช้งาน mongoose
const connect = require('mongoose')

//เชื่่อมต่อ
connect.set("strictQuery", false);
    const db_url = 'mongodb://127.0.0.1:27017/productDB'
    connect.connect(db_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("Connected")).catch(err=>console.log(err))

//ออกแบบ schema
let productSchema = connect.Schema({
    name:String,
    price:String,
    image:String,
    description:String

})



//สร้าง model (Collecttion)
let Product = connect.model("products",productSchema)


module.exports = Product

// การสร้าง function Save โดยใช้งานผ่าน Class Product
module.exports.saveProduct=function(data){
    data.save()
}