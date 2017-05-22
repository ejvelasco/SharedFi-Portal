module.exports = function(app, nodemailer){
	app.post('/sendEmail', function(req, res){
	    var details = req.body;
	    var emailDetails = {
	    	name: details.firstName,
	    	email: details.email 

	    }
	    var re = {
	    	name: /^[a-zA-Z ]+$/, 
	    	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	    };
	    var makeCode = function(){
	        var text = "";
	        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	        for( var i=0; i < 4; i++ ){
	            text += possible.charAt(Math.floor(Math.random() * possible.length));
	        }
	        return text;
	    }
	    var errors = false;
	    for(var detail in emailDetails){
	    	if(!re[detail].test(emailDetails[detail])){
	    		res.json({error: detail});
	    		errors = true;
	    	}
	    }
	    if(!errors){
	    // create reusable transporter object using the default SMTP transport
	    var transporter = nodemailer.createTransport({
	        service: 'Gmail',
	        auth: {
	            user: 'velasco810@gmail.com',
	            pass: 'getafe.22'
	        }
	    });
	    // send mail with defined transport object
	    var code = makeCode();
	    transporter.sendMail({
	        to: emailDetails.email, 
	        subject: 'Your SharedFi Code', 
	        html: 'Hello '+emailDetails.name+', click <a href ="http://localhost:8080/redirect">here</a>.'
	    }, function(err){
	    	if(err && errors == false){
	    		res.json({error: 'service'});
	    	}else{
	    		res.json({error: false, code: code});
	    	}
	    });
		}
  });
};