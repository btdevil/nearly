var nearly = window.nearly || {};



nearly.flickr = (function (nearly, $) {
    var process = {
        apiKey: "8161e35177ace7b2897cfee45da35e28",
        secret: "",
        groupedImages: [],
        dateStamp: "1104559200",
        addToPage: function (json) {
            var cont = $("#photos"), that = this, photoHtml = [], photos = json.photos.photo, photoLen = photos.length;

            for (var i = 0; i < photoLen; i++) {
                photoHtml.push('<img src="',
                    photos[i].url_sq,
                    '" width="75", height="75" alt="',
                    photos[i].title,
                    '" /><p>',
                    photos[i].title,
                    '</p>')
            }

            cont.html(photoHtml.join(""));

        },
        searchFlickr: function () {
            var that = this, fUrl = that.buildSearchUrl(false);
            nearly.loader.showSubLoader();
            nearly.loader.showMessage("flickr");
            $.ajax({
                context: that,
                dataType: "jsonp",
                jsonpCallback: "jsonFlickrApi",
                //&min_taken_date=1104559200&lat=51.321425&lon=-0.557294&radius=5&extras=geo%2Curl_sq%2Curl_z&format=json
                url: fUrl,
                success: that.processResults,
                error: function(a,b,c){
                }
            });
        },
        isInImages: function(nLat, nLong){
            var that = this, inImagesArray = false, i = 0, iLen = that.groupedImages.length;
            for(i= 0; i < iLen; i++){
                if(nLat === that.groupedImages[i].lat && nLong === that.groupedImages[i].lon){
                    inImagesArray = true;
                    break;
                }
            }
            return {isIn: inImagesArray, arrayIndex: i};
        },
        processResults: function(json, a, b, c){
            var that = this, photos = json.photos.photo.sort(that.orderResults), photoLength = photos.length;
            for(var i = 0; i < photoLength; i++){
                var nLat = photos[i].latitude.toString().slice(0,6),
                nLong = photos[i].longitude.toString().slice(0,6),
                groupTest = that.isInImages(nLat, nLong);
                //$("#testdiv2").append('<p>'+photos[i].id+'</p><img src="'+photos[i].url_sq+'" />');
                if(that.groupedImages.length === 0){
                    that.groupedImages.push({lat: nLat, lon: nLong, images:[photos[i]], counter: 1 })
                }else{
                    if(groupTest.isIn){
                        that.groupedImages[groupTest.arrayIndex].images.push(photos[i]);
                        ++that.groupedImages[groupTest.arrayIndex].counter;
                    }else{
                        that.groupedImages.push({lat: nLat, lon: nLong, images:[photos[i]], counter: 1 })
                    }
                }
                

            }

            for(var i = 0, iLen = that.groupedImages.length; i < iLen; i++){
                var that = this, 
                imgGroup = that.groupedImages[i],
                flickrIcon = "http://l.yimg.com/g/images/goodies/white-small-chiclet.png",
                newPinLatLong = new google.maps.LatLng(imgGroup.lat, imgGroup.lon);
                nearly.gMaps.dropPin(newPinLatLong, imgGroup.images, imgGroup.counter, flickrIcon);
            }
            nearly.gMaps.map.fitBounds(nearly.gMaps.bounds);
            nearly.loader.hideMessage("flickr");
            console.log(photos);
        },
        orderResults: function(a,b){
        var aLat = a.latitude,
            bLat = b.latitude,
            aLong = b.longitude,
            bLong = b.longitude;

            return aLat - bLat  ||  aLong - bLong;
        },
        buildSearchUrl: function (hasPage, pageNumber) {
            var that = this, url = [];
            url.push("http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=")
            url.push(that.apiKey);
            url.push("&lat=");
            url.push(nearly.location.userLocation.coords.latitude);
            url.push("&lon=");
            url.push(nearly.location.userLocation.coords.longitude);
            url.push("&radius=5");
            url.push("&format=json");
            //change this date stamp as required in variables
            url.push("&min_taken_date=");
            url.push(that.dateStamp);
            //optional parameters add other optional search parameters as needed
            url.push("&text=")
            url.push(that.cleanSearchText);
            //extra data required in result
            /* available extras: date_upload, date_taken, owner_name, icon_server, original_format, last_update,
               geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z,                  url_c, url_l, url_o
            */
            url.push("&extras=geo%2Curl_sq%2Curl_t%2Curl_s%2Curl_q%2Curl_m%2Curl_n%2Curl_z%2Curl_c%2Curl_l%2Curl_o%2date_taken%2owner_name");
            //pictures per flickr call
            url.push("&per_page=");
            url.push(that.imagesPerPage);
            //page number to return, empty for initial call, populate for pager
            if (hasPage) {
                url.push("&page=");
                url.push(pageNumber);
                that.currentPage = pageNumber;
            } else {
                that.currentPage = 1;
            }

            return url.join("");
        },
        handleError: function(){
            console.log("there was an error");
        },
        init: function () {
            if (nearly.location.hasGeo) {
                nearly.flickr.searchFlickr();
            } else if (nearly.location.hasGeo === false && nearly.location.triedGeo === false) {
                nearly.location.getUserLocation();
                nearly.isGeoDone = setInterval(function () {
                    if (nearly.location.triedGeo === true) {
                        if (nearly.location.hasGeo) {
                            window.clearInterval(nearly.isGeoDone);
                            nearly.flickr.searchFlickr();
                        } else {
                            window.clearInterval(nearly.isGeoDone);
                            nearly.flickr.handleError();
                        }
                    }
                }, 500)

            }

        },

    };
    return process;
})(nearly, $);

