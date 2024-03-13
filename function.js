const taxiLocations = [
    {
        id: 1,
        name: 'Point A',
        taxi_stand: [

        ],
    },
    {
        id: 2,
        name: 'Point B',
        taxi_stand: [

        ],
    },
    {
        id: 3,
        name: 'Point C',
        taxi_stand: [

        ],
    },
    {
        id: 4,
        name: 'Point D',
        taxi_stand: [

        ],
    },
    {
        id: 5,
        name: 'Point E',
        taxi_stand: [

        ],
    },
    {
        id: 6,
        name: 'Point F',
        taxi_stand: [

        ],
    },
];

let bookingID = 1;

const taxisData = {

};

const taxis = [

];


function addTaxis(length){
    for (let index = 1; index <= length; index++) {
        taxis.push(`T${index}`);
    }

    taxiLocations.forEach((item,index) => {
        if(item.id === 1){
            item.taxi_stand = taxis;
        }else{
            
            item.taxi_stand = [];
        }
    });
}


function setDay(){
    
    taxiLocations.forEach((item,index) => {
        if(item.id === 1){
            item.taxi_stand = taxis;
        }else{
            
            item.taxi_stand = [];
        }
    });
}


// Add Number Taxis
addTaxis(4);

function addLocations(){
    let html = '';
    taxiLocations.forEach((item,index)=>{
        html += `
                <div class="m-5">
                    <button class="button btn-primary p-2 location_btn" data-id="${item.id}">${item.name}</button>
                </div>
                `;
    });

    $('#location_container').html(html);
}

// add location
addLocations();

let taxiComingFrom;

function bookTaxi(pickupLocation,dropLocation,from_time){
    
    var taxi = findTaxi(pickupLocation,from_time);
    if(taxi === ''){
        alert('No Taxis Available Right now');
        return ;
    }
    updateTaxiStand(taxi,dropLocation);

    var fare = calcFare(pickupLocation,dropLocation);
    
    var time = calcTime(pickupLocation,dropLocation);

    updateTaxiData(taxi,fare,time,from_time);

    bookingID++;
    
    let message = `Taxi Number: ${taxi} will pick you at ${time[0] + parseInt(from_time)}`;

    alert(message);

    setTimeout(()=>{
        $('#popup_modal').hide();
    },500);
}

function updateTaxiData(taxi,fare,time,from_time){

    if(taxisData[taxi] === undefined){
        taxisData[taxi] = [
            {
                bookingID: bookingID,
                fare : fare,
                pickUpTime: time[0] + Number(from_time),
                dropTime: time[0] + time[1] + Number(from_time),
            }
        ];
    }else{
        taxisData[taxi].push({
            bookingID: bookingID,
            fare : fare,
            pickUpTime: time[0] + Number(from_time),
            dropTime: time[0] + time[1] + Number(from_time),
        })
    }
    
}

function calcTime(pickupLocation,dropLocation){

    let travelTime = (Math.abs(dropLocation - pickupLocation))

    let toPickTravelTime = (Math.abs(taxiComingFrom['id'] - pickupLocation));

    return [
        toPickTravelTime,
        travelTime
    ];
}


function updateTaxiStand(taxi,dropLocation){
    taxiLocations.forEach(item => {
        var taxi_stand = item.taxi_stand;
        if(taxi_stand.length > 0){
            let index;
            if ((index = taxi_stand.indexOf(taxi)) !== -1) {
                taxiComingFrom = item;
                taxi_stand.splice(index, 1);
                item.taxi_stand = taxi_stand;
            }
        }
    });

    let index = dropLocation - 1;
    if(taxiLocations[index]){
        let taxi_stand = taxiLocations[index].taxi_stand;
        taxi_stand.push(taxi);
        taxi_stand.sort();
        taxiLocations[index].taxi_stand = taxi_stand;
    }
}


function calcFare(pickupLocation,dropLocation){
    let km = (Math.abs(dropLocation - pickupLocation)) * 15; // 15 mean km between each location

    return ((km - 5) * 10) + 100 ;
}

function checkTaxiTime(taxi,from_time){

    if(taxisData[taxi] === undefined){
        return true;
    }
    
    var len = taxisData[taxi].length;

    var lastRecord = taxisData[taxi][len-1];
    
    if(lastRecord['dropTime'] > from_time){
        return false;
    }else{
        return true;
    }

}   

function findTaxi(pickupLocation,from_time){
    var totalLength = taxiLocations.length;

    // first check in current location
    var freeTaxi = [];

    let availableTaxi = taxiLocations[pickupLocation - 1].taxi_stand;
    if(availableTaxi.length){

        for (let index = 0; index < availableTaxi.length; index++) {
            let taxi = availableTaxi[index];
            let res = checkTaxiTime(taxi,from_time);
            if(res === true){
                freeTaxi.push(taxi);
                break;
            }
        }


        
    }
    
    if(freeTaxi.length > 0){
        return checkEarning(freeTaxi);
    }

    // if there is not taxi at current location, check next nearest point
    var leftSide = pickupLocation - 2;
    var rightSide = pickupLocation;
    while(true){
        freeTaxi = [];
        let pass1 = false;
        let pass2 = false;
        if(leftSide >= 0){
            let availableTaxi = taxiLocations[leftSide].taxi_stand;

            for (let index = 0; index < availableTaxi.length; index++) {
                let taxi = availableTaxi[index];
                let res = checkTaxiTime(taxi,from_time);
                if(res === true){
                    freeTaxi.push(taxi);
                    break;
                }
            }
            pass1 = true;

        }
        leftSide--;

        if(rightSide <= totalLength -1){
            let availableTaxi = taxiLocations[rightSide].taxi_stand;

            for (let index = 0; index < availableTaxi.length; index++) {
                let taxi = availableTaxi[index];
                let res = checkTaxiTime(taxi,from_time);
                if(res === true){
                    freeTaxi.push(taxi);
                    break;
                }
            }
            pass2 = true;

        }
        rightSide++;

        if(freeTaxi.length > 0){
            return checkEarning(freeTaxi);
        }

        if(pass1 === false && pass2 === false){
            break;
        }
    }

    return ''

}

function checkEarning(availableTaxi){
    // need to calc earnings, if more than one

    var taxiName = availableTaxi[0];

    return taxiName;




}




