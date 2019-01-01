require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}).then(() => console.log('DB is Connected')).catch(err => console.error(err));

const User = mongoose.model('User', require('./models/User')(Schema));

module.exports = { User };