var db = null;

document.addEventListener('deviceready', function () {
    db = window.sqlitePlugin.openDatabase({
        name: 'my.db',
        location: 'default',
    });

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS pages (id INTEGER AUTO_INCREMENT, page_id, user_id,location_id,longitude,latitude,virtualtour_link,contact_name,contact_position,contact_email,name,detail TEXT,postal_address,telephone,cellphone,fax,email,street_name,website,image_name,image_name_thumb,icon_image_name,gallery_limit,products_limit,link_name,small_summary,app_background,image_name_icon)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS child_pages (id,page_type_id,page_id, user_id,place_id,latitude,longitude,image_name,name,detail TEXT,title,meta_description,meta_keyword,no_link,active,created_at,updated_at,column_order,hidden,link_name,pdf_name,video_name)');
    }, function (error) {
        // alert('Table already created ' + error.message);
    }, function () {
        //alert('Table created OK');
    });

});

function download(img, page_id, column_name, table_name,video_flag) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

        var url = "http://res.cloudinary.com/buddy-industries-cc/image/upload/c_fill,h_900,w_1600/" + img + ".jpg";
        var extension = ".jpg";
        if(video_flag){
           url ="http://res.cloudinary.com/buddy-industries-cc/video/upload/c_limit,w_360/e_loop/" + img + ".gif";
           extension =".gif";
        }
        var random_string = Math.floor(Math.random() * 1012534);
        fs.root.getFile(img + random_string + extension, {
            create: true,
            exclusive: false
        }, function (fileEntry) {
            if (table_name == 'child_pages')
                file_transfer_child_pages(fileEntry, encodeURI(url), true, page_id, column_name, table_name);
            else
                file_transfer(fileEntry, encodeURI(url), true, page_id, column_name, table_name);

        }, onErrorCreateFile);

    }, onErrorLoadFs);
}

function onErrorLoadFs(msg) {
    alert(msg);
}

function onErrorCreateFile(msg) {
    alert(msg);
}

function file_transfer(fileEntry, uri, readBinaryData, page_id, column_name, table_name) {

    var fileTransfer = new FileTransfer();
    var fileURL = fileEntry.toURL();

    fileTransfer.download(
        uri,
        fileURL,
        function (entry) {
            db.transaction(function (tx) {
                tx.executeSql('update ' + table_name + ' set ' + column_name + ' = ? where page_id = ? and user_id = ?', [entry.toURL(), page_id, user.id]);
                if (column_name == 'image_name_thumb') {
                    alert('Download page is completed');
                }
            });
            if (readBinaryData) {
                // Read the file...
                // readBinaryFile(entry);
            } else {
                // Or just display it.
                // displayImageByFileURL(entry);
            }
        },
        function (error) {
            //alert("download error source " + error.source);
            alert("download error target " + error.target);
            //alert("upload error code" + error.code);
        },
        null, // or, pass false
        {
            //headers: {
            //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            //}
        }
    );
}

function file_transfer_child_pages(fileEntry, uri, readBinaryData, id, column_name, table_name) {

    var fileTransfer = new FileTransfer();
    var fileURL = fileEntry.toURL();

    fileTransfer.download(
        uri,
        fileURL,
        function (entry) {
            db.transaction(function (tx) {
                tx.executeSql('update ' + table_name + ' set ' + column_name + ' = ? where id = ? and user_id = ?', [entry.toURL(), id, user.id]);
                if (column_name == 'video_name') {
                    alert('Download for subpages is completed!!');
                }
            });
            if (readBinaryData) {
                // Read the file...
                // readBinaryFile(entry);
            } else {
                // Or just display it.
                // displayImageByFileURL(entry);
            }
        },
        function (error) {
           // alert("download error source " + error.source);
           alert("download error target " + error.target);
            //alert("upload error code" + error.code);
        },
        null, // or, pass false
        {
            //headers: {
            //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            //}
        }
    );
}

