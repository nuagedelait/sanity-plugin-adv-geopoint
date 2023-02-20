export default {
    title:"Place",
    name:"place",
    type: 'object',
    fields:[
        {
            title:'Name',
            name:'name',
            type:'string'
        },
        {
            title: 'Region',
            name: 'region',
            type: 'string',
            options:{
                googleField:'administrative_area_level_1'
            }
        },
        {
            title: 'Country',
            name: 'country',
            type: 'string' 
        },
        {
            title: 'Locality',
            name: 'locality',
            type: 'string' 
        },
        {
            title: 'Postal code',
            name: 'postal_code',
            type: 'string' 
        },
        {
            title: 'Route',
            name: 'route',
            type: 'string' 
        },
        {
            title: 'Street number',
            name: 'street_number',
            type: 'string' 
        },
        {
            title: 'zoom',
            name: 'zoom',
            type: 'number'
        }

    ]
}