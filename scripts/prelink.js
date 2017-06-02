try {
  var fs = require('fs');
  var shell = require('shelljs');
  var cmd = require('node-cmd');
  var copy = shell.cp;
  var exec = require('child_process').exec;

  var PACKAGE_JSON = process.cwd() + '/package.json';
  var package = JSON.parse(fs.readFileSync(PACKAGE_JSON));
  var VERSION = checkVersion();

  // var glob = require('glob');
  // var addAndroidPermissions = process.env.RNFB_ANDROID_PERMISSIONS == 'true';
  // var MANIFEST_PATH = glob.sync(process.cwd() + '/android/app/src/main/**/AndroidManifest.xml')[0];

  // var APP_NAME = package.name;
  // var PACKAGE_GRADLE = process.cwd() + '/node_modules/react-native-fetch-blob/android/build.gradle'
  //
  // console.log('RNFetchBlob detected app version => ' + VERSION);

  if(VERSION < 0.31) {
    console.log('You project version is '+ VERSION + ' which may not compatible to rich-text-editor (>= 0.31.0)');
    return;
    // var main = fs.readFileSync(PACKAGE_GRADLE);
    // console.log('adding OkHttp3 dependency to pre 0.28 project .. ')
    // main = String(main).replace('//{RNFetchBlob_PRE_0.28_DEPDENDENCY}', "compile 'com.squareup.okhttp3:okhttp:3.4.1'");
    // fs.writeFileSync(PACKAGE_GRADLE, main);
    // console.log('adding OkHttp3 dependency to pre 0.28 project .. ok')
  } else {


    // iOS
    console.log('iOS done.');

    // android
//     copy('-R', process.cwd() + '/node_modules/rich-text-editor/src/MathJax', process.cwd() + '/android/app/src/main/assets/MathJax');
//     fs.appendFileSync(
//       process.cwd() + '/android/app/build.gradle',
//       `\nproject.afterEvaluate {\r\
//     apply from: "../../node_modules/rich-text-editor/htmlCopy.gradle";\r\
//     copyEditorHtmlToAppAssets(file("../../node_modules/rich-text-editor"));\r\
// }\n`
//     );
    console.log('android done.');

    // use something different
    // cmd.run('react-native link react-native-image-picker');
    // cmd.run('react-native link react-native-webview-bridge-updated');

    // shell.exec('react-native link react-native-image-picker');
    // shell.exec('react-native link react-native-webview-bridge-updated');
    // exec('react-native link react-native-image-picker > /dev/null');
    // exec('react-native link react-native-image-picker > /dev/null', function(error, stdout, stderr) {
    //   console.log("error", error);
    //   console.log("stdout", stdout);
    //   console.log("stderr", stderr);
    //   shell.exit(0);
    // });
    // exec('react-native link react-native-webview-bridge-updated > /dev/null');

    console.log('end');
  }
  // console.log('Add Android permissions => ' + (addAndroidPermissions == "true"))
  //
  // if(addAndroidPermissions) {
  //
  //   // set file access permission for Android < 6.0
  //   fs.readFile(MANIFEST_PATH, function(err, data) {
  //
  //     if(err)
  //       console.log('failed to locate AndroidManifest.xml file, you may have to add file access permission manually.');
  //     else {
  //
  //       console.log('RNFetchBlob patching AndroidManifest.xml .. ');
  //       // append fs permission
  //       data = String(data).replace(
  //         '<uses-permission android:name="android.permission.INTERNET" />',
  //         '<uses-permission android:name="android.permission.INTERNET" />\n    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" /> '
  //       )
  //       // append DOWNLOAD_COMPLETE intent permission
  //       data = String(data).replace(
  //         '<category android:name="android.intent.category.LAUNCHER" />',
  //         '<category android:name="android.intent.category.LAUNCHER" />\n     <action android:name="android.intent.action.DOWNLOAD_COMPLETE"/>'
  //       )
  //       fs.writeFileSync(MANIFEST_PATH, data);
  //       console.log('RNFetchBlob patching AndroidManifest.xml .. ok');
  //
  //     }
  //
  //   })
  // }
  // else {
  //   console.log(
  //     '\033[95mreact-native-fetch-blob \033[97mwill not automatically add Android permissions after \033[92m0.9.4 '+
  //     '\033[97mplease run the following command if you want to add default permissions :\n\n' +
  //     '\033[96m\tRNFB_ANDROID_PERMISSIONS=true react-native link \n')
  // }

  function checkVersion() {
    console.log('rich-text-editor checking app version ..');
    return parseFloat(/\d\.\d+(?=\.)/.exec(package.dependencies['react-native']));
  }

} catch(err) {
  console.log(
    '\033[95mrich-text-editor\033[97m link \033[91mFAILED \033[97m\nCould not automatically link package :'+
    err.stack)
}
