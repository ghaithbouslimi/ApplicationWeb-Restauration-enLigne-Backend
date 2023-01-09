const express=require("express"); 
const router = express.Router(); 
const test = require('../authentification/auth.controller')
const {User} =require ('../models/user.model')

 router.get('/one/:id' ,  async (req, res )=>{
     
    const user = await   User.findById(req.params.id );
    if(!user) {
    return    res.send('user not found '); 
    
    }
    res.send(user)
 })

   router.get('/allUser', async (req,res)=>{
    
    
    const userList = await User.find({
           "roles" : "63948c23f2ee51275604299a"
    }).populate('roles')
    
    if(!userList) {
      res.status(500).json({succes : false})
    }
    res.send(userList)
  })
  
  
  
  

  router.post('/postUser' , test.signup
  
  )


  router.delete(`/delete/:id`,  (req,res)=>{
    User.findByIdAndDelete(req.params.id).then(user=>{
        if(!user){
            return res.status(404).json({success:false,message:'the user is not deleted'})
        }else {
        return res.status(200).json({success:true,message:'the user is  deleted'})
    }
    }).catch(err=>{
        return response.status(400).json({success:false,error :err})
    })
})

router.put('/update/:id',async (req ,res) =>{
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            numtel:req.body.numtel,
            email:req.body.email,
            password:req.body.password,
            roles:req.body.roles
        },
        { new :true }
    )
    if(!user)
    return res.status(400).send('the category cannot be created')
    res.send (user); 

    })
    
    
    router.get(`/get/count`, async (req,res)=> {
     
        const userCount = await User.countDocuments().then((count)=> count )
       
         if(!userCount){
             res.status(500).json({succes:false})
         }
         res.send({
             count :userCount
       }); 
     })
    
 
  
   
module.exports=router;