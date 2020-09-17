const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const Student = require("./models/Student.js")
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const router = express.Router();


const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/SignIn.html")
})
app.get('/SignUp.html', (req,res)=>{
    res.sendFile(__dirname + "/SignUp.html")
})
app.get('/reqtask.html', (req,res)=>{
    res.sendFile(__dirname + "/reqtask.html")
})
app.get('/SignIn.html', (req,res)=>{
    res.sendFile(__dirname + "/SignIn.html")
})

//connect to the app by altas
mongoose.connect("mongodb+srv://luozhongtain:lzt611789@cluster0.lg159.mongodb.net/The_SignDB_created?retryWrites=true&w=majority", 
{useNewUrlParser: true});

app.post('/SignUp.html', (req,res)=>{
  
    const Country = req.body.country 
    const firstname = req.body.first_name
    const lastname = req.body.last_name
    const email = req.body.email
    const Password = req.body.password
    const Conpassword = req.body.c_password
    const ZIP = req.body.zip
    const MPN = req.body.m_pn
    const City = req.body.C_ity
    const State = req.body.S_tate
    const Address = req.body.A_ddress
//hashed  
    const hashed = bcrypt.hashSync(Password,10);
//利用model里面的Student以创建自己的student集合
    const student = new Student({
        The_country : Country,
        The_fname : firstname,
        The_lname : lastname,
        The_email : email,
        The_password : hashed,
        The_confirm_password : hashed,
        The_address : Address,
        The_ZIP : ZIP,
        The_mpn : MPN,
        The_city : City,
        The_state : State,
    })    
    
    student
    .save()
    .catch((err) => console.log(err))  
    if(res.statusCode == 200)
    {
        res.sendFile(__dirname + "/success_SignUp.html")  
    }
    else
    {
        res.sendFile(__dirname + "/404.html")
    } 
})

app.post('/', (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    var condition = {'The_email' : email}
    Student.findOne(condition, (err,data)=>{
        if(err){
            console.log(err)
            return
        }if(data){
            const hashed = data.The_password
            const temp = bcrypt.compareSync(password, hashed)
            if(temp == true){res.sendFile(__dirname + "/reqtask.html")}
        }else{
            res.send("/404.html")
            }
        })
})

app.post('/SignIn.html', (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    var condition = {'The_email' : email}
    Student.findOne(condition, (err,data)=>{
        if(err){
            console.log(err)
            return
        }if(data){
            const hashed = data.The_password
            const temp = bcrypt.compareSync(password, hashed)
            if(temp == true){res.sendFile(__dirname + "/reqtask.html")}
        }else{
            res.send("/404.html")
            }
        })
})


var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});