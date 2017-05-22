module.exports = function(app,client){
	app.post('/sendSMS', function(req,res){
		var phone = req.body.phone;
		if(req.body.phone == undefined){
			res.json({'success': false});
			return;
		}
		phone = '+1'+phone.replace('(', '').replace(')', '').replace(' ', '').replace('-', '');
		var makeCode = function(){
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		    for( var i=0; i < 4; i++ ){
		        text += possible.charAt(Math.floor(Math.random() * possible.length));
		    }
		    return text;
		}
		var code = makeCode();
		client.sendMessage({
		    to: phone, 
		    from: '+15123097199', 
		    body: 'Hello ' + req.body.firstName + ', your SharedFi code is: ' + code 
		}, function(err, responseData) { 
		    if (!err) {
		        console.log(responseData.body);
		        res.json({'success': true, 'code': code});
		    } else if(err){
		    	console.log(err);
		    	res.json({'success': false});
		    }
		});
		
	});	
};