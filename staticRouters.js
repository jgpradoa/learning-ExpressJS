var express = require('express');

var staticRouter = express.Router();

staticRouter.use('/', express.static('public'));

//export this router to use in our app.js
module.exports = staticRouter;