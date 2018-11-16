const BOAT_TYPES = [
    {
        value: "sailboat",
        label: "Sailboat"
    },
    {
        value: "catamaran",
        label: "Catamaran"
    },
    {
        value: "motorboat",
        label: "Motor Boat"
    },
    {
        value: "gulet",
        label: "Gulet"
    },
    {
        value: "speedboat",
        label: "Speedboat"
    },
    {
        value: "rib",
        label: "RIB"
    }
].sort((a, b) => a.label.localeCompare(b.label));

const SORTING = [
    {
        id: "recommended",
        label: "Recommended"
    },
    {
        id: "price",
        label: "Price Ascending"
    },
    {
        id: "price_high",
        label: "Price Descending"
    },
    {
        id: "discount",
        label: "Discount"
    }
]

export {
    SORTING,
    BOAT_TYPES
}