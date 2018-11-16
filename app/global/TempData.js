const LOCATIONS = [
    { title: "Croatia", subTitle: "23€ /night average", slug: "croatia", image: require("../../pages/index/images/locations/croatia.jpg") },
    { title: "Greece", subTitle: "63€ /night average", slug: "greece", image: require("../../pages/index/images/locations/greece.jpg") },
    { title: "Spain", subTitle: "47€ /night average", slug: "spain", image: require("../../pages/index/images/locations/spain.jpg") },
    { title: "Italy", subTitle: "90€ /night average", slug: "italy", image: require("../../pages/index/images/locations/italy.jpg") },
    { title: "Caribbean", subTitle: "120€ /night average", slug: "caribbean", image: require("../../pages/index/images/locations/caribbean.jpg") }
].map((data) => {
    return {
        ...data,
        url: { pathname: "/search", query: { location: data.slug } }
    }
})

const ESCAPES = [
    { title: "Denmark", slug: "denmark", image: require("../../pages/index/images/escapes/denmark.jpg") },
    { title: "Germany", slug: "germany", image: require("../../pages/index/images/escapes/germany.jpg") },
    { title: "Iceland", slug: "iceland", image: require("../../pages/index/images/escapes/iceland.jpg") },
    { title: "Norway", slug: "norway", image: require("../../pages/index/images/escapes/norway.jpg") },
    { title: "Sweden", slug: "sweden", image: require("../../pages/index/images/escapes/sweden.jpg") }
].map((data) => {
    return {
        ...data,
        url: { pathname: "/search", query: { location: data.slug } }
    }
})

export {
    ESCAPES,
    LOCATIONS
}