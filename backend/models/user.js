const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = mongoose.Schema.ObjectId;


const User = new schema({
    name: {type:String, required: true},
    email: {type: String, unique: true, required: true },
    passwordHash: String,
    createdAt: {type: Date, default: Date.now}
})


const userModel = mongoose.model("User", User);

module.exports = {
    userModel: userModel
}