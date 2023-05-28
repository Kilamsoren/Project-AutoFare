
//     var map = new Microsoft.Maps.Map("#myMap",{
//         zoom:15,
//         mapTypeId: Microsoft.Maps.MapTypeId.aerial
//     });
//     var locs = [ 35.027222, 11.02];
// var rect = Microsoft.Maps.LocationRect.fromLocations(locs);

// map.setView({ bounds: rect, padding: 80 });
const express = require("express");
const body_parser = require("body-parser");
const app = express(); 
// app.set('view engine', 'ejs')
// app.get("/",function(req,res){
//     res.render();
// });
var map;
var loc1; 
var loc2;
const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/loco");
const places = new mongoose.Schema({
    place1 :String,
    place2 :String,
    price : Number
});
console.log("connection done");
const Ride  = mongoose.model("ride",places);
const ride1  = new Ride({
    place1: "Govindpur, Gobindpur ",
    place2: "Hirapur Hatia Road ",
    price: 15
});

var loca="";
var p1 ="";
var p2 ="";
var rides;
 getItems();
    async function getItems(){ 
         rides = await Ride.find({});
        console.log(rides);
        mongoose.connection.close();
        }
    function getMap() {
        map = new Microsoft.Maps.Map('#myMap', {
            zoom: 15
        });
    
        Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', function () {
            var manager = new Microsoft.Maps.AutosuggestManager({ map: map });
            manager.attachAutosuggest('.searchBox', '#searchBoxContainer', selectedSuggestion);
            var manager1 = new Microsoft.Maps.AutosuggestManager({ map: map });
            manager1.attachAutosuggest('.searchBox1', '#searchBoxContainer', selectedSuggestion1);
            console.log(manager.getOptions());
        });

    }
    function selectedSuggestion(result) {
        //Remove previously selected suggestions from the map.
        // map.entities.clear();

        //Show the suggestion as a pushpin and center map over it.
        var pin = new Microsoft.Maps.Pushpin(result.location);
        map.entities.push(pin);
        map.setView({ bounds: result.bestView });
        document.getElementById('addressLineTbx').value = result.address.addressLine || '';
        p1  = result.address.addressLine;
        
        document.getElementById('cityTbx').value = result.address.locality || '';
        if(p1===undefined)
        p1 = result.address.locality;
        document.getElementById('countyTbx').value = result.address.district || '';
        document.getElementById('stateTbx').value = result.address.adminDistrict || '';
        document.getElementById('postalCodeTbx').value = result.address.postalCode || '';
        document.getElementById('countryTbx').value = result.address.countryRegion || '';
       
    }
     function selectedSuggestion1(result) {
        //Remove previously selected suggestions from the map.
        // map.entities.clear();

        //Show the suggestion as a pushpin and center map over it.
        var pin1 = new Microsoft.Maps.Pushpin(result.location);
        map.entities.push(pin1);
        map.setView({ bounds: result.bestView });
        document.getElementById('addressLineTbx1').value = result.address.addressLine || '';
        p2 =  result.address.addressLine;
        document.getElementById('cityTbx1').value = result.address.locality || '';
        document.getElementById('countyTbx1').value = result.address.district || '';
        document.getElementById('stateTbx1').value = result.address.adminDistrict || '';
        document.getElementById('postalCodeTbx1').value = result.address.postalCode || '';
        document.getElementById('countryTbx1').value = result.address.countryRegion || '';
        loca = p1+" "+p2;
        console.log(p1+" "+p2);
    
        
// ride1.save(); 
    }
    console.log(p1+""+ p2);
    console.log("this connection is still working");
   
    async function remove(){
   
//   await Ride.deleteMany({price: 15});
//   mongoose.connection.close();
    // for(var i  =0 ;i<4;i++)
    // await Person.deleteMany({rpice: 15});
};

app.listen(27017,function(err){
    if(err)
    console.log("err");
    else 
    console.log("the connections is established");
});

