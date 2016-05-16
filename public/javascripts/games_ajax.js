var applyPreferences = function() {

    var payload = {
        SkillLevel: $('#SkillLevel').val()
    };
    console.log(payload);
    $.ajax({
        url: '/game/search',  // url where we want to send the form data
        type: 'GET', // the type of form submission; GET or POST
        contentType: "json",  // the type of data we are sending
        data: payload,  // the actual data we are sending
        complete: function(data) {  // what to do with the response back from the server'
            window.redirect('/game/search');
            // if(data.responseJSON.message != undefined) {
            //     $('#message').html(data.responseJSON.message);
            //     // $('#error').hide();
            //     $('#message').show();
            // }
            // else {
            //     // $('#error').html(data.responseJSON.error);
            //     // $('#message').hide();
            //     // $('#error').show();
            // }
        }
    });
};

$(document).ready(function() {

    $('#applyPreferences').click(function(e) {
        console.log('apply preferences clicked');
        e.preventDefault();
        applyPreferences();
    });
});