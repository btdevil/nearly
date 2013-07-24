var nearly = window.nearly || {};
nearly.gMaps = (function (nearly, $) {
    var process = {
        map: null,
        gLatLong: null,
        meMarker: null,
        init: function(){
            var that = this;
            google.maps.event.addDomListener(window, 'load', this.mapInit);
        },
        mapInit: function(){
            var that = nearly.gMaps;
            var mapOptions = {
                center: new google.maps.LatLng(-34.397, 150.644),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            that.map = new google.maps.Map(document.getElementById("gMap"), mapOptions);
        },
        recenterMap: function(){
            var that = this;
            that.gLatLong = new google.maps.LatLng(nearly.location.userLocation.coords.latitude, nearly.location.userLocation.coords.longitude)
            that.map.setCenter(that.gLatLong);
            that.map.setZoom(15);
//            that.meMarker = new google.maps.Marker({
//                map:that.map,
//                position: that.gLatLong,
//                draggable:false,
//                animation: google.maps.Animation.DROP,
//            })
            that.dropPin(that.gLatLong, [{title: "My Location"}], 0);
            nearly.flickr.init();
        },
        dropPin: function(iLatLong, imgArr, flickerCounter){
            var that = this,
            pinTitle = imgArr.length > 0 && flickerCounter > 0 ? "Mulitple images: "+flickerCounter : imgArr[0].title,
            infoWindow = imgArr.length > 0 && flickerCounter > 0 ? this.createInfoWindow(iLatLong, imgArr, pinTitle, flickerCounter) : false,
            marker = new google.maps.Marker({
                            map:that.map,
                            position: iLatLong,
                            draggable:false,
                            animation: google.maps.Animation.DROP,
                            title: pinTitle
            });
            if(infoWindow){
                google.maps.event.addListener(marker, 'click', function(){
                    infoWindow.open(that.map, marker);
                });
            }

        },
        createInfoWindow: function(iLatLong, imgArr, title, flickerCounter){
            var iWindowContent = '<div class="mapPop"><h2>'+title+'</h2>';
            if(flickerCounter > 1){
                for(var i = 0; i < flickerCounter; i++){
                    iWindowContent += '<h3>'+imgArr[i].title+'</h3><img src="'+imgArr[i].url_sq+'" />';
                    //$("#testdiv").append('<p>'+imgArr[i].id+'</p><img src="'+imgArr[i].url_sq+'" />');
                }
            }else{
                iWindowContent += '<img src="'+imgArr[0].url_sq+'" />';
            }
            iWindowContent += '</div>'
            return new google.maps.InfoWindow({content: iWindowContent});
        }
    };
    return process;
})(nearly, $);
if(typeof google !== "undefined"){
nearly.gMaps.init();

}