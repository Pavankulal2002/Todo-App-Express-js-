const mongoose=require('mongoose')

const todoSchema =new mongoose.Schema({
    name:{type:String ,required:true},
    description:{type:String ,required:true},
    completed:{type: Boolean,default:false}
})

module.exports=mongoose.model('TodoMongo',todoSchema)