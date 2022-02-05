const express = require("express");
const path = require('path');
const {sessionInfo} = require('./middleware/session')
const app = express();

// Routes
const login_register = require('./routes/login_register');
const home = require('./routes/mainPage');

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));    
// Motor de plantillas
app.set('view engine', 'ejs');  
// Vistas 
app.set('views', path.join(__dirname, './views'));  

// Configuración del servidor
app.set('port', process.env.PORT || 3000); //port setted or 3000

// middlewares              https://expressjs.com/en/guide/using-middleware.html
app.use((req, res, next) => {   //process the url's that the browser send
    console.log(`${req.url} -${req.method}`);   //request and shows the url and the method used
    next();  
});

app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(sessionInfo);

// routes
app.use('/', login_register); 
app.use('/home', home);


// start server
app.listen(app.get('port'), ()=>{
    console.log("Server on port ", app.get('port'))  //start server with the selected port
});
