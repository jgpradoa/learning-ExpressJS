var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cookieRouter = express.Router();
cookieRouter.use(cookieParser());
cookieRouter.use(bodyParser.json());
cookieRouter.use(bodyParser.urlencoded({ extended: true }));

//Method:POST
//	creating cookie using key and value
cookieRouter.post('/', function(req, res){
	//Check if all fields are provided and are valid:
    var key = req.body.key;
    var value = req.body.value;
    if(!key || !value){
        res.status(401);
        res.json({message: "Bad Request"});
    }
    else{
        res.cookie(key, value, { maxAge: 900000, httpOnly: true }); //, secure: true --- to hide the cookie
    	res.send('We have stored the id in the cookie ' + req.params.id);
    }
});


//Method:GET
//	getting cookie using key
cookieRouter.get('/:key', function(req, res){
    var key = req.params.key;
    var value = req.cookies[key]; 
    if(key && value)
    	res.send('value is: ' + value);
    else
    	res.send('id is not set');
});

//Method:PUT
//	updating cookie using key
cookieRouter.put('/:key/:value', function(req, res){
    var key = req.params.key;
    var value = req.params.value;

    if(key && value){
    	if(req.cookies[key]){
	    	res.cookie(key, value, { maxAge: 900000, httpOnly: true }); //, secure: true --- to hide the cookie
	       	res.send(key + ' has been updated');    		    	
	    }else{
	    	res.status(401);
        	res.json({message: "null"});
	    }
    }else{
    	res.status(400);
        res.json({message: "Bad Request"});
    }
});

//Method:DELETE
//	deleting cookie with the following key
cookieRouter.delete('/:key', function(req, res){
    var key = req.params.key;
    if(key){
	    res.clearCookie(key);
	    res.send('cookie foo cleared');
	}else{
		res.status(400);
        res.json({message: "Key doesn't exist"});
	}        
});


//export this router to use in our app.js
module.exports = cookieRouter;