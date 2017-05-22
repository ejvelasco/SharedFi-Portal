// var arp = require('node-arp');
module.exports = function(app, arp, sys, exec, get_ip){
	app.post('/allowUser', function(req,res){
		//GET CLIENT IP Address
		var ip_info = get_ip(req);
		console.log(ip_info.clientIp);
		arp.getMAC(ip_info.clientIp, function(err, mac) {
		if (!err) {
		  	var cmdAllow = 'sudo iptables -t mangle -I dns 1 -m mac --mac-source '+mac+' -j RETURN';
		  	console.log(cmdAllow);
		  	function puts(error, stdout, stderr) { sys.puts(stdout) }
		  	exec(cmdAllow, puts);
		  	setTimeout(function(){
		  		var cmdSession = 'sudo iptables -D dns -t mangle -m mac --mac-source '+mac+' -j RETURN';
		  		console.log(cmdSession);
		  		exec(cmdSession, puts);
		  	}, 60*1000);
		  	res.json({success: true});
		  }else{
		  	console.log(err);
		  }
		}) ;
	});
};