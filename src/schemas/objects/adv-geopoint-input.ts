import MapPicker from '../../components/mapPicker';

export default {
    name: 'advGeopoint',
    type: 'object',
    title: 'Advance Geopoint',
    fields: [
        {
            title: 'Address',
            name: 'address',
            description: 'Geoloc adress',
            type: 'place',
        },
        {
            title: 'Coordinate',
            name: 'geoloc',
            type: 'geopoint',
        },
        {
            title: 'Map Config',
            name: 'mapConfig',
            type: 'object',
            fields: [
                {
                    title: "Zoom",
                    name: "zoom",
                    type: "number",
                },
                {
                    title: "Center",
                    name: "center",
                    type: "geopoint",
                }
            ]
        },
    ],
    components: {
        input: MapPicker,
    }
}