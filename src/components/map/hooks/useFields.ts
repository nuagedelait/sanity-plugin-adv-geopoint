export const useGoogleFields = (type:any) => {
    const googleFields:any = {};
    const addressType = type.fields.find( (type:any) => type.name === 'address');
    if(addressType){
        addressType.type.fields.forEach( (field:any) => {
            if(field.type.options && field.type.options.googleField){
                googleFields[field.type.options.googleField] = field.name;
            }else{
                googleFields[field.name] = field.name;
            }
        })
    }
    return googleFields;
}

export const useAddressFields = (googleFields:any, googlePlace:any) => {

    const address:any = {}

    const components = [
            ...googlePlace.address_components,
            {
                types:['name'],
                long_name:googlePlace.name
            }
        ].forEach( component => {
        const componentType = component.types[0];
        const componentValue = component.long_name;

        if(googleFields[componentType]){
            address[googleFields[componentType]] = componentValue;
        }
    })

    return address;
}