    const mongoose = require('mongoose')
    const MONGODB_URI = process.env.MONGO_URI;

    mongoose.set('strictQuery', true);

        mongoose.connect(MONGODB_URI, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS : 30000 
        })
        .then(() => {
            console.log("Connection to DB done")
        })
        .catch((err) => {
            console.log('Error connecting to DB: ',err);
        })

