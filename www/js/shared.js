

$(document).ready(function (e) {
   


    $('#openQR').click(function () {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if (!result.cancelled) {
                    //alert("Barcode type is: " + result.format);
                    //alert("Decoded text is: " + result.text);
                    //alert(result.text);
                    //alert(result.text.substring(0, 4));

                    if (result.text.substring(0, 4) == 'http')
                    {
                        //alert('what');
                        $('#qrCodeFrame').fadeIn();
                        $('#qrCodeFrame iframe').attr('src', result.text);
                    }
					
                    else if (result.text.substring(0, 8) == 'trigger ')
                    {
                        //alert('what 2');
                        window.location = "rating.html#" + result.text.substring(4, 100);
                    }
                    else if (result.text.substring(0, 5) == 'rate ')
                    {
                        //alert('what 2');
                        window.location = "rating.html#" + result.text.substring(4, 100);
                    }
                    else if (result.text.substring(0, 4) == 'pay ')
                    {
                        //alert('what 2');
                        window.location = "payment.html#" + result.text.substring(4, 100);
                    }
                    
                }
                else {
                    alert("You have cancelled scan");
                }
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    });

    $('#closeFrame').click(function () {
        $('#qrCodeFrame').fadeOut();
    });

   
    
    

});