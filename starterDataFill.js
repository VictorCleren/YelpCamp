var mongoose = require("mongoose");

var campgrounds = [
          {name: "Salmon Creek", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
          {name: "Mountain Goat's Rest", image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
          {name: "Granite Hill", image:"https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg", description: "This is a huge granite hill. No bathrooms. No water. Beautiful granite though!"},
    ];

mongoose.connect("mongodb://localhost/yelp_camp");

// SETUP OF DB SCHEMA
var campgroundsSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundsSchema);

campgrounds.forEach(function(campground){
    Campground.create(campground, function(err, newCampground){
       if(err){
           console.log(err);
       } else {
           console.log("New campground");
           console.log(newCampground);
       }
    });
});
