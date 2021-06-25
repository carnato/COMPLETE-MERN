//imports
const express = require('express')
const mongoose= require('mongoose')
const cors=require('cors')
//const bodyParser=require('body-parser')
const Student=require('./models/Students')
const app=express()
//db connections
mongoose.promise=global.promise;
mongoose.connect('mongodb://localhost:27017/students')
mongoose.connection.on('connected',()=>{
    console.log("Database is Connected");
})
mongoose.connection.on('error',()=>{
    console.log('error occurred');
})
//middlewareFunctions
app.use(cors())
app.use(express.json())
//router
app.get('/',(req,res)=>{
    // console.log('get request');
    // 
    Student.find()
    .exec()
    .then(result=>{
        consol.log(result);
        res.status(200).send(result);
    })
    .cath(err=>{
     res.status(500).send(result);
    })
})
app.post('/students',(req,res)=>{
    console.log(req.body.firstname);
    console.log(req.body.lastame);
    console.log(req.body.place);
    
    
    const student=new Student({
        _id: new mongoose.Types.ObjectId,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        place:req.body.place
    });
    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"successfully submitted"})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error Occured"})
    })
   
   
    res.send('ok');
});

//server
app.listen(5000,()=>{
    console.log('server was connected on port:5000')
})







