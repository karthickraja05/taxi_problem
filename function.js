const locations = [
    {
        id: 1,
        name: 'Point A',
    },
    {
        id: 2,
        name: 'Point B',
    },
    {
        id: 3,
        name: 'Point C',
    },
    {
        id: 4,
        name: 'Point D',
    },
    {
        id: 5,
        name: 'Point E',
    },
    {
        id: 6,
        name: 'Point F',
    },
];


const taxis = [

];


function addTaxis(length){
    for (let index = 1; index <= length; index++) {
        taxis.push(`T${index}`)
    }
}

// Add Number Taxis
addTaxis(4);

function addLocations(){
    let html = '';
    locations.forEach((item,index)=>{
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








