require('dotenv').config()
const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    port = 3000,
    app = express(),
    checkForSession = require('./middlewares/checkForSessions'),
    swagController = require('./controllers/swag_controller'),
    authController = require('./controllers/auth_controller'),
    cartController = require('./controllers/cart_controller'),
    searchController = require('./controllers/search_controller');

app.use(express.static(`${__dirname}/build`))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {}
}))

app.use(checkForSession)

app.use(bodyParser.json());

app.get('/api/swag', swagController.read)

app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)
app.post('/api/cart', cartController.add)
app.post('/api/cart/checkout', cartController.checkout)
app.delete('/api/cart', cartController.delete)
app.get('/api/search', searchController.search)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})