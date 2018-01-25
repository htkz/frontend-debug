$('#bottomBar .close-btn').click(function(event) {
    /* Act on the event */
    $('#bottomBar').animate({height: 0}, 300);
    $('.reminder span').text('show properties');
});

$('.reminder').on('mouseup', 'span', function(event) {
    event.preventDefault();
    if ($(this).text() === 'show properties') {
        $('#bottomBar').animate({height: '35vh'}, 300);
        setTimeout(function() {
            $('.reminder span').text('scroll down')
        }, 500);
    }
    if ($(this).text() === 'scroll down') {
        $('#bottomBar').animate({ scrollTop: $('#bottomBar').prop("scrollHeight")}, 500);
    }
});
