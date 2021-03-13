require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const exerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        minlength: 3,
    },
    duration: {
        type: Number,
        required: true,
    },
    date: String,

})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    log: [exerciseSchema],
})

// userSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject._id = returnedObject._id.toString()
//       delete returnedObject.__v
//     }
// })

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = { User, Exercise };