const express= require("express");
const cors = require('cors');

const app= express();
app.use(express.json());

app.use(cors());
const dbconnect= require('./config/connectdb')
const Person= require('./models/person ')
require('dotenv').config({path: './.env'})
dbconnect()

const PORT= process.env.PORT

const createAndSavePerson = function(done) {
    const emyLee = new Person({
      name: "emyLee",
      age: 38,
      favoriteFoods: ['tuna', 'bread']
    });
  
    emyLee.save((err, data) => {
      if (err)
        return done(err);
      return done(null, data);
    });

   const arrayOfPeople=[{name:"JImmy",age:44,favoriteFood:["Fruit", "Cereal", "Italian", "Chocolate"]},
                   {name:"Johnny",age:17,favoriteFood:["BBQ", "Salad", "Italian", "Choclate"]}];

const createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, (data, err) =>{
      if (err) {
        return done(err);
      }
      return done(null, data);
    });
};
const findOneByFood = function(food, done) {
    Person.findOne({favouriteFoods: food}, function(err, data) {
      if(err) return done(err);
      return done(null, data);
    });  
  };
 const findPersonById = function(personId, done) {
    const person = Person.findById({_id: personId}, function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
  };

  var findEditThenSave = function(personId, done) {
    const itemToAdd = 'mtabga'
    const person = Person.findById({_id: personId}, function(err, data){
      if (err) {
        return done(err)
      }
      data.favoriteFoods.push(itemToAdd)
      data.save(function(err, data){
        if (err) {
          return done(err)
        }
        else {
          return done(null, data)
        }
      })
    })
  }
  const findAndUpdate = function(personName, done) {
   const ageToSet = 20
    const person = Person.findOneAndUpdate({name: personName}, {age: 20}, {new: true}, function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
  }
  
  const removeById = function(personId, done) {
    const person = Person.findByIdAndRemove({_id: personId}, function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
  }
  
  const removeManyPeople = function(done) {
   const nameToRemove = "emyLee";
    const person = Person.remove({name: nameToRemove}, function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
  }
  const queryChain = function(done) {
    const foodToSearch = "burrito";
    const people = Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec(function(err, data){
      if (err) {
        done(err)
      }
      else {
        done(null, data)
      }
    })
  }

};





app.listen(PORT,(err)=>{
    err ? console.error(err): console.log(`server is running on port ${PORT}!`)
})