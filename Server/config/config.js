const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ExistingUsers",{
}).then(()=>{
    console.log("Database connected successfully");
}).catch(()=>{
    console.log("Database not connected");
})