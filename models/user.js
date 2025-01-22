const mongoose = require("mongoose");
const passport = require("passport");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Pintrest");

let userSchema = new mongoose.Schema({
    fullname:{
        type: String
    },
    username:{
        type: String 
    },
    email:{
        type: String
       
    },
    password:{
        type: String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
      }],
    dp:{
        type: String,
    },
})
userSchema.plugin(plm);
module.exports = mongoose.model("user",userSchema);