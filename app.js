const express = require('express');
const favicon = require('serve-favicon');
const cors = require("cors");
require('dotenv').config();
const router_home = require('./routes/router_home')
const router_api = require('./routes/router_api')
const path = require('path');
const methodOverride = require('method-override');


const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:process.env.PORT"
};

app.use(cors(corsOptions));


app.use("/public", express.static(path.join(__dirname, 'public')));
app.use("/utils", express.static(path.join(__dirname, 'utils')));

//View engine
app.set('view engine', 'pug');
app.set('views','./views');

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(favicon(__dirname + '/public/assets/favicon.ico'));

//Routes
app.use('/', router_home);
app.use('/api', router_api);


app.get('*',  (req, res) => {
    res.status(404).render('404')
  });


app.listen(port, () => {
    console.log(`Server listen at http://localhost:${port}`);
});