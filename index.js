// jshint esversion:6

const express=require("express");
const bodyparser=require("body-parser");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

let items=["Buy food","Cook food"];

app.get('/', function(req, res){
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let today=new Date();

    let day=today.toLocaleDateString("en-US",options);
    res.render('list2', { kindofDay: day, newlistItems:items});
});

app.post("/",function(req,res){
    let item=req.body.newItem;
    items.push(item);

    res.redirect("/");

})
app.listen(3000,function(){
    console.log("server started on 3000 port.");
})