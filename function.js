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


function bookTaxi(pickupLocation,dropLocation,from_time){
    console.log(pickupLocation,dropLocation,from_time);
    var taxi = findTaxi(pickupLocation);

    console.log(taxi);

    updateTaxiStand(taxi,dropLocation);

}

function updateTaxiStand(taxi,dropLocation){
    taxiLocations.forEach(item => {
        var taxi_stand = item.taxi_stand;
        if(taxi_stand.length > 0){
            let index;
            while ((index = taxi_stand.indexOf(taxi)) !== -1) {
                taxi_stand.splice(index, 1);
            }
            item.taxi_stand = taxi_stand;
        }
    });
    let index = dropLocation - 1;
    if(taxiLocations[index]){
        let taxi_stand = taxiLocations[index].taxi_stand;
        taxi_stand.push(taxi);
        taxi_stand.sort();
        taxiLocations[index].taxi_stand = taxi_stand;
    }
    console.log(taxiLocations);
}


function checkTaxiTime(taxi){
    return taxi;
}

function findTaxi(pickupLocation){
    var totalLength = taxiLocations.length;

    // first check in current location
    var freeTaxi = [];

    let availableTaxi = taxiLocations[pickupLocation - 1].taxi_stand;
    if(availableTaxi.length){
        availableTaxi.forEach((taxi) => {
            let res = checkTaxiTime(taxi);
            if(res){
                freeTaxi.push(taxi);
            }
        });
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

            availableTaxi.forEach((taxi) => {
                let res = checkTaxiTime(taxi);
                if(res){
                    freeTaxi.push(taxi);
                }
            });
            pass1 = true;

        }
        leftSide--;

        if(rightSide <= totalLength -1){
            let availableTaxi = taxiLocations[rightSide].taxi_stand;

            availableTaxi.forEach((taxi) => {
                let res = checkTaxiTime(taxi);
                if(res){
                    freeTaxi.push(taxi);
                }
            });
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




