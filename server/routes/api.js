const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Book = require ('../models/book');


const mongoose = require('mongoose');
const db = 'mongodb+srv://denlebedenko:A248bq74dd@cluster0-nrmdb.mongodb.net/users?retryWrites=true&w=majority'

mongoose.connect(db, err => {
    if(err){
        console.error(err)
    } else {
        console.log('connected to mongodb')
    }
})

router.get('/', (req, res) => res.send('From API route'))

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User (userData);

    user.save((error, registeredUser) => {
        if(error){
            console.log(error)
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({
        email: userData.email
    }, (error, user) => {
        if(error){
            console.log(error)
        } else {
            if(!user) {
                res.status(401).send('invalid email');
            } else if (user.password !== userData.password) {
                res.status(401).send('invalid password');
            } else { 
                res.status(200).send(user)
            }
        }
    })
})

router.post('/createbook', (req, res) => {
    let bookData = req.body;
    let book = new Book (bookData);
    book.save((error, addBook) => {
        if (error){
            console.log(error)
        } else {
            res.status(200).send(addBook);
        }
    })
})

module.exports = router;