$(document).on('click','.location_btn',function(){

    var currentSelectedId = $(this).data('id');

    var pickupLocation = taxiLocations.find((item) => item.id === currentSelectedId);

    var RemainingLocation = taxiLocations.filter((item) => item.id !== currentSelectedId);

    let html = '<option value="0">Drop Location</option>';
    RemainingLocation.forEach((item,index) => {
        html += `
        <option value="${item.id}">${item.name}</option>
        `;
    });

    $('#to_location').html(html);
    $('#from_time').val(0);
    $('#pickup_point').val(currentSelectedId);
    $('#pickup_point_span').text(pickupLocation.name);
    $('#popup_modal').show();
});

document.getElementById("from_time").addEventListener("input", function() {
    // Get the input element
    var inputElement = document.getElementById("from_time");
    // Get the value of the input
    var value = inputElement.value;
    
    // Check if the value is a non-negative integer
    if (value !== "" && (isNaN(value) || parseInt(value) != value || value < 0 || value > 24)) {
        if (value < 0) {
            inputElement.value = 0;
        } else if (value > 24) {
            inputElement.value = 24;
        } else {
            // If not an integer, set the value to the closest integer
            inputElement.value = Math.round(parseFloat(value));
        }
    }
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
    var pickupLocation = $('#pickup_point').val();
    bookTaxi(pickupLocation,dropLocation,from_time);
    
});


$('#reset_app').click(function(){
    var res = confirm('Are you sure?');
    if(res){
        setDay();
    }
});

$('#taxi_details').click(function(){

});