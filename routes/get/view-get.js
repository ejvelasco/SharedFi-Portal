var hasOwnProperty = Object.prototype.hasOwnProperty;
function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}
module.exports = function(app,p, get_ip, geoip){
	// app.get('/', function(req,res){
	// 	var userAgent = req.headers['user-agent'];
 //        var ip_info = get_ip(req);
 //        var ip = "207.97.227.239";
 //        var geo = geoip.lookup(ip);
 //        var lang = req.headers["accept-language"];
	// 	if (/mobile/i.test(userAgent)){
 //    		if(isEmpty(req.cookies)){
 //                if(geo.country === 'US' || geo.country === undefined){
 //                    res.render('register-mobile');    
 //                } else if(geo.country ==='MX'){
 //                    res.render('register-mobile-esp');
 //                }
 //            } else{
 //                res.render('ad-mobile');
 //            }

 //    	} else{
 //    		if(isEmpty(req.cookies)){
 //                if(geo.country === 'US' || geo.country === undefined){
 //                    res.render('register-desk');
 //                }else if (geo.country === 'MX'){
 //                    res.render('register-desk-esp');
 //                }
 //            }else{
 //                res.render('ad-desk');
 //            }
            
 //    	}
	// });
	app.get('/deals', function(req,res){
		var userAgent = req.headers['user-agent'];
		if (/mobile/i.test(userAgent)){
    		res.render('deals-mobile');	
    	} else{
    		res.render('deals-mobile');
    	}
    });
    app.get('/redirect', function(req, res){
        res.render('ad-desk');
    });
    app.get('/mvp', function(req,res){
    	res.render('mvp');
	});
    app.get("/", function(req,res){
        res.render("form");
    });
    app.post("/form", function(req, res){
        console.log(req.body);
        res.json({success: true});
    })
}
	