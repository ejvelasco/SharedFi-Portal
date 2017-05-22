var dealApp = angular.module('dealsApp', [])
	.controller('deals', ['$scope','$http', '$window',function($scope, $http, $window) {
	  	// $http.get('http://synerde1.w02.wh-2.com/Webservice1.asmx?op=HelloWorld').then(function(res){
	  	// 	console.log(res.data);
	  	// });
	  	$scope.deals = [
	  	 	{title: 'Deal 1', desc: 'Desc 1', loc: 'Location 1', thumb:'/img/bimbo.png', img: '/img/bread.jpeg'},  
	  	 	{title: 'Deal 2', desc: 'Desc 2', loc: 'Location 2', thumb:'/img/greatvaluelogo2.png', img: '/img/veggie.jpg'}, 
	  	 	{title: 'Deal 3', desc: 'Desc 3', loc: 'Location 3', thumb:'/img/tyson.png', img: '/img/meat.jpg'}
	  	];
	  	$(document).on('click', '.icn', function(e){
	  	    var index = $(this).attr('id').replace('icn-', '');
	  	    $('#ad').attr('src', $scope.deals[index].img);
	  	    $('#banner').show("slide", { direction: "right" }, 500);
	  	});
	  	$(document).on('click', '#back', function(e){
	  	    $('#banner').hide("slide", { direction: "right" }, 500);
	  	});
    }]);