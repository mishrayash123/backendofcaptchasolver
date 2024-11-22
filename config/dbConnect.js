const mongoose = require('mongoose');
MONGO_URI = "mongodb+srv://yash786:yash786@cluster0.6eoka05.mongodb.net/";

const database = async ()=>{
    try{
       await mongoose.connect(MONGO_URI);
        console.log('Database connected');
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = database;