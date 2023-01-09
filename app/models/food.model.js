 const mongoose = require('mongoose')  ; 

 const foodSchema = mongoose.Schema({
    
    name: {
        type : String, 
    } , 
    ingredient : {
        type : String
    },
    image :
    {
     type:String
    },
    images : [{
        type : String
    }],
    price : {
        type : Number
    }, 
    status : {
     type : String
    },
    dateCreated : {
        type : Date  , 
    }
  
 }) 
 exports.Food = mongoose.model('Food',foodSchema)