var addFriend = function(FriendID) {
    var payload = {
        FriendID: FriendID
    };
    console.log(payload);
    $.ajax({
        url: '/player/add_friend',  // url where we want to send the form data
        type: 'GET', // the type of form submission; GET or POST
        contentType: "json",  // the type of data we are sending
        data: payload,  // the actual data we are sending
        complete: function(data) {  // what to do with the response back from the server'
            if(data.responseJSON.message != undefined) {
                $('#message').html(data.responseJSON.message);
                $('#error').hide();
                $('#message').show();
            }
            else {
                $('#error').html(data.responseJSON.error);
                $('#message').hide();

                $('#error').show();
            }
        }
    });
};

var removeFriend = function(FriendID) {
    var payload = {
        FriendID: FriendID
    };
    console.log(payload);
    $.ajax({
        url: '/player/remove_friend',  // url where we want to send the form data
        type: 'GET', // the type of form submission; GET or POST
        contentType: "json",  // the type of data we are sending
        data: payload,  // the actual data we are sending
        complete: function(data) {  // what to do with the response back from the server'
            if(data.responseJSON.message != undefined) {
                $('#message').html(data.responseJSON.message);
                $('#error').hide();
                $('#message').show();
            }
            else {
                $('#error').html(data.responseJSON.error);
                $('#message').hide();

                $('#error').show();
            }
        }
    });
};

$(document).ready(function() {

    $('#addFriend').click(function(e) {
        console.log('add friend clicked');
        e.preventDefault();
        addFriend();
    });

    $('#removeFriend').click(function(e) {
        console.log('remove friend clicked');
        e.preventDefault();
        removeFriend();
    });

});