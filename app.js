const  express = require('express') ; 
const app = express();
const mongoose = require('mongoose') ;  
const cors = require ('cors'); 
require('dotenv').config(); 
const db = require('./app/models'); 
const Role = db.role; 

app.use(cors()); 
app.options('*',cors()) ; 

app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use(express.json()); 
 

// routes 
require("./app/routes/auth.routes")(app);

const foodRouter = require('./app/routes/food.routes')
const userRouter = require('./app/routes/user.routes')
app.use('/foodCrud',foodRouter)
app.use('/user', userRouter)
// database 
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/Rstauration' , {

}).then(()=>{
    console.log("database Connection is ready..."); 
    initial();
}).catch((err)=>{
    console.log(err); 
    process.exit()
}); 

//server 
app.listen(3001,()=>{
    console.log('server is runnig http://localhost:3001'); 
})
  

function initial(){
    Role.estimatedDocumentCount((err , count )=>{
        if(!err && count === 0){
            new Role ({
                name :"user"
            }).save(err => {
                if (err){
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
          
            new Role({
                name : "admin"
            }).save(err => {
                if(err){
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection ")
            });
        }
    });
}

