const express = require('express');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const categoryRouter = require('./controllers/categorycontroller.js');
const customerRouter = require('./controllers/customercontroller.js');

const feedbackRouter = require('./controllers/feedbackcontroller.js');
const productRouter = require('./controllers/productcontroller.js');
const categoryproductRouter = require('./controllers/categoryproductcontroller.js');
const orderRouter = require('./controllers/ordercontroller.js');
const orderproductRouter = require('./controllers/orderproductcontroller.js');
const paymentRouter = require('./controllers/paymentcontroller.js');
const cors = require('cors');
const db = require('./models');
const productManager = require('./services/productservices.js');
const app = express();
var port = 4500;
let ref = uuidv4();

app.use(express.static(__dirname + '/public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('./uploads'));
app.use(cors());
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`app listening on http://localhost:${port}`);
    })
});

app.get('/', (req, res) => {
    res.status(200).send('welcome to our e-commerce website')
})

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'rahman',
        email: 'kareemrahman@gmail.com'
    }
    const accessTokenSecret = 'privateKey';

    const accessToken = jwt.sign({ user: user }, accessTokenSecret, { expiresIn: '30s' });
    res.json({
        accessToken
    });

});
app.post('/api/posts', verifyToken, (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'privateKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                message: 'post created..',
                authData
            })
        }
    });
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    //checks if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // split at the space 
        const bearer = bearerHeader.split('');
        //Get token from array
        const bearerToken = bearer[1];
        //set the token 
        req.token = bearerToken
        next();
    }
    else {
        res.sendStatus(403);
    }
}

app.use('/categories', categoryRouter);
app.use('/customers', customerRouter);
app.use('/feedbacks', feedbackRouter);
app.use('/products', productRouter);
app.use('/categoryproducts', categoryproductRouter);
app.use('/orders', orderRouter);
app.use('/payments', paymentRouter);
app.use('/orderproducts', orderproductRouter);

