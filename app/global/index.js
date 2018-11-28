import * as FIELDS from './Fields';
import * as TempDATA from './TempData';
import * as IMAGES from './Image';
import * as THEME from './Theme';

// const WEB_ROOT = "https://staging-edu.qa.zizoo.technology";
// const API_ROOT = `${WEB_ROOT}/api/gds/v1`;
const API_MAGAZINE = "http://lobster.zizoo.technology/wp-json/wp/v2";


const API_ROOT = "https://api.nestoria.de/api?encoding=json&pretty=1&action=search_listings&country=UK&listing_type=buy&place_name=berlin" 
//const API_ROOT = "https://api.nestoria.co.uk/api?action=echo&encoding=json&foo=bar" 
const PAGE_SIZE = 12;

// AUTHORIZATION
const API_HEADER_AUTH = "BYBDuIaqst29EXL4PXmyUs1vmj7bB5NW53wsjEXvJLXvA9tbQ4TA3X25dy3m9XfOkbUJipgKOW1BwFLliv9o21BSyd9Bm1bYbjVTCFXGlwEjlza7NfOkWAJF82VsnaVX2JN0ALWSQW7yfKFtL4Xwiji74UE0or3ri0e65AZKMjnY9EQ9pzvZTXYygBOs0fSvcvHHwgNnD";

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