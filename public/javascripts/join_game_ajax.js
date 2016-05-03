var joinGame = function() {

    var payload = {
        PlayerID: $('#PlayerID').val(),
        GameID: $('#GameID').val()
    };

    $.ajax({
        url: '/player/join',  // url where we want to send the form data
        type: 'GET', // the type of form submission; GET or POST
        contentType: "json",  // the type of data we are sending
        data: payload,  // the actual data we are sending
        complete: function(data) {  // what to do with the response back from the server
            $('#message').html(data.responseJSON.message);
            $('#message').show();
            //window.location.assign('/');
        }
    })
};

$(document).ready(function() {

    $('#joinGame').click(function(e) {
        console.log('join game clicked');
        e.preventDefault();
        joinGame();
    });
});