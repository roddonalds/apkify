cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-app-version.AppVersionPlugin",
      "file": "plugins/cordova-plugin-app-version/www/AppVersionPlugin.js",
      "pluginId": "cordova-plugin-app-version",
      "clobbers": [
        "cordova.getAppVersion"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.5",
    "cordova-plugin-app-version": "0.1.14"
  };
});