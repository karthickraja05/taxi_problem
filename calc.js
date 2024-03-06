$(document).on('click','.location_btn',function(){

    var currentSelectedId = $(this).data('id');

    var pickupLocation = locations.find((item) => item.id === currentSelectedId);

    var RemainingLocation = locations.filter((item) => item.id !== currentSelectedId);

    let html = '<option value="0">Drop Location</option>';
    RemainingLocation.forEach((item,index) => {
        html += `
        <option value="${item.id}">${item.name}</option>
        `;
    });

    $('#to_location').html(html);
    $('#from_time').val(0);

    $('#popup_modal').show();
});


$('#modal_close,#btn-close').click(function(){
    $('#popup_modal').hide();
});


$('#modal_submit').click(function(){
    var from_time = $('#from_time').val();
    var dropLocation = $("#to_location option:selected").val();

    if(dropLocation === '0'){
        alert('Please select drop location');
        return '';
    }
   
    bookTaxi(dropLocation,from_time);
    
});


$('#reset_app').click(function(){

});

$('#taxi_details').click(function(){

});