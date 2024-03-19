const sjs = require('shelljs');

sjs.config.silent = true;

const pathDistDir = '/root/app/dist',
        remoteDistDir = '/home/deploy/ticket4.fun/_proj/cdn',
            remoteUser = 'deploy',
                remoteAddr = 'ticket4.fun',
                    remoteCdnAddr = 'cdn.ticket4.fun';

;(() => {

    console.log('Uploading debugLatest.apk to remote CDN server')
    sjs.exec(`scp ${pathDistDir}/debugLatest.apk ${remoteUser}@${remoteAddr}:${remoteDistDir}`)
    console.log(`https://${remoteCdnAddr}/debugLatest.apk`)

    console.log('Uploading releaseLatest.aab to remote CDN server')
    sjs.exec(`scp ${pathDistDir}/releaseLatest.aab ${remoteUser}@${remoteAddr}:${remoteDistDir}`)
    console.log(`https://${remoteCdnAddr}/releaseLatest.aab`)

})();