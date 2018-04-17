let production = process.env.NODE_ENV === 'production'

let prodOrDevConfigs = production ? require('./config.prod.js').default : require('./config.dev.js').default

const configService = {
    ...prodOrDevConfigs,    //dev or prod configuration    
    //rest of configuration e.g.
    TIME_BOTTOM_NOTIFICATION: 5000,  //ms
    DEFAULT_LANGUAGE: "en-us"
}
export default configService