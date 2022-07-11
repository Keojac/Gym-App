const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExerciseSchema = new Schema ({
    name: String,
    targets: String,
    form: [String],
    images: [String],
    user_id: String
})


const Exercise = mongoose.model('Exercise', ExerciseSchema)


module.exports = Exercise
