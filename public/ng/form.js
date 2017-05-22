var urlRedirect = 'http://www.sharedfi.com';
var form = angular.module('form', [])
	.controller('formInfo', ['$scope','$http', '$window',function($scope, $http, $window) {
  	 //SHOW SELECTED OPTIONS FROM DB
  	 $scope.flags = {};
  	 $http.get('/getLoginOptions').then(function(res){
  	 	var options = res.data;
  	 	for(option in options){
  	 		$scope.flags[option] = options[option];
  	 	}
  	 	console.log($scope.flags);
  	 	if($scope.flags.form === 0){
	  	 	$('#terms').fadeOut('slow');
		   	$('#video-ad').fadeIn(500, function(){
		    	$('#ad').get(0).play();
		    });
		    $('#ad').fadeIn(1000);
		    $('#ad').bind('ended', function() {
		      $window.location.href = urlRedirect;
		    });
  	 	}
  	 });
  	
  	 $scope.formInfo = {};
  	 $scope.sendEmail = function(info){
  	 	if(info.email == undefined || info.firstName == undefined || info.lastName === undefined){
  	 		var error = 'All of the information above is required.';
	    		$('#error').text(error).fadeIn();
	    		setTimeout(function(){
	    			$('#error').fadeOut(500);
	    		}, 4000);
	    	return;
  	 	}
  	 	if($('#sendEmail').text() === 'Email Sent!'){
  	 		return;
  	 	}
	 	$http.post('/sendEmail', info).then(function(res){
	    	var status = res.data;
	    	if(!status.error){
	    		//SAVE EMAIL DATA AND TIMEOUT IF NO CONFIRMATION
	    		$http.post('/submitInfoEmail', info).then(function(res){
	    			console.log('user saved');
	    			//ALLOW IP TABLES
	    			// $http.post('/allowUser', {true: true}).then(function(res){
	      			// 	if(res.data.success){
	      			// 		$window.location.href = 'http://www.sharedfi.com';
	      			// 	}
	      			// });
	    		});

	    		$('#sendEmail').css('background-color', '#2EAA62');
	    		$('#sendEmail').text('Email Sent!');
	    		$scope.formInfo.code = status.code;
	    	}else{
	    		var error = 'Please enter a valid email.';
	    		$('#error').text(error).fadeIn();
	    		setTimeout(function(){
	    			$('#error').fadeOut(500);
	    		}, 4000);
	    		
	    	}
  	 	});
	 };
  	 $scope.sendSMS = function(info) {
  	 	if(info.phone == undefined){
  	 		var error = 'Please enter a valid phone number.';
	    		$('#error').text(error).fadeIn();
	    		setTimeout(function(){
	    			$('#error').fadeOut(500);
	    		}, 4000);
  	 	}
  	 	if($('#sendSMS').text() === 'Code Sent!'){
  	 		return;
  	 	}
	 	$http.post('/sendSMS', info).then(function(res){
	    	var status = res.data;
	    	if(status.success){
	    		$('#sendSMS').css('background-color', '#2EAA62');
	    		$('#sendSMS').text('Code Sent!');
	    		$scope.formInfo.code = status.code;
	    	}else{
	    		var error = 'Please enter a valid phone number.';
	    		$('#error').text(error).fadeIn();
	    		setTimeout(function(){
	    			$('#error').fadeOut(500);
	    		}, 4000);
	    		
	    }
	});
    };
    $scope.submitInfo = function(info){
    	var l = 0;
    	for(term in info){
    		l++;
    	}
    	if(l < 6){
    		var error = 'Every field above is required to connect.';
    		$('#error').text(error).fadeIn();
	    		setTimeout(function(){
	    			$('#error').fadeOut(500);
	    		}, 4000);
    	}else if(!info.terms){
    		var error = 'Please agree to our Terms of Service.';
    		$('#error').text(error).fadeIn();
	    		setTimeout(function(){
	    			$('#error').fadeOut(500);
	    		}, 4000);
    	}else{
    		//SHOW AD
    		$http.post('/submitInfo', info).then(function(res){
	      		var status = res.data;
	      		console.log(res.data);
	      		if(status.success){
	      			$('#connect').hide();
    				$('#loading').fadeIn('fast');
    				$('#terms').fadeOut('slow');
	      			$('#video-ad').fadeIn(500, function(){
	      				$('#ad').get(0).play();
	      			});
	      			$('#ad').fadeIn(1000);
	      			$('#ad').bind('ended', function() {
	      				$window.location.href = urlRedirect;
	      			});
	      			// $http.post('/allowUser', {true: true}).then(function(res){
	      			// 	if(res.data.success){
	      			// 		$window.location.href = 'http://www.sharedfi.com';
	      			// 	}
	      			// });
	      		} else{
	      			var infoTrans =	{
	      				firstName: 'last name',
						lastName: 'first name',
						email: 'email',
						code: 'code'
					};
	      			var error = 'Please enter a valid '+ infoTrans[status.error] +'.';
	      			$('#error').text(error).fadeIn();
	    				setTimeout(function(){
	    					$('#error').fadeOut(500);
	    				}, 4000);
	      		}
	      	});
    	}
	}
}]);
