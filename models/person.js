
const mongoose = require("mongoose");
const mongoDB = require("mongodb");
mongoose.connect(process.env.MONGO_URI);
const { Schema } = mongoose;

const personSchema = new Schema({
name: {type: String, required: true},
age: {type: Number},
favoriteFoods: {type: [String]},
});


module.exports = Person = mongoose.model("person", personSchema)  ;
