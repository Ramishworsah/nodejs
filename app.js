
const express = require('express');
const path = require('path');
const user = require('./model/user');
const app = express();
const dbconnect = require('./dbconfig/dbconfig');
dbconnect();

require('dotenv').config();
const PORT = process.env.PORT || 3002;

const pageUrl = path.join(__dirname, '/pages/');

app.use('/css', express.static(
    path.join(__dirname, 'node_modules/bootstrap/dist/css')));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.sendFile(pageUrl + "index.html")
})

// Signup get & post
app.get("/signup", (req, res) => {
    res.sendFile(pageUrl + "signup.html")
})
app.post("/signup", async(req, res)=>{
    console.log(req.body);
    try {
        const {
            name, email, password ,confirmPassword} = req.body;
        
        if(name==''||email==''||password==''||confirmPassword=='') {
           return res.send("All field are required");
        }
        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match!');
        }
        //Check user is already there in the database ot not
        const checkuser = await user.find({email: email});
        if(checkuser.length==0) {
            const newuser = {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
        

            await user.create(newuser);
            res.sendFile(path.join(pageUrl,"index.html"))
        }
     
        else
        {
           return res.send('User already exists !');
        }
    }
    catch(err){
        return res.send('Error :' + err);
    }
})

app.get("/login", (req, res) => {
    res.sendFile(pageUrl + "login.html")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})