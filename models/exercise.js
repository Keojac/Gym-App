const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExerciseSchema = new Schema ({
    name: String,
    targets: [String],
    form: [String],
    images: {type: String, default: 'https://loremflickr.com/300/200/gym'},
    user_id: String
})


const Exercise = mongoose.model('Exercise', ExerciseSchema)


module.exports = Exercise
