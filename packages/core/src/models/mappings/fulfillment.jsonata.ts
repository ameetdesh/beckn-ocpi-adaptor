import jsonata from "jsonata";

/*
Variables for mapping: 
{
    start_time,
    end_time,
    location_gps,
    location_name,
    location_address
}
*/

export const fulfillment_mapping = jsonata(`
    {
        "id": "001",
        "type": "CHARGING",
        "stops": [
            {
                "type": "start",
                "time": {
                    "timestamp": start_time
                },
                "location": {
                    "descriptor": {
                        "name": location_name
                    },
                    "gps": location_gps,
                    "address": location_address
                }
            },
            {
                "type": "finish",
                "time": {
                    "timestamp": end_time
                },
                "location": {
                    "descriptor": {
                        "name": location_name
                    },
                    "gps": location_gps,
                    "address": location_address
                }
            }
        ]
    }
    `
    );