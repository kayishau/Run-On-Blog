const express = require('express')
const mongoose = require('mongoose')
const Health = require('./models/blog_input.js')
const methodOverride = require('method-override')

const app = express()

// Syntax to provide our form the method to use
app.use(methodOverride('_method'))
//To send json data back and forth with no issues
app.use(express.urlencoded({extended: true}))
// So that we can link staic files 
app.use(express.static("public"))

// Getting our index.ejs file and rendering it on browser at health route
app.get('/health', (req,res) => {
    Health.find({}).then((allHealth) => {
        res.render('index.ejs', {
            health: allHealth
        })
    })
})

// Getting our mental.ejs file and rendering it in our browwser at health/mental route
app.get('/health/mental', (req, res) => {
    res.render('mental.ejs')
})

app.get('/health/:id', (req, res) =>{
    Health.findById(req.params.id).then((foundPost) => {
        res.render('show.ejs', {
            health: foundPost
        })
    })
})

// This ia a route to catch all tags
app.get('/tags/:tag', (req, res) => {
    console.log(req.params.tag);
    Health.find({tag: req.params.tag}).then((foundTags) => {
        res.send(foundTags)
    })
})

// This is the create route
app.post('/health', (req, res) => {
    // Create method
Health.create(req.body).then((healthBlogInput) => {
    res.redirect('/health')
})
})
// This is the delete route
app.delete('/health/:id', (req, res) => {
    Health.findByIdAndRemove(req.params.id).then(() => {
        res.redirect('/health')
    })
})

// This is the edit route
app.put('/health/:id', (req,res) => {
    Health.findByIdAndUpdate(req.params.id, req.body).then(() => {
        res.redirect('/health')
    })
})
// This is the edit route (show route that allows us to edit)
app.get('/health/:id/edit', (req,res) => {
    Health.findById(req.params.id).then((foundPost) => {
        res.render('edit.ejs', {
            health: foundPost
        })
    })
})
// * NOTES/QUESTIONS * //
// 1. cannot get the created model to show up as it is created in the terminal

// Connects mongodb to mongoose
mongoose.connect('mongodb://localhost:27017/blogcrud').then(() => {
    console.log('connection with mongo established');
})

app.listen(3000, () => {
    console.log("hi kayisha, i'm listening..");
})