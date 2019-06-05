const production = process.env.NODE_ENV === "production";

const prodOrDevConfigs = production
  ? require("./config.prod.js").default
  : require("./config.dev.js").default;

const configService = {
  ...prodOrDevConfigs,
  TIME_BOTTOM_NOTIFICATION: 5000,
  DEFAULT_LANGUAGE: "en-us"
};
export default configService;
