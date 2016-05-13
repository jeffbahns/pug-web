var deleteGame = function(GameID) {

    var payload = {
        GameID: GameID
    };
    console.log(payload);
    $.ajax({
        url: '/game/delete',  // url where we want to send the form data
        type: 'GET', // the type of form submission; GET or POST
        contentType: "json",  // the type of data we are sending
        data: payload,  // the actual data we are sending
        complete: function(data) {  // what to do with the response back from the server
            $('#message').html(data.responseJSON.message);
            $('#message').show();
        }
    })
};

$(document).ready(function() {

    $('#deleteGame').click(function(e) {
        console.log('delete game clicked');
        e.preventDefault();
        deleteGame();
    });
});