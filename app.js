require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const config = require('config');

const useMiddleware = require('./middlewares/middleware')
const useRoutes = require('./routes/routes')

const app = express()

const MongoDB_URI = `mongodb+srv://${config.get('db-name')}:${config.get('db-password')}@cluster0.8tbzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

app.set('view engine', 'ejs')
app.set('views', 'views')


useMiddleware(app)    
useRoutes(app)


const PORT = config.get('port')
mongoose.connect(MongoDB_URI, { 
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('Database Connected')
        app.listen(PORT, () => {
            console.log(`Server is Running PORT ${PORT}`)
        })
    })
    .catch((err) => {
        return console.log(err)
    })
