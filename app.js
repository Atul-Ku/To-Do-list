// jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected successfully")
}).catch((err) => {
    console.log(err)
})

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Database schema.//
const itemSchema = new mongoose.Schema({
    todaytodo: String
})

const listSchema = new mongoose.Schema({
    listItem: String,
    items: [itemSchema]
});

const List = new mongoose.model("List", listSchema);

const Item = new mongoose.model("Item", itemSchema);

const item1 = new Item({
    todaytodo: "Buy Vegetables"
});

const item2 = new Item({
    todaytodo: "Make cake"
})

const replet = [item1, item2]

let options = { weekday: 'long', month: 'long', day: 'numeric' };
const today = new Date();
let day = today.toLocaleDateString("en-US", options);

app.get("/", function (req, res) {
    const found = async () => {
        const result = await Item.find()
        console.log(result)
        if (result.length == 0) {
            const createDocument = async () => {
                try {
                    const ans = await Item.insertMany(replet)
                    console.log(ans)
                }
                catch (err) {
                    console.log(err)
                }
            }
            createDocument();
            res.redirect("/")
        }
        res.render("list", { listtitle: day, newlistItems: result });
    }
    found();
})

// app.get("/", function (req, res) {
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

// res.render('list', { listtitle: "today"});
// })

app.get("/:customListName", function (req, res) {
    const customListName = req.params.customListName;
    console.log(customListName)

    const fd = async () => {
        const result = await List.find({ listItem: customListName });
        const found = await List.findOne({ listItem: customListName });
        if (result.length == 0) {
            try {
                const list = new List({
                    listItem: customListName,
                    items: replet
                });
                list.save();
                res.redirect("/" + customListName);
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            res.render("list", { listtitle: customListName, newlistItems: found.items });
        }
    }
    fd();

});

app.post("/", function (req, res) {
    const itemName = req.body.Newitem;
    const listName = req.body.list;
    const item = new Item({
        todaytodo: itemName
    })

    if(listName==day){
        item.save();
        res.redirect("/");
    }
    else{
        const inert= async()=>{
            const found = await List.findOne({ listItem: listName});
            found.items.push(item);
            found.save();
            res.redirect("/" + listName);
        }
        inert();
    }

    // if(req.body.list ==="Work list"){
    //     Work.push(item);
    //     res.redirect("/work");
    // }
    // else if(req.body.list2 ==="Work list"){
    //     Work.pop();
    //     res.redirect("/work");
    // }
    // else if(req.body.list2 ===day){
    //     items.pop();
    //     res.redirect("/");
    // }
});

app.post("/delete", function (req, res) {
    const delitem = req.body.checkbox

    const deleteitem = async () => {
        try {
            const del = await Item.deleteOne({ todaytodo: delitem })
            console.log(del)
            res.redirect("/")
        }
        catch (err) {
            console.log(err)
        }
    }
    deleteitem()
})

app.post("/:custom", function (req, res) {

})

app.get("/about", function (req, res) {
    res.render("about");
})

app.listen(3000, function () {
    console.log("Server is running on 3000 port.");
})