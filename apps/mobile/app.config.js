const { existsSync } = require("node:fs");
const { join } = require("node:path");

// Android notifications come through Firebase Cloud Messaging, which needs the Firebase file of the
// app. The file is optional, so the app builds before the Firebase project exists, and such a build
// gets no notifications on Android. The file has public identifiers only; the account service has the
// key that sends.
const GOOGLE_SERVICES_FILE = "./google-services.json";

/** @param {{ config: import('expo/config').ExpoConfig }} context */
module.exports = ({ config }) => {
  let result = existsSync(join(__dirname, GOOGLE_SERVICES_FILE))
    ? { ...config, android: { ...config.android, googleServicesFile: GOOGLE_SERVICES_FILE } }
    : config;
  // A self-host build (EXPO_PUBLIC_OPENBOT_API_URL set) must not contact the update server of the
  // hosted service, so it ships without the `updates` configuration and expo-updates stays off.
  if (process.env.EXPO_PUBLIC_OPENBOT_API_URL) {
    const { updates: _updates, ...rest } = result;
    result = rest;
  }
  return result;
};
