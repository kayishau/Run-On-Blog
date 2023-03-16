const mongoose = require('mongoose')

const healthSchema = new mongoose.Schema({
    name: { type: String, required: true},
    date: { type: String},
    title: { type: String, required: true},
    excert: { type: String, required: true},
    image: { type: String, required: true},
    tag: { type: String, required: true, lowercase: true}
})

const healthCollection = mongoose.model('Health', healthSchema)

module.exports = healthCollection