const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch(e) {
        console.error(e);
    }
}

module.exports = connectDB