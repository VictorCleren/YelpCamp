var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user")

function seedDbUsers(){
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
                        console.log(user._id);
                    }
                });
                User.findOne({"username": "Victor"}, function(err, user){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(user.username);
                    }
                });

            }
        });
    });
}

module.exports = seedDbUsers;