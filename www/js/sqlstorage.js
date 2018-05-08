// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var db;

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {

		
        db = window.sqlitePlugin.openDatabase({
		  name: 'buddy.db',
		  location: 'default',
		  androidDatabaseImplementation: 2
		});
		
		
		//retieveRecords();
		/*
		window.sqlitePlugin.echoTest(function() {
			alert('ECHO test OK');
		});
		*/
		
		
		
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    }

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    }
} )();

function createPlacesTable()
{
	db.sqlBatch([
		'CREATE TABLE IF NOT EXISTS places (name, score)',
		[ 'INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101] ],
		[ 'INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202] ],
	  ], function() {
		console.log('Populated database OK');
	  }, function(error) {
		console.log('SQL batch ERROR: ' + error.message);
	  });
}

function retieveRecords()
{
	db.transaction(function(tr) {
		tr.executeSql('SELECT * FROM business_pages AS pages', ['Test String'], function(tr, rs) {
		  alert('Got upperString result: ' + rs.rows.item(0).upperString);
		});
  	});
}