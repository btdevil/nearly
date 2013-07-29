  var nearly = window.nearly || {};
nearly.location = (function (nearly, $) {
    var process = {
            userLocation: null,
             userBBox: null,
             hasGeo: false,
             triedGeo: false,
        getUserBoundingBox: function () {
            var bbox = {}, that = this;
            bbox.minLat = Math.floor(that.userLocation.coords.latitude);
            bbox.maxLat = Math.ceil(that.userLocation.coords.latitude);
            bbox.minLon = Math.floor(that.userLocation.coords.longitude);
            bbox.maxLon = Math.ceil(that.userLocation.coords.longitude);
            return bbox;
        },
        setPosition: function (position) {
            return position;
        },
        geoSuccess: function(position){
            var that = nearly.location;
            that.userLocation = position;
            that.userBBox = that.getUserBoundingBox();
            that.hasGeo = true;
            that.triedGeo = true;
            that.changeText("Refresh my location");
        },
        geoError: function(msg){
            var that = nearly.location;
            that.hasGeo = false;
            that.triedGeo = true;
            that.changeText("Refresh my location");
            console.log("geo failed");
        },
        getUserLocation: function () {
            var that = this;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(nearly.location.geoSuccess, nearly.location.geoError);
            } else {
                that.hasGeo = false;
                that.userLocation = null;
            }

        },
        changeText: function(str){
            $("#location").text(str);
        },
        init: function(){
                var that = this;
                that.hasGeo = false;
                that.triedGeo = false;
            $("#location").click(function(e){
                e.preventDefault();
                if (nearly.location.hasGeo) {
                    nearly.gMaps.recenterMap();
                } else if (nearly.location.hasGeo === false && nearly.location.triedGeo === false) {
                    nearly.loader.showLoader();
                    nearly.location.getUserLocation();
                    nearly.isGeoDone = setInterval(function () {
                        if (nearly.location.triedGeo === true) {
                            if (nearly.location.hasGeo) {
                                window.clearInterval(nearly.isGeoDone);
                                //nearly.flickr.searchFlickr();
                                nearly.gMaps.recenterMap();
                                nearly.loader.hideLoader();
                            } else {
                                window.clearInterval(nearly.isGeoDone);
                                nearly.loader.hideLoader();
                                //nearly.flickr.handleError();
                            }
                        }
                    }, 500)

                }
            })
        }
    };
    return process;
})(nearly, $);
nearly.location.init();