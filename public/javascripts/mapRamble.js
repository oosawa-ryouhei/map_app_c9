/*global google, $, MAPRAMBLE */
/*jslint browser:true, devel:true */

// 使用する変数の準備
MAPRAMBLE.markers = [];

// デバッグ情報の表示
MAPRAMBLE.debug = false;
MAPRAMBLE.console = {};
MAPRAMBLE.console.log = function (message) {
    'use strict';
    if (MAPRAMBLE.debug === true) {
        console.log(message);
    }
};

// マップを生成
MAPRAMBLE.createMap = function (initial) {
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

// マーカー群を追加
MAPRAMBLE.addPlaceMarkers = function () {
    'use strict';

    var that = this;

    that.notes.map(function (note) {
        that.addMarker(note);
    });
};

// 個々のマーカーを追加
MAPRAMBLE.addMarker = function (note) {
    'use strict';
    var marker, options;

    options = {
        position: new google.maps.LatLng(note.lat, note.lng),
        map: this.map,
        icon: "http://maps.google.com/mapfiles/marker.png"
    };

    marker = new google.maps.Marker(options);

    google.maps.event.addListener(marker, 'click', function () {
        return (function (id) {
            if (MAPRAMBLE.mode === 'edit') {
                $.mobile.changePage('/notes/' + id + '/edit');
            } else {
                $.mobile.changePage('/notes/' + id);
            }
        }(note.id));
    });

    marker.note_id = note.id;
    // マーカーを配列に入れる
    this.markers.push(marker);
};

// マップの高さを画面サイズに合わせる
MAPRAMBLE.setHeight = function () {
    'use strict';
    var windowInnerHeight = $(window).innerHeight(),
        headerHeight = $("#header").height(),
        footerHeight = $("#thumb").height() + 60,
        windowInnerWidth = $(window).innerWidth(),
        infoWidth = $("#info").width();
    $("#main").css("height", windowInnerHeight - headerHeight - footerHeight);
    $("#map").css("height", windowInnerHeight - headerHeight - footerHeight);
    $("#info").css("height", windowInnerHeight - headerHeight - footerHeight);
    $("#map").css("width", windowInnerWidth - infoWidth - 30);
    $(".thumb-wrapper").css("width", windowInnerWidth - 110);
};

// イベントハンドラの設定
MAPRAMBLE.setEventHandler = function () {
    'use strict';

    $(window).on('resize', function () {
        MAPRAMBLE.setHeight();
    });

    if (this.mode === 'edit') {
        google.maps.event.addListener(this.map, 'click', function (event) {
            $.mobile.changePage('/notes/new?lat=' + event.latLng.lat() + '&lng=' + event.latLng.lng());
        });
    }
};

// マップの表示範囲をマーカーに合わせる
MAPRAMBLE.fitBounds = function () {
    'use strict';
    this.map.fitBounds(this.bounds);
};

// メイン・プログラム
$(document).ready(function () {
    'use strict';
    var carouObj = new Object();
    // carouObj.auto = false;
    // carouObj.circular = false;
    // carouObj.infinite = false;
    carouObj.prev = ".carouPrev";
    carouObj.next = ".carouNext";
    carouObj.scroll = {
        items: 1,
        duration: 500,                         
        pauseOnHover: true
    };
    $("#thumb").carouFredSel(carouObj);

    MAPRAMBLE.setHeight();
    MAPRAMBLE.map = MAPRAMBLE.createMap({zoom: 14, lat: 40.784056, lng: 140.781172});
    MAPRAMBLE.addPlaceMarkers();
    MAPRAMBLE.fitBounds();
    MAPRAMBLE.setEventHandler();
    MAPRAMBLE.markerCluster = new MarkerClusterer(MAPRAMBLE.map, MAPRAMBLE.markers, {gridSize: 50, maxZoom: 15, zoomOnClick: false});
    ClusterIcon.prototype.triggerClusterClick = function() {
        var markerClusterer = this.cluster_.getMarkerClusterer();

        // Trigger the clusterclick event.
        google.maps.event.trigger(markerClusterer, 'clusterclick', this.cluster_);

        var markers = this.cluster_.markers_;
        for (var i = 0; i < markers.length; i += 1) {
            console.log(markers[i].note_id);
        }
    };
});
