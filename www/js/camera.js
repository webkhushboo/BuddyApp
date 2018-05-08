// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function createNewFileEntry(imgUri) {
        window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

            // JPEG file
            dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

                // Do something with it, like write to it, upload it, etc.
                // writeFile(fileEntry, imgUri);
                console.log("got file: " + fileEntry.fullPath);
                // displayFileData(fileEntry.fullPath, "File copied to");

            }, onErrorCreateFile);

        }, onErrorResolveUrl);
    }

    function setOptions(srcType) {
        var options = {
            // Some common settings are 20, 50, and 100
            quality: 50,
            targetWidth: 1000,
            targetHeight: 1000,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true  //Corrects Android orientation quirks
        }
        return options;
    }

    function onDeviceReady() {



        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        var srcType = Camera.PictureSourceType.CAMERA;
        var options = setOptions(srcType);
        var func = createNewFileEntry;

        document.getElementById("capturePicture").onclick = function () {

            //alert('Clicked on capture');
            navigator.camera.getPicture(function (imageUri) {
                $('#photoHolder').attr('src', imageUri);
                $('#capturePicture').hide();
                $('#photoHolder').show();

                setTimeout(convertPhoto,1000);
                
            },
                function cameraError(error) {
                    alert("Unable to obtain picture: " + error, "app");
                },
                options);
            //alert('after camera call');
        }
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

   

    function resize_image(src, dst, type, quality) {
        var tmp = new Image(),
            canvas, context, cW, cH;

        type = type || 'image/jpeg';
        quality = quality || 0.50;

        cW = src.naturalWidth;
        cH = src.naturalHeight;

        var originalWidth = cW;
        var originalHeight = cH;

        tmp.src = src.src;
        tmp.onload = function () {

            canvas = document.createElement('canvas');

            cW /= 2;
            cH /= 2;

            //I don't want it to be as big as the width
            //if (cW < src.width) cW = src.width;
            //if (cH < src.height) cH = src.height;
            //So I'm changing it to

            if (cW < 1000) cW = 1000;
            if (cH < 1000) cH = 1000;

            var ratio = originalHeight / originalWidth;
            var newHeight = cW * ratio;


            canvas.width = cW;
            canvas.height = newHeight;
            context = canvas.getContext('2d');
            context.drawImage(tmp, 0, 0, cW, newHeight);

            dst.src = canvas.toDataURL(type, quality);

            //The same as above
            //if (cW <= src.width || cH <= src.height)
            //    return;

            if (cW <= 1000 || cH <= 1000)
                return;

            tmp.src = dst.src;
        }

    }
    
    function convertPhoto()
    {
        resize_image($('#photoHolder')[0], $('#photoHolder2')[0]);
        $('#photoHolder').hide();
        $('#photoHolder2').show();
        pictureTaken = true;
    }

    $('#addPhotoForm').submit(function (e) {

        e.preventDefault();

        submitPicture();

    });

    

})();


$(document).ready(function () {

    $('#loadingBar').fadeOut();

});