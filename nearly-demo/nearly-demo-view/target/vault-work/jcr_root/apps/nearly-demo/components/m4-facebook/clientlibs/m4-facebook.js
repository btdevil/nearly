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
			 		nearly.FB.saveTokens();
	    		} else if (response.status === 'not_authorized') {
					FB.login();
	    		} else {
	    			FB.login();
	    		}
	    	});
	    },
	    processResults: function(json){
	      console.log(json);
	    },
	    saveTokens: function(){
	       var that = this;
	       that.tokens = FB.getAuthResponse();
	       console.log(nearly.FB.tokens);
	    },
	    getCheckins: function(){
	    	var that = this, uCoords = nearly.location.userLocation.coords;

            $.ajax({
                url: "https://graph.facebook.com/search?type=location&center="+uCoords.latitude+","+uCoords.longitude+"&distance=1000&accessToken="+that.tokens.accessToken,
                success: that.processResults,
                context: that
            })

	    }
	}
	return process;
})(nearly, $)

