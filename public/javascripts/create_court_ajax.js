var createCourt = function() {

    var payload = {
        CourtName: $('#CourtName').val(),
        Address: $('#Address').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        ZipCode: $('#ZipCode').val()
    };
    console.log(payload);

    $.ajax({
        url: '/court/save',  // url where we want to send the form data
        type: 'GET', // the type of form submission; GET or POST
        contentType: "json",  // the type of data we are sending
        data: payload,  // the actual data we are sending
        complete: function(data) {  // what to do with the response back from the server

            $('#message').html(data.responseJSON.message);
            $('#message').show();
            // window.location.assign('/');
        }
    })
};

$(document).ready(function() {

    $('#createCourt').click(function(e) {
        // When ddBtn is clicked this console log statement logs to your browser's console log not Node.js in Webstorm
        console.log('create court clicked');

        // this prevents the form from being submitted using the non-ajax method
        e.preventDefault();

        // runs the ajax function defined above.
        createCourt();
    });
});