export default {
    name: 'address',
    title: 'Address',
    type: 'document',
    fields: [
        {
            name: "title",
            type: "string",
            title: "Title"
          },
          {
            name: 'slug',
            type: 'slug',
            title: "Slug",
            options: {
              source: (doc:any,path:any) => 'adress-' + path.parent.title,
            },
          },
          {
            name:"street",
            title:"Street",
            type:"string"
          },
          {
            name:"postalcode",
            title:"Postal code",
            type:"string"
          },
          {
            name:"city",
            title:"City",
            type:"string"
          },
          {
            name:"country",
            title:"Country",
            type:"country",
          },
          {
            name: "description",
            type: "richText",
            title: "Description"
          }         
    ]
}