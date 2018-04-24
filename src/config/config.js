let production = process.env.NODE_ENV === 'production'

let prodOrDevConfigs = production ? require('./config.prod.js').default : require('./config.dev.js').default

const configService = {
    ...prodOrDevConfigs,    //dev or prod configuration    
    //rest of configuration e.g.
    TIME_BOTTOM_NOTIFICATION: 5000,  //ms
    DEFAULT_LANGUAGE: "en-us",
    MAPBOX_TOKEN: "pk.eyJ1Ijoic29saW5mdGVjLWRldiIsImEiOiJjamFsMnQ3M3QycTA2MzNtaGt1cXM5bzVhIn0.9UYkKQajPKWdMHPCge17Cw",
    MAP_DEFAULT_CENTER: {lat: -17.4709498, lng: -49.7206912},   //Brasil
}
export default configService