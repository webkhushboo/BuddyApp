// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {

        //alert('initialized');
        window.plugins.PushbotsPlugin.initialize("5a128d379b823a7a438b456a", { "android": { "sender_id": "385288472385" } });

        window.plugins.PushbotsPlugin.on("notification:clicked", function (data) {
            //alert("clicked:" + JSON.stringify(data));
        });
		
		//var db = window.sqlitePlugin.openDatabase({name: "buddy.db"});
		
		//alert(db);
		
        // Handle the Cordova pause and resume events

        /*
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        */
		
		
		
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    }

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    }
} )();