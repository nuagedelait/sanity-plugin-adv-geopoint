export default {
    name: 'location',
    type: 'object',
    title: 'Location',
    fields: [
      {
        title: 'Adress',
        name: 'address',
        description: 'Geoloc adress',
        type: 'reference',
        to: [{type: 'address'}]
      },
      {
        name: 'geoloc',
        title: 'Coordinate',
        type: 'advGeopoint',
      },
    ]
  };