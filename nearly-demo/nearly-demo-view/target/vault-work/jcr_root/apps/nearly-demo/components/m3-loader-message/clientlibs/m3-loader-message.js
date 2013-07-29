nearly.loader = (function(nearly, $){
	var process = {
		cqLoaderAjax: window.location.toString().split(".html")[0] + "/jcr:content/par/m3_loader_message.json",
		loadsInProgress: 0,
		loader: $("#loaderMessages"),
		flMessage: null,
		twMessage: null,
		fbMessage: null,
		ldMessage: "Getting your location...",
		loadDiv: $("#overlay"),
		showSubLoader: function(){
			this.loader.fadeIn();
		},
		hideSubLoader: function(){
			var that = this;
			if(that.loadsInProgress === 0){
				that.loader.fadeOut();
			}
		},
		init: function(){
			var that = this;
			$.ajax({
				url: that.cqLoaderAjax,
				success: that.gotMessages,
				context: that
			})
		},
		gotMessages: function(json){
			var that = this;
			if(typeof json.flickrMessage !== "undefined"){
				that.flMessage = json.flickrMessage;
			}
			if(typeof json.twitterMessage !== "undefined"){
				that.twMessage = json.twitterMessage;
			}
			if(typeof json.facebookMessage !== "undefined"){
				that.fbMessage = json.facebookMessage;
			}
			if(typeof json.locationMessage !== "undefined"){
				that.ldMessage = json.locationMessage;
			}
		},
		showMessage: function(messageType){
			var that = this, messageText = "", newMessage = null;
			that.loadsInProgress++;
			switch(messageType){
				case "flickr":
				messageText = that.flMessage;
				break;
				case "facebook":
				messageText = that.fbMessage;
				break;
				case "twitter":
				messageText = that.twMessage;
			}
			newMessage = that.loader.append('<p id="'+messageType+'" class="loaderMessage">'+messageText+'</p>');
			that.loader.find("#"+messageType).fadeIn();
		},
		hideMessage: function(messageType){
			var that = this;
			that.loader.find("#"+messageType).fadeOut();
			that.loadsInProgress--;
			that.hideSubLoader();
		},
        showLoader: function(text){
            var that = this;
            if(typeof text === "undefined"){
            	that.loadDiv.find("#overText").text(that.ldMessage);
            }else{
            that.loadDiv.find("#overText").text(text);
        	}
            that.loadDiv.show();
        },
        hideLoader: function(){
            var that = this;
            that.loadDiv.hide();
        }
	}
	return process;
})(nearly, $);

nearly.loader.init();