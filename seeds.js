var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

var data =[
        {
            name: "Lake Foggy",
            image: "https://farm5.staticflickr.com/4420/37403014592_c5f5d37906.jpg",
            description: "A nice lakeside campground. No bathroom.",
            price: "9.00"
        },
        {
            name: "Glacier Camp",
            image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg",
            description :"This campground is high in the Sierra Nevada. Great lanscape.",
            price: "19.00"
        },
        {
            name: "Desert Mesa",
            image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
            description :"Be ready for extreme temperatures if you choose to camp here",
            price: "15.00"
        },
        {
            name: "Cactus Camp",
            image: "https://farm4.staticflickr.com/3620/3425297746_432d1aa26d.jpg",
            description: "This campground is surrounded by cacti. No fires.",
            price: "15.00"
        }
    ];


function seedDB(){
    //remove all users
    User.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed all users from DB");
        //Add a user
        User.register(new User({username: "Victor" }), "pass", function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
                User.findOne({"username": "Victor"}, function(err, user){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(user);
                         //remove all campgrounds
                        Campground.remove({}, function(err){
                            if(err){
                                console.log(err);
                            }
                            console.log("Removed everything from DB");
                            //add a few campgrounds
                            data.forEach(function(seed){
                                Campground.create(seed, function(err, campground){
                                    if(err) {
                                        console.log(err);
                                    } else {
                                        User.findOne({"username": "Victor"}, function(err, user){
                                            if(err){
                                                console.log(err);
                                            } else {
                                                campground.author.id = user._id;
                                                campground.author.username = user.username;
                                                campground.save();
                                                console.log(campground);
                                                //create a comment
                                                Comment.create(
                                                    {
                                                        text: "This place sucks I hate it!!!!!!"
                                                    }, function(err, comment){
                                                        if(err){
                                                            console.log(err);
                                                        } else {
                                                            User.findOne({"username": "Victor"}, function(err, user){
                                                                if(err){
                                                                    console.log(err);
                                                                } else {
                                                                    comment.author.id = user._id;
                                                                    comment.author.username = user.username;
                                                                    comment.save();
                                                                    console.log(comment);
                                                                    campground.comments.push(comment._id);
                                                                    campground.save();
                                                                    console.log(campground);
                                                                }
                                                            });
                                                        }
                                                });
                                            }
                                        });
                                    }
                                });   
                            });
                        });
                    }
                });
            }
        });
    });
}

module.exports = seedDB;