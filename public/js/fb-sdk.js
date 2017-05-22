(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = '//connect.facebook.net/en_US/sdk.js';
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
//START SDK
window.fbAsyncInit = function() {
  FB.init({
    appId      : '700490280110185',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();
  //GET LOGIN STATUS
  FB.getLoginStatus(function(response) {
  statusChangeCallback(response); 
  });
};
//SHOW AD AND REDIRECT
var showAdRedirect = function(){
  $('#video-ad').fadeIn(500, function(){
    $('#ad').get(0).play();
  });
  $('#terms').fadeOut('slow');
  $('#ad').fadeIn(1000);
  $('#ad').bind('ended', function() {
    window.location.replace('http://www.sharedfi.com');
  });
};
//UPDATE USER AND REDIRECT
// var updateAndRedirect = function(){
//   FB.api('/me', {fields: 'email'}, function(response) {
//     $.ajax({
//         url: '/updateInfoFB', 
//         type: 'POST', 
//         contentType: 'application/json', 
//         data: JSON.stringify(response), 
//         success: function(res){
//           console.log(res.data);
//         }
//     });
//   });
// };
//ON LOGIN
$('.fb-login').on('click', function(){
  FB.login(function(response) {
    callFBAPI();
  }, {scope: 'email,public_profile'});
});
//call FB API
var callFBAPI = function() {
  FB.api('/me', {fields: ['name', 'email','id', 'birthday', 'gender', 'age_range', 'picture']}, function(response) {
      //NEW ENTRY IN DB
     $.ajax({
         url: '/submitInfoFB', 
         type: 'POST', 
         contentType: 'application/json', 
         data: JSON.stringify(response), 
         success: showAdRedirect()
     });
  });
};
//ON STATUS CHANGE
var statusChangeCallback = function(response) {
   if (response.status === 'connected') {
      //CHECK IF USER IS REGISTERED
      FB.api('/me', {fields: 'email'}, function(response) {
        $.ajax({
            url: '/isRegisteredFB', 
            type: 'POST', 
            contentType: 'application/json', 
            data: JSON.stringify(response), 
            success: function(res){
              if(res.registered){
                showAdRedirect();
                $.ajax({
                  url: '/updateInfoFB',
                  type: 'POST',
                  contentType: 'application/json', 
                  data: JSON.stringify(response)
                });
              } else{
                $('#container').fadeIn('slow');
              }
            }
        });
      });
   } else{
      $('#container').fadeIn('slow');
   }
 };

