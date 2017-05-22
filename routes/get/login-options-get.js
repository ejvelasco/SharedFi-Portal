module.exports = function(app, connection){
	app.get('/getLoginOptions',function(req, res){
		connection.query('SELECT * FROM T_SharedPi_Register', function(error, results, fields){
			if(error){
				throw error; 
			} else{
				var options = results[0];
				var parsedOptions = {}; 
				for(option in options){
					parsedOptions[option] = options[option];
				}
				res.json(parsedOptions);
			}
		});
	});
}