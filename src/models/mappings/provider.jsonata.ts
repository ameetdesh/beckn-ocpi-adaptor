import jsonata from "jsonata";

/*
Variables for mapping: 
{
    provider_id,
    provider_name,
    location_id,
    location_gps,
    location_name,
    location_address
}
*/

export const provider_mapping = jsonata(`
{
    "id": provider_id,
    "descriptor": {
        "name": provider_name
    },
    "locations": [
        {
            "id": location_id,
            "gps": location_gps,
            "descriptor": {
                "name": location_name
            },
            "address": location_address
        }
    ]
}
`);