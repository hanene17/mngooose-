
const mongoose= require("mongoose")
const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGOdb_URI || 'mongodb://localhost/person',  {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("db successfuly connected")
    }
    catch (error) {
        console.log(error)
    }
}

module.exports=connectdb