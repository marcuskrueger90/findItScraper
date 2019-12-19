var bodyParser = require ('body-parser')
var mongoose = require('mongoose')
var logger = require ('morgan')

var express = require ('express')
var app = express()

app.use(logger('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

app.use(express.static(process.cwd()+'/public'));

var exphbs = require ('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine','handlebars');

mongoose.connect('mongodb://localhost/findItScraper')
var db =mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=>console.log('Connected to Mongoose!'))
var PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Listening on http://localhost:${PORT}`)); 