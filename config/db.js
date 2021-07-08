const { connect } = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await connect('mongodb://localhost/merntasks', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('database is connected!');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;