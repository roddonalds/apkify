const sjs = require('shelljs');

// sjs.config.silent = true;

const pathDistDir = '/root/app/dist',
        remoteDistDir = '/home/deploy/ticket4.fun/_proj/cdn',
            remoteUser = 'deploy',
                remoteAddr = 'ticket4.fun',
                    remoteCdnAddr = 'cdn.ticket4.fun';

const remotePathFiles = '/home/deploy/ticket4.fun/_proj/cdn',
        remotePathApk = `${remotePathFiles}/debugLatest.apk`,
            remotePathAab = `${remotePathFiles}/releaseLatest.aab`;

;(() => {

    console.log('Removing current .apk file from remote CDN server.')
    sjs.exec(`ssh ${remoteUser}@${remoteAddr} 'rm ${remotePathApk}'`)

    console.log('Removing current .aab file from remote CDN server.')
    sjs.exec(`ssh ${remoteUser}@${remoteAddr} 'rm ${remotePathAab}'`)

    setTimeout(() => {

        console.log('Uploading debugLatest.apk to remote CDN server')
        sjs.exec(`scp ${pathDistDir}/debugLatest.apk ${remoteUser}@${remoteAddr}:${remoteDistDir}`)
        console.log(`https://${remoteCdnAddr}/debugLatest.apk`)
    
        console.log('Uploading releaseLatest.aab to remote CDN server')
        sjs.exec(`scp ${pathDistDir}/releaseLatest.aab ${remoteUser}@${remoteAddr}:${remoteDistDir}`)
        console.log(`https://${remoteCdnAddr}/releaseLatest.aab`)

    }, 1500)

})();