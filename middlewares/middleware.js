const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const config = require('config')
    

const { bindUserWithRequest } = require('./authMiddlewares')
const setLocals = require('./setLocals')


const MongoDB_URI = `mongodb+srv://${config.get('db-name')}:${config.get('db-password')}@cluster0.8tbzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


const store = new MongoDBStore({
     uri: MongoDB_URI,
     collection: 'sessions',
     expires: 1000 * 60 * 60 * 24 * 7, // 1 Week
 });
     

const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: config.get('secret-key'),
        resave: false,
        saveUninitialized: false,
        store:store,
    }),
    flash(),
    bindUserWithRequest(),
    setLocals()
]

module.exports = app => {
    middleware.forEach(m => {
        app.use(m)
    })
}