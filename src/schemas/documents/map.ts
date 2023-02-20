import { PinIcon } from '@sanity/icons'


const getFilterInput = (filterTypeList: any) => {

    const field = {
        name: "filterType",
        title: "Filter Type",
        type: "string",
    }

    if (filterTypeList) {
        if (filterTypeList.length > 1) {
            return {
                ...field,
                initialValue: filterTypeList[0],
                options: {
                    list: filterTypeList
                }
            }
        } else {
            return {
                ...field,
                options: {
                    list: filterTypeList
                },
                initialValue: filterTypeList[0],
                readOnly: true
            }
        }

    } else {
        return {
            ...field,
            readOnly: true
        }
    }
}

export default {
    name: 'map',
    title: 'Map',
    type: 'document',
    icon: PinIcon,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string"
        },
        {
            name: "filterTerms",
            title: "Filter Terms",
            type: "text"
        },
        {
            name: "maxResults",
            title: "Max results",
            type: "number",
            initialValue: 10
        },
    ]
}