const express= require('express'); 
const {Food} = require('../models/food.model') ; 
const router = express.Router(); 
const multer = require('multer') ; 
const { response } = require('express');
const mongoose = require('mongoose')
 

//Configuration image 
const FILE_TYPE_MAP ={
    'image/png' :'png',
    'image/jpeg' :'jpeg',
    'image/jpg' :'jpg'
}  
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        const isValid =FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');
        if(isValid){
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {

        const extension= FILE_TYPE_MAP[file.mimetype];
          const fileName=file.originalname;
          cb(null, `${fileName}`)
        }
})  

const uploadOptions = multer({ storage : storage})

 
router.get('/', async(req,res)=>{
   
     const foodList = await Food.find() ; 
     if(!foodList) {
        return res.status(404).send('No food')
     } 
      
     res.send(foodList)
})

router.get('/:id' , async(req,res)=>{
    const food = await Food.findById(req.params.id); 
    if(!food) {
        res.status(404).json({success:false})
    } 
    res.send(food)
}) 

router.post('/front' , async (req,res)=>{

    let food= new Food({
        name:req.body.name, 
        ingredient:req.body.ingredient,
        price:req.body.price, 
        status:req.body.status , 
        dateCreated: Date.now()
    }) 
    food.save();
    if(!food)
    {
        return res.status(404).send('the food cannot be added')
    }
    res.send(food)
})

router.post('/' , uploadOptions.single('image'), 
            async(req,res)=>{
                const file =req.file ; 
                if(!file) 
                return res.status(400).send('image is not defined')

                const fileName=req.file.filename ; 
                const basePath =`${req.protocol}://${req.get('host')}/public/uploads/`; 
                 
                let food = new Food({

                    name:req.body.name, 
                    ingredient:req.body.ingredient,
                    image:`${basePath}${fileName}`, 
                    price:req.body.price, 
                    status:req.body.status , 
                    dateCreated: Date.now()
                })
                 
                food.save();  
                if(!food) 
                return res.status(404).send('the product cannot be created') ; 
                res.send(food) ; 
            }
) 


router.put('/update/:id' , async(req,res)=>{
      if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send('Invalid FOod id'); 
      } 
      
      const food = await Food.findById(req.params.id);
      if (!food) return res.status(400).send('Invalid Food!'); 

      const file = req.file;
      let imagepath;
  
      if (file) {
          const fileName = file.filename;
          const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
          imagepath = `${basePath}${fileName}`;
      } else {
        //   imagepath = product.image;
      }
     const updatedFood = await Food.findByIdAndUpdate(
        req.params.id, 
        {
            name:req.body.name, 
            // image:imagepath , 
            price:req.body.price,
            status:req.body.status, 
        }, 
        { new : true }
     );
     if(!updatedFood) 
     { return res.status(404).send('the food cannot be updated ')}
     res.send(updatedFood)
})
 

router.delete('/delete/:id' ,  (req,res)=>{
    Food.findByIdAndDelete(req.params.id)
      .then(doc=>{
        if(!doc){
            return res.status(404).json({succes:false , message:'the food cannot be deleted'})
        }else{
            return res.status(200).json({success:true , message:'the category deleted'}); 
        }
      }).catch(err=>{
        return response.status(400).json({succes:false, error :err})
      })
     
})



module.exports=router;