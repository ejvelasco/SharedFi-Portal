var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');

module.exports = function(passport, connection) {


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		connection.query("select * from T_DNS_USERS where id = "+id,function(err,rows){	
			done(err, rows[0]);
		});
	});

	passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL,
	    profileFields: ['email','id', 'first_name', 'gender', 'last_name', 'picture']
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	console.log(profile);
	    	process.nextTick(function(){
	    		var infoS = {
	    			firstN: profile.name.givenName,
	    			lastN: profile.name.familyName,
	    			token: token,
	    			email: profile.emails[0].value,
	    			facebookId: profile.id,
	    			gender: profile.gender[0]
	    		};
	    		connection.query('INSERT INTO T_DNS_USERS SET ?',infoS, function(err){
	    			if(err){
	    				console.log(err.message);
	    			}else{
	    				console.log('Data inserted');
	    				return done(null, infoS);
	    			}
	    		});
	    	});
	    }

	));
};