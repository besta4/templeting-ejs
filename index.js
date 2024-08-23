const express = require('express'); // Corrected line
const app = express();
const port = 8080;

//app.use(express.static(path.join(__dirname,"/public/js")));if running from outer directory of EJSdir
//app.use(express.static(path.join(__dirname,"/public/css"))); if running from outer directory of EJSdir
app.use(express.static("public"));//public is path used to serve static files like css and js 
// ^^^ this indicate all ejs files can access public files(main) but above public directory should be given correctly as per current server running directory
app.set("view engine","ejs");
//const path=require("path");//here path is a package
//app.set("views",path.join(__dirname,"/views")); use it when you try to execute being in desktop and nodemon EJSdir(folder name in which this project is done)/index.html
//above line says __dir gives current server(index.js) working directory like desktop/EJSdir even though if we run server from parent file of EJSdir inside this views will be present
app.get("/",(req,res)=>{
    res.render("home.ejs");//for this home.ejs should be in the same directory as per
    //terminal executing server directory if we try to execute by desktop like nodemon EJSdir/index.html
    //normally we do it as index.html being inside EJSdir
})

app.get("/ig/:username",(req,res)=>{
    let {username}=req.params;
    //console.log(username);
    //res.render("instagram.ejs",{username});
    const instadata=require("./data.json");
    //console.log(instadata);
    const data=instadata[username];
    if (!data) {
        return res.status(404).send("User not found");
    }
    res.render("instagram.ejs",{data});
})

app.get("/rolldice",(req,res)=>{
    let diceval = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice.ejs",{ num : diceval});
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