function downloadpageoffline(id) {
    jQuery(document).ready(function ($) {

        $.ajax({
            type: "GET",
            url: 'http://buddy.na/api/getbuddypages/' + id,
            dataType: 'json',
            success: function (data) {
                var JSONObject = JSON.stringify(data);

                db.transaction(function (tx) {
                    tx.executeSql('delete from pages where page_id = ? and user_id = ?', [data.place.id, user.id], function (tx, results) {
                        tx.executeSql('SELECT * FROM pages where page_id = ? and user_id = ?', [data.place.id, user.id], function (tx, results) {
                            var len = results.rows.length, i;
                            if (len === 0 || len === '0') {
                                var executeQuery = "insert into pages (page_id, user_id,location_id,longitude,latitude,virtualtour_link,contact_name,contact_position,contact_email,name,detail,postal_address,telephone,cellphone,fax,email,street_name,website,image_name,image_name_thumb,icon_image_name,gallery_limit,products_limit,link_name,small_summary,app_background,image_name_icon) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                                tx.executeSql(executeQuery,
                                    [data.place.id,
                                    user.id,
                                    data.place.location_id,
                                    data.place.longitude,
                                    data.place.latitude,
                                    data.place.virtualtour_link,
                                    data.place.contact_name,
                                    data.place.contact_position,
                                    data.place.contact_email,
                                    data.place.name,
                                    data.place.detail,
                                    data.place.postal_address,
                                    data.place.telephone,
                                    data.place.cellphone,
                                    data.place.fax,
                                    data.place.email,
                                    data.place.street_name,
                                    data.place.website,
                                    data.place.image_name,
                                    data.place.image_name_thumb,
                                    data.place.icon_image_name,
                                    data.place.gallery_limit,
                                    data.place.products_limit,
                                    data.place.link_name,
                                    data.place.small_summary,
                                    data.place.app_background,
                                    data.place.image_name_icon],
                                    function (tx, result) {
                                        insertChildPagesInfoToDB(data.pages, data.place.image_name, data.place.image_name_thumb, data.place.id,data.place.image_name_icon);
                                    },
                                    function (error) {
                                        //alert('Error occurred');
                                    }

                                );
                            }
                        });
                    });
                });
                db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM pages where page_id = ? and user_id = ?', [data.place.id, user.id], function (tx, results) {
                        var len = results.rows.length, i;
                        msg = "<p>Found rows: " + len + "</p>";
                        for (i = 0; i < len; i++) {
                        }

                    }, null);
                });
            }
        });
    });

    function insertChildPagesInfoToDB(pages, image_name, image_thumb_name, place_id,image_name_icon) {
        db.transaction(function (tx) {
            var count = 0;
            $.each(pages, function (index, value) {
                var child_page = value;

                tx.executeSql('delete from child_pages where id = ? and user_id = ?', [child_page.id, user.id], function (tx, results) {
                    tx.executeSql('SELECT * FROM child_pages where id = ? and user_id = ?', [child_page.id, user.id], function (tx, results) {
                        var len = results.rows.length, i;
                        if (len === 0 || len === '0') {
                            var executeQuery = "insert into child_pages (id,page_type_id,page_id, user_id,place_id,latitude,longitude,image_name,name,detail,title,meta_description,meta_keyword,no_link,active,created_at,updated_at,column_order,hidden,link_name,pdf_name,video_name) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

                            tx.executeSql(executeQuery,
                                [child_page.id,
                                child_page.page_type_id,
                                child_page.page_id,
                                user.id,
                                child_page.place_id,
                                child_page.latitude,
                                child_page.longitude,
                                child_page.image_name,
                                child_page.name,
                                child_page.detail,
                                child_page.title,
                                child_page.meta_description,
                                child_page.meta_keyword,
                                child_page.no_link,
                                child_page.active,
                                child_page.created_at,
                                child_page.updated_at,
                                child_page.column_order,
                                child_page.hidden,
                                child_page.link_name,
                                child_page.pdf_name,
                                child_page.video_name]
                                , function (tx, result) {
                                    count++;
                                    downloadChildImages(child_page.id, child_page.image_name, child_page.pdf_name, child_page.video_name);
                                    if (count == pages.length) {
                                        //Download all the images from pages and child_pages table
                                        downloadImages(image_name, image_thumb_name, place_id,image_name_icon);
                                    }
                                },
                                function (error) {
                                    //Error for insert query result
                                });

                        }
                    });
                });

            });
        }),
            function (error) {
                //Error for database query
            }
    }

    function downloadChildImages(child_page_id, child_image_name, child_pdf_name,video_name) {
        var column_name = 'image_name';
        var table_name = 'child_pages';
        if (child_image_name !== null)
            download(child_image_name, child_page_id, column_name, table_name,false);
        column_name = 'pdf_name';
        if (child_pdf_name !== null)
            download(child_pdf_name, child_page_id, column_name, table_name,false);
        column_name = 'video_name';
        if (video_name !== null)
            download(video_name, child_page_id, column_name, table_name,true);
    }

    function downloadImages(image_name, image_thumb_name, place_id,image_name_icon) {
        var column_name = 'image_name';
        var table_name = 'pages';
        if (image_name !== null)
            download(image_name, place_id, column_name, table_name,false);

        var column_name = 'image_name_icon';
        if (image_name_icon !== null)
            download(image_name_icon, place_id, column_name, table_name,false);

        if (image_name_icon !== null)
            var column_name = 'image_name_thumb';
        download(image_thumb_name, place_id, column_name, table_name,false);
    }
}