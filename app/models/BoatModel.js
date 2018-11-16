// Global
import { WEB_ROOT } from '../global';

// Libraries
import shortid from 'shortid';

class BoatModel {

    constructor(item) {
        this.id = item.id;
        this.guid = shortid.generate();
        this.type = item.boat_type;
        this.brand = item.brand;
        this.model = item.model;
        this.year = item.year;
        this.length = item.length;
        this.cabins = item.cabins;
        this.berths = item.berths;
        this.guests = item.max_guests;
        this.locality = item.homeport.split(" / ")[0];
        this.country = item.homeport.split(" / ")[1];
        this.discount = item.discount;
        this.price = item.original_price;
        this.oldPrice = item.discount != 0 ? item.lowest_price : item.original_price;
        this.url = item.url;
        this.charterType = item.charterType;
        this.title = `${item.brand} ${item.model} (${item.year})`
        this.reviews = item.reviews ? item.reviews : { value: "0.0", count: 0 };
        this.images = this.addImageSizes(item.image);
        this.thumbnail = this.images[0].s;
    }

    addImageSizes(images) {
        const base = "thumb_338x172";
        return images.map((image) => {
            image = `${WEB_ROOT}${image}`
            return {
                xs: image,
                s: image.replace(base, "expose_414x242"),
                m: image.replace(base, "expose_600x450"),
                l: image.replace(base, "expose_780x585"),
                xl: image.replace(base, "expose_1000x750"),
            }
        });
    }

}

export default BoatModel;