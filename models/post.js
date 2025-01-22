const mongoose = require("mongoose");

 
let postSchema = new mongoose.Schema({
     posttext: {
        type: String,
        required: true,
     },
     image:{
      type: String
     },
   
     createdAt:{
        type: Date,
        dafault: Date.now,
     },
     user:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user',
  }],
  likes: {
   type: [String],  
   default: []
 }
});
module.exports = mongoose.model("post",postSchema);