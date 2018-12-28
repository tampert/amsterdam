import * as FIELDS from './Fields';
import * as TempDATA from './TempData';
import * as IMAGES from './Image';
import * as THEME from './Theme';

// const WEB_ROOT = "https://staging-edu.qa.zizoo.technology";
// const API_ROOT = `${WEB_ROOT}/api/gds/v1`;
const API_MAGAZINE = "http://lobster.zizoo.technology/wp-json/wp/v2";


//const API_ROOT = "https://api.nestoria.de/api?encoding=json&pretty=1&action=search_listings&country=UK&listing_type=buy&place_name=berlin" 
// const API_ROOT = "https://api.nestoria.co.uk/api" 
const API_ROOT = "https://api.nestoria.co.uk/api" 
const PAGE_SIZE = 12;

// AUTHORIZATION
const API_HEADER_AUTH = "postmalone";

export {
    API_MAGAZINE,
    THEME,
    IMAGES,
    WEB_ROOT,
    PAGE_SIZE,
    API_ROOT,
    FIELDS,
    TempDATA,
    API_HEADER_AUTH
}