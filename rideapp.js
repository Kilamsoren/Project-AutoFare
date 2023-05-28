//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static(__dirname + '/'));
const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/dhanbad",{ useNewUrlParser: true });
const places = new mongoose.Schema({
    place1 :String,
    place2 :String,
    price : Number
});

app.set('view engine','ejs');

const Ride  = mongoose.model("ride",places);


const ride2  = new Ride({
    place1: "dhanbad railway station",
    place2: "govindpur",
    price: 30
});
const ride3  = new Ride({
    place1: "jharia",
    place2: "dhanbad railway station",
    price: 15
});
const ride4  = new Ride({
    place1: "dhanbad railway station",
    place2: "hirapur",
    price: 10
});
const ride5  = new Ride({
    place1: "dhanbad railway station",
    place2: "nirsa",
    price: 60
});
const ride6  = new Ride({
    place1: "nirsa",
    place2: "govindpur",
    price: 30
});
const ride7  = new Ride({
    place1: "dhanbad railway station",
    place2: "bank road",
    price: 10
});
const ride8  = new Ride({
    place1: "jharia",
    place2: "bank road ",
    price: 20
});
const ride9  = new Ride({
    place1: "jharia",
    place2: "hirapur ",
    price: 20
});
const ridea1  = new Ride({
    place1: "jharia",
    place2: "govindpur",
    price: 20
});
const ridea2  = new Ride({
    place1: "iit dhanbad",
    place2: "bank road ",
    price: 30
});
const ridea3  = new Ride({
    place1: "jharia",
    place2: "iit dhanbad",
    price: 15
});
const ridea4  = new Ride({
    place1: "iit dhanbad",
    place2: "hirapur",
    price: 10
});
const ridea5  = new Ride({
    place1: "iit dhanbad",
    place2: "nirsa",
    price: 60
});
const ridea6  = new Ride({
    place1: "iit ism dhanbad",
    place2: "govindpur",
    price: 30
});

// Ride.insertMany([ride2,ride3,ride4,ride5,ride6,ride7,ride8,ride9,ridea1,ridea2,ridea3,ridea4,ridea5]);

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){

   var  p1= ""; 
   var  p2= ""; 
   var  placeall= ""; 
  res.sendFile(__dirname+"/index.html");
//   map = new Microsoft.Maps.Map('#myMap', {
//     zoom: 15
// });

});
app.post("/",function(req,res){
    p1 = req.body.place1;
    p2 = req.body.place2;
    placeall = p1+''+p2;
    getItems();
    async function getItems(){ 
     rides = await Ride.find({});
     var cost=0;
    rides.forEach(function(ride2){
        console.log(p1+"hi");
        console.log(p2+" hi");
        if((p2==ride2.place2  && p1==ride2.place1)||(p1==ride2.place2  && p2==ride2.place1))
        {
            console.log(ride2.price+" this is the price ");
            cost = ride2.price;
            return;
        }
        else {
        console.log("price not found");
        // res.render("list",{price : 0});
    }
    if(cost!==0)
    return;
    });
    console.log("the cost is "+ cost);
    res.render("list",{price : cost});
     rides1 = await Ride.find().select({ price: 1, _id: 0 });
    console.log(rides1);
    // mongoose.connection.close();
    }
    // res.sendFile("/");
})

        

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});













// const express = require("express"); 
// const body_parser = require("body-parser");
// const app = express(); 
// app.set('view engine','ejs');
// app.use(body_parser.urlencoded({extended:true}));
// app.use(express.static("public"))
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://0.0.0.0:27017/dhanbad",{ useNewUrlParser: true });

// const places = new mongoose.Schema({
//     place1 :String,
//     place2 :String,
//     price : Number
// });

// const Ride  = mongoose.model("ride",places);
// const place1 = new Ride({
//     place1: "hirapur",
//     place2 : "iit ism dhanbad",
//     price: 15
// });
//  app.get("/",function(res,req){
//     res.sendFile(__dirname+"/index.html");
//  })
// const data = body_parser.place1;
// console.log(data);
// // place1.save();

// app.listen(3000,function(err){
//     if(err)
//     console.log("err");
//     else 
//     console.log("the connections is established");
// });

