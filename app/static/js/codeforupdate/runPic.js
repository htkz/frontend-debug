showRunPic = function() {
    if(!curDataStructure) {
        swal({
          title: "No datastructrue selected!",
          text: "Please select a datastructrue!",
          type: "error",
          timer: 1000,
          showConfirmButton: false,
        });
        return;
    }
    $('.run-pic').show(700);
    $.ajax({
        url: '/app/get_image',
        type: 'GET',
        data: {data_stucture_id : curDataStructure}
    })
    .done(function(imgUrl) {
        var url = `url(${window.location.origin}/${imgUrl})`;
        $('.run-pic .pic').css('background-image', url);
    })

}

hideRunPic = function() {
    $('.run-pic').hide(700);
}
