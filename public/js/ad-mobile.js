(function(){
	'use strict'; 
	var urlRedirect = 'http://www.sharedfi.com';
	$('#video-ad').fadeIn(500, function(){
		$('#ad').get(0).play();
	});
	$('#ad').fadeIn(1000);
	$('#ad').bind('ended', function() {
		 $.ajax({
		     url: '/updateInfo', 
		     type: 'POST', 
		     contentType: 'application/json', 
		     success: redirect()
		 });
	});
	var redirect = function(){
		window.location.replace(urlRedirect);
	};
})();