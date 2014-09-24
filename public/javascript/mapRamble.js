Mapramble.markers = [];

Mapramble.debug = false;
Mapramble.console = {};
Mapramble.console.log = function (message) {
    'use strict';
    if (Mapramble.debug === true) {
        console.log(message);
    }
};


Mapramble.createMap = function (initial) {
    'use strict';
    var options;

    options = {
        zoom: initial.zoom,
        center: new google.maps.LatLng(initial.lat, initial.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.console.log(initial);
    this.console.log(options);

    // マップの生成
    return new google.maps.Map(document.getElementById("map"), options);
};

Mapramble.addPlaceMarkers = function () {
    'use strict';

    var that = this;

    that.places.map(function (place) {
        that.addMarker(place);
    });
};


Mapramble.addMarker = function (place) {
    'use strict';
    var marker, options;

    options = {
        position: new google.maps.LatLng(place.lat, place.lng),
        map: this.map,
        icon: "http://maps.google.com/mapfiles/marker.png"
    };

    marker = new google.maps.Marker(options);

    google.maps.event.addListener(marker, 'click', function () {
        return (function (id) {
        	var pathname　= window.location.pathname,
        	    href = window.location.href;
            if (Mapramble.mode === 'edit') {
            	window.location.href = href.substring(0, href.legth - pathname.length) + '/notes/' + id + '/edit';
                // $.mobile.changePage('/places/' + id + '/edit');
            } else {
            	window.location.href = href.substring(0, href.legth - pathname.length) + '/notes/' + id;
                // $.mobile.changePage('/places/' + id);
            }
        }(place.id));
    });

    // マーカーを配列に入れる
    this.markers.push(marker);
};

Mapramble.setHeight = function () {
    'use strict';
    var windowInnerHeight = $(window).innerHeight(),
        headerHeight = $("#header").height(),
        footerHeight = $("#footer").height(),
        uiContentPadding
            = parseInt($(".ui-content").css('padding-top'), 10)
            + parseInt($(".ui-content").css('padding-bottom'), 10);

    $("#map").css("height", windowInnerHeight - headerHeight - footerHeight - uiContentPadding);
};

// イベントハンドラの設定
Mapramble.setEventHandler = function () {
    'use strict';

    $(window).on('resize', function () {
        Mapramble.setHeight();
    });

    if (this.mode === 'edit') {
        google.maps.event.addListener(this.map, 'click', function (event) {
            $.mobile.changePage('/places/new?lat=' + event.latLng.lat() + '&lng=' + event.latLng.lng());
        });        
    }
};

// マップの表示範囲をマーカーに合わせる
Mapramble.fitBounds = function () {
    'use strict';
    this.map.fitBounds(this.bounds);
};

// メイン・プログラム
//$(document).on('pageshow', function () {
$(document).ready(function () {
    'use strict';
    Mapramble.setHeight();
    Mapramble.map = Mapramble.createMap({zoom: 14, lat: 40.784056, lng: 140.781172});
    Mapramble.addPlaceMarkers();
    Mapramble.fitBounds();
    Mapramble.setEventHandler();
});
