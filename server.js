var express = require('express');
var port = process.env.PORT || 3000;
var app = module.exports = express();
var cors = require('cors');

var mongoose    = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./config');

var middlewareAuth = require('./api/middlewares/authenticate');
var indexRoutes = require('./api/routes/index');
var userRoutes = require('./api/routes/user');
var categorieRoutes = require('./api/routes/categorie');
var sousCategorieRoutes = require('./api/routes/sousCategorie');
var itemRoutes = require('./api/routes/item');
var empruntRoutes = require('./api/routes/emprunt');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database'); //at ' + mongoUri);
});

app.set('superSecret', config.secret); // secret variable
app.set('secret_access_create_admin', config.secret_access_create_admin); // secret variable

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//routage
app.use('/', indexRoutes);
app.use('/users', [middlewareAuth, userRoutes]);
app.use('/categories', categorieRoutes); // TODO [middlewareAuth, userRoutes]
app.use('/sousCategories', sousCategorieRoutes); // TODO [middlewareAuth, userRoutes]
app.use('/items', itemRoutes); // TODO [middlewareAuth, userRoutes]
app.use('/emprunts', empruntRoutes); // TODO [middlewareAuth, userRoutes]


app.listen(port);


console.log('Bon coin RESTful API server started on: ' + port);
