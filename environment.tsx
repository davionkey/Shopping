import Constants from "expo-constants";
import { Platform } from "react-native";

const ENV = {
  dev: {
    apiUrl: "https://vivimodo.com/",
  },
  staging: {
    apiUrl: "https://vivimodo.com/",
  },
  prod: {
    apiUrl: "https://vivimodo.com/",
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  }
};

export default getEnvVars;
