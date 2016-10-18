var express = require('express');
var app = express();

var apiRouter = require('./routers.js'); 
var staticRouter = require('./staticRouters.js');
var cookieRouter = require('./cookieRouter.js');

//both index.js and things.js should be in same directory
app.use('/api', apiRouter); 
app.use('/static', staticRouter);
app.use('/cookie',cookieRouter);

app.listen(3000);

//To-Do
//add JWT