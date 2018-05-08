function resizeScreenCorrectly() {
    $('#chatContainer').css('height', $(window).height() - 110);
    $('.pageInfo').each(function () {

        if ($(this).hasClass('mapOverlay')) {
            $(this).css('height', $(window).height() - 100);
        }
        else {
            $(this).css('height', $(window).height() - 100);
        }
    });
}

//jQuery(document).ready(function($){
document.addEventListener('deviceready', function () {
    dbo = window.sqlitePlugin.openDatabase({
        name: 'my.db',
        location: 'default',
    });

    // getConnectedPlaces();
    jQuery("#clickme").trigger("click");

    $('#userIdInput').val(user.id);

    $('#userName').html(user.name);

});

function getConnectedPlaces() {
    var cond = navigator.connection.type;

    if (cond == 'none' || cond == 'NO_NETWORK') {
        dbo.transaction(function (tx) {
            tx.executeSql('SELECT * FROM pages where user_id = ?', [user.id], function (tx, results) {
                var len = results.rows.length, i;

                for (i = 0; i < len; i++) {

                    var page_id = results.rows.item(i).page_id;
                    var html = '<div class="businessListing col-xs-12 col-sm-12 col-md-12">' +
                       // '<a onclick=getPages(' + page_id + ');><div class="logoHeader">' +
                        '<a href="page.html#' + page_id + '"><div class="logoHeader">' +
                        '<div class="col-xs-6 col-sm-6 col-md-6" styl>' +
                        '<div style="display:table-cell; vertical-align:middle">' +
                        '<img style="max-height:50px; max-width:100%" src="' + results.rows.item(i).image_name_thumb + '" />' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-xs-6 col-sm-6 col-md-6">' +
                        '<p style="text-align:right">' + results.rows.item(i).small_summary + '</p>' +
                        '</div>' +
                        '</div></a>' +
                        '<div class="businessBody">' +
                        '<img style="width:100%" src="' + results.rows.item(i).image_name + '" />' +


                        '<a href="tel:081"><i style="position:absolute; bottom:186px; right:5px" class="fa fa-phone whiteBorderIcon" aria-hidden="true"></i></a>' +
                        '<a target="_blank" href="https://maps.google.com/?saddr=Current+Location&daddr=' + results.rows.item(i).latitude + ',' + results.rows.item(i).longitude + '">' +
                        '<i style="position:absolute; bottom:123px; right:5px" class="fa fa-map-marker whiteBorderIcon" aria-hidden="true"></i>' +
                        '</a>' +
                        '<a href="start-new-chat.html">' +
                        '<i style="position:absolute; bottom:63px; right:5px" class="fa fa-commenting-o whiteBorderIcon" aria-hidden="true"></i>' +
                        '</a>' +
                        '<a href="#">' +
                        '<i style="position:absolute; bottom:5px; right:5px" class="fa fa-download whiteBorderIcon" aria-hidden="true"></i>' +
                        '</a>' +
                        '</div>' +
                        '</div>';
                    //alert(html); 

                    jQuery('#placeContainer').append(html);

                }
                jQuery('#loadingContainer').fadeOut();

            });
        });
    }
    else {

        $.ajax({
            type: "GET",
            url: 'http://buddy.na/api/getconnectedplaces/' + user.id,
            success: function (data) {


                if (data.success = true) {

                    for (var key in data.places) {

                        var html = '<div class="businessListing col-xs-12 col-sm-12 col-md-12">' +
                            '<a href="page.html#' + data.places[key].id + '"><div class="logoHeader">' +
                            '<div class="col-xs-6 col-sm-6 col-md-6" styl>' +
                            '<div style="display:table-cell; vertical-align:middle">' +
                            '<img style="max-height:50px; max-width:100%" src="http://res.cloudinary.com/buddy-industries-cc/image/upload/c_scale,h_100/v1516964749/' + data.places[key].image_name_thumb + '.png" />' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-xs-6 col-sm-6 col-md-6">' +
                            '<p style="text-align:right">' + data.places[key].small_summary + '</p>' +
                            '</div>' +
                            '</div></a>' +
                            '<div class="businessBody">' +
                            '<img style="width:100%" src="http://res.cloudinary.com/buddy-industries-cc/image/upload/c_fill,h_900,w_1600/' + data.places[key].image_name + '" />' +
                            // '<img style="width:100%" src="file:///data/data/io.cordova.hellocordova/files/files/tctbttp4clxzssziygcw.jpg" />' +

                            '<a href="tel:081"><i style="position:absolute; bottom:186px; right:5px" class="fa fa-phone whiteBorderIcon" aria-hidden="true"></i></a>' +
                            '<a target="_blank" href="https://maps.google.com/?saddr=Current+Location&daddr=' + data.places[key].latitude + ',' + data.places[key].longitude + '">' +
                            '<i style="position:absolute; bottom:123px; right:5px" class="fa fa-map-marker whiteBorderIcon" aria-hidden="true"></i>' +
                            '</a>' +
                            '<a href="start-new-chat.html">' +
                            '<i style="position:absolute; bottom:63px; right:5px" class="fa fa-commenting-o whiteBorderIcon" aria-hidden="true"></i>' +
                            '</a>' +
                            '<a href="#" onclick="downloadpageoffline(' + data.places[key].id + ')">' +
                            '<i style="position:absolute; bottom:5px; right:5px" class="fa fa-download whiteBorderIcon" aria-hidden="true"></i>' +
                            '</a>' +
                            '</div>' +
                            '</div>';

                        $('#placeContainer').append(html);
                    }
                }


                $('#loadingContainer').fadeOut();
            },
            error: function (data) {
                //$('#loading').fadeOut();
                //alert('No Internet');
                setTimeout(updateInbox, 1000);
            }
        });
    }
}




