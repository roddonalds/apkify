const sjs = require('shelljs');

sjs.config.silent = true;

const pathDistDir = '/root/app/dist',
      pathBuildDir = '/root/app/platforms/android/app/build/outputs',
        pathSrcBuiltDebugApk = pathBuildDir + '/apk/debug/app-debug.apk',
        pathSrcBuiltReleaseAab = pathBuildDir + '/bundle/release/app-release.aab',
            zipalign = '/opt/android-sdk/build-tools/29.0.3/zipalign';

(() => {

    console.log('Cleaning dist dir')
    sjs.exec(`rm ${pathDistDir}/debugLatest.apk`)
    sjs.exec(`rm ${pathDistDir}/releaseLatest.aab`)
    sjs.exec('sleep 1.5')

    console.log('Coping newest built .apk to dist dir')
    sjs.exec(`cp ${pathSrcBuiltDebugApk} ${pathDistDir}/debugLatest.apk`)
    
    console.log('Zipaliging newest built .apk on dist dir')
    sjs.exec(`${zipalign} -v 4 ${pathDistDir}/debugLatest.apk ${pathDistDir}/debugLatest.apk`)

    console.log('Coping newest built .aab to dist dir')
    sjs.exec(`cp ${pathSrcBuiltReleaseAab} ${pathDistDir}/releaseLatest.aab`)

    //console.log('Cleaning build dir')
    //sjs.exec(`rm ${pathSrcBuiltDebugApk}`)
    //sjs.exec(`rm ${pathSrcBuiltReleaseAab}`)
})();