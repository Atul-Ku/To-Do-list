// jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// We have to make it array.//
let items= ["Buy food","Cook food","Eat food"];
let Work= [];


    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    const today = new Date();
    let day=today.toLocaleDateString("en-US",options);

app.get("/", function (req, res) {
    // const a=3+5;
    // res.send("The value of a is:"+a);

    // const today = new Date();
    // const currentday=today.getDay();

    // var day=" ";

    // if(currentday===0){
    //     // res.send("Yah!Today is holiday.");
    //     day="Sunday";
    // }
    // else if(currentday===1){
    //     day="Monday";
    // }
    // else if(currentday===2){
    //     day="Tuesday";
    // }
    // else if(currentday===3){
    //     day="Wednesday";
    // }
    // else if(currentday===4){
    //     day="Thrusday";
    // }
    // else if(currentday===5){
    //     day="Friday";
    // }
    // else{
    //     // res.write("<h1>Boo!Today is working day.</h1>");
    //     // res.write("Today is not holiday.");
    //     // res.send();

    //     day="Saturday";
    // }

    res.render('list', { listtitle: day, newlistItems: items});
})

app.post("/",function(req,res){
    let item=req.body.Newitem;

    if(req.body.list ==="Work list"){
        Work.push(item);
        res.redirect("/work");
    }
    else if(req.body.list2 ==="Work list"){
        Work.pop();
        res.redirect("/work");
    }
    else if(req.body.list2 ===day){
        items.pop();
        res.redirect("/");
    }
    else{
        items.push(item);
        res.redirect("/");    
    }
})

app.get("/work",function(req,res){
    res.render("list", {listtitle:"Work list", newlistItems: Work});

})

app.get("/about",function(req,res){
    res.render("about");
})

app.listen(3000, function () {
    console.log("Server is running on 3000 port.");
})