

export const airportOptions: google.maps.places.AutocompleteOptions = {
    componentRestrictions: { country: "in" },
    // fields: ["address_components", "geometry", "icon", "name", "formatted_address"],
    types: ["airport"],
};

export const addressOptions: google.maps.places.AutocompleteOptions = {
    componentRestrictions: { country: "in" },
    fields: ["address_components", "geometry", "icon", "name", "formatted_address"],
};

export const cityOptions: google.maps.places.AutocompleteOptions = {
    componentRestrictions: { country: "in" },
    fields: ["address_components", "geometry", "icon", "name", "formatted_address"],
    types: ["(cities)"],
};

export function areAllValuesPresent(data: any[]) {
    return data.every(value => value !== undefined && value !== null && value !== '');
}

export function areServiceValuesPresent(data: any[]) {
    return data.every(value => value.title !== undefined && value.title !== null && value.title !== '');
}

export function areOneWayPricingValuesPresent(data: any[]) {
    return data.every(value => (value.from !== undefined || value.to !== undefined) && (value.from !== null || value.to !== null) && (value.from !== '' || value.to !== ""));
}
export function areRoundTripPricingValuesPresent(data: any[]) {
    return data.every(value => (value.from !== undefined) && (value.from !== null) && (value.from !== ''));
}