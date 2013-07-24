$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.init({
      	appId: '496297027143316',
      	//channelUrl: '//yourapp.com/channel.html',
      	status     : true, // check login status
    	cookie     : true, // enable cookies to allow the server to access the session
    	xfbml      : true  // parse XFBML
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
	nearly.FB.init();
  });
});

(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
}(document));

nearly.FB = (function(nearly, $){
	var process = {
		tokens: null,
		init: function(){
			FB.Event.subscribe('auth.authResponseChange', function(response) {
			 	if (response.status === 'connected') {
			 		nearly.FB.testAPI();
	    		} else if (response.status === 'not_authorized') {
					FB.login();
	    		} else {
	    			FB.login();
	    		}
	    	});
	    },
	    testAPI: function(){
	    	console.log('Welcome!  Fetching your information.... ');
	    	FB.api('/me', function(response) {
	      	console.log('Good to see you, ' + response.name + '.');
	      	});
	    	this.tokens = FB.getAuthResponse();

	    }
	}
	return process;
})(nearly, $)

