const mongoose = require('mongoose')  ; 

const UserSchema = mongoose.Schema({
   
   firstname: {
       type : String, 
   } , 
   lastname : {
       type : String
   },
   email :
   {
    type:String
   },
   password : {
    type : String
    },
   numtel : {
       type : Number
   },
   roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      
    }
  ]
 
}) 
exports.User = mongoose.model('User',UserSchema)