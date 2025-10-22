const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = mongoose.Schema.ObjectId;

mongoose.connect(process.env.MONGO_URL);

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