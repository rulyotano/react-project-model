const production = process.env.NODE_ENV === 'production';

const prodOrDevConfigs = production ? require('./config.prod.js').default : require('./config.dev.js').default;

export const CLIENT_TYPE_CANE = "CANE_CLIENT";
export const CLIENT_TYPE_CANE_MECHANIZED_CUT_ID = 0;
export const CLIENT_TYPE_GRAIN = "GRAIN_CLIENT";

const configService = {
  ...prodOrDevConfigs,    // dev or prod configuration    
  // rest of configuration e.g.
  TIME_BOTTOM_NOTIFICATION: 5000,  // ms
  DEFAULT_LANGUAGE: "en-us",
  MAPBOX_TOKEN: "pk.eyJ1Ijoic29saW5mdGVjLWRldiIsImEiOiJjamFsMnQ3M3QycTA2MzNtaGt1cXM5bzVhIn0.9UYkKQajPKWdMHPCge17Cw",
  MAP_DEFAULT_CENTER: {lat: -17.4709498, lng: -49.7206912},   // Brasil
  CLIENT_TYPE: CLIENT_TYPE_GRAIN,
  // CLIENT_TYPE: CLIENT_TYPE_CANE
};
export default configService;