import jsonata from "jsonata";

export const item_mapping = jsonata(
`{
    "id": $string(id),
    "descriptor": {
        "name": name,
        "code": "energy"
    },
    "tags": [
        {
            "descriptor": {
                "code":"connector-specifications",
                "name": "Connector Specifications"
            },
            "list": [
                {
                    "descriptor": {
                        "name": "connector Id",
                        "code": "connector-id"
                    },
                    "value": connector_id
                },
                {
                    "descriptor": {
                        "name": "Connector Type",
                        "code": "connector_type"
                    },
                    "value": standard
                },
                {
                    "descriptor": {
                        "name": "Power Type",
                        "code": "power_type"
                    },
                    "value": power_type
                }
            ]
        }
    ],
    "price": {
    "currency": "INR/kWh",
        "value": ""
    },
    "location_ids": [
        location_id
    ]
}`
);