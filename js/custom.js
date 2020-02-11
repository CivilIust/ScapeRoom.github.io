// GOOGLE MAP
var map = '';
var center;
var groupInfo = null;

function initialize() {
    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(13.758468, 100.567481),
        scrollwheel: false
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    google.maps.event.addDomListener(map, 'idle', function() {
        calculateCenter();
    });

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
    });
}

function calculateCenter() {
    center = map.getCenter();
}

function loadGoogleMap() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initialize';
    document.body.appendChild(script);
}

function RiddleClicked(position) {
    $('#riddles_video').css("display", "block");
    switch (position) {
        case 1:
            $('#home video source').attr('src', '/videos/riddle1.mp4');
            break;

        case 2:
            $('#home video source').attr('src', '/videos/riddle2.mp4');
            break;

        case 3:
            $('#home video source').attr('src', '/videos/riddle3.mp4');
            break;

        default:
            $('#riddles_video').css("display", "none");
            break;
    }
    $("#home video")[0].load();
}


function RequestToLogin() {
    var sendInfo = {
        ID: $('#Group_ID').val(),
        Password: $('#Password').val()
    };
    // document.getElementById('demo').innerHTML = $('#Password').val();
    $.ajax({
        url: 'https://music.somebody.ir/CivilRoom/RequestToLogin.php',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(sendInfo),
        success: function(d) {
            alert(d.Message);
            if (d.ResultCode == 0) {
                groupInfo = d.Data;

                if (groupInfo.SolvedRiddle1 == 1)
                    $("#tick1").css('display', 'inline');
                else
                    $("#tick1").css('display', 'none');

                if (groupInfo.SolvedRiddle2 == 1)
                    $("#tick2").css('display', 'inline');
                else
                    $("#tick2").css('display', 'none');

                if (groupInfo.SolvedRiddle3 == 1)
                    $("#tick3").css('display', 'inline');
                else
                    $("#tick3").css('display', 'none');

                $('#Riddles').css("display", "block");
                $('#LoginPage').css("display", "none");
            };
        }
    });
}


function RiddleButtonClicked(position) {
    switch (position) {
        case 1:
            if (document.getElementById('txbx1').value == '3604' || document.getElementById('txbx1').value == 3604) {

                var sendInfo = {
                    ID: $('#Group_ID').val(),
                    SolvedRiddle1: true
                };
                $.ajax({
                    url: 'https://music.somebody.ir/CivilRoom/UpdateGroup.php',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(sendInfo),
                    success: function(d) {
                        if (d.ResultCode == 0) {
                            $("#tick1").css('display', 'inline');
                        } else {
                            alert(d.Message);
                        };
                    }
                });
            }
            break;
        case 2:
            if (document.getElementById('txbx2').value == 'map' || document.getElementById('txbx2').value == 'نقشه') {

                var sendInfo = {
                    ID: $('#Group_ID').val(),
                    SolvedRiddle2: true
                };
                $.ajax({
                    url: 'https://music.somebody.ir/CivilRoom/UpdateGroup.php',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(sendInfo),
                    success: function(d) {
                        if (d.ResultCode == 0) {
                            $("#tick2").css('display', 'inline');
                        } else {
                            alert(d.Message);
                        };
                    }
                });
            }
            break;
        case 3:
            if (document.getElementById('txbx3').value == 'lake' || document.getElementById('txbx3').value == 'دریاچه') {
                var sendInfo = {
                    ID: $('#Group_ID').val(),
                    SolvedRiddle3: true
                };
                $.ajax({
                    url: 'https://music.somebody.ir/CivilRoom/UpdateGroup.php',
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(sendInfo),
                    success: function(d) {
                        if (d.ResultCode == 0) {
                            $("#tick3").css('display', 'inline');
                        } else {
                            alert(d.Message);
                        };
                    }
                });
            }
            break;
    }
}

$(function() {
    loadGoogleMap();
});

// NIVO LIGHTBOX
$('#portfolio a').nivoLightbox({
    effect: 'fadeScale',
});

// HIDE MOBILE MENU AFTER CLIKING ON A LINK
$('.navbar-collapse a').click(function() {
    $(".navbar-collapse").collapse('hide');
});
