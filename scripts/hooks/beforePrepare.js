const beautify = require("json-beautify");
const xml2js = require('xml2js');
const fs = require('fs');
const packageJsonPath = '/root/project/package.json';
const configXmlPath = '/root/project/config.xml';
const androidManifestPath = '/root/project/platforms/android/app/src/main/AndroidManifest.xml'
    
;(() => {

    if (process.env.npm_lifecycle_event === 'debug:build') {
        console.log('Modo de build detectado:')
        console.log(process.env.npm_lifecycle_event, '\n')
        return;
    } else {
        console.log('Modo de build detectado:')
        console.log(process.env.npm_lifecycle_event)
        console.log('\n', 'Procceding to app version updates.', '\n')
    }
    
    const { newVersion, oldVersion } = updatePackejsonVersion()
    
    updateConfigXmlVersion(newVersion, oldVersion, () => {
        updateAndroidMnifestVersion(newVersion, oldVersion)
    })

})();

function updatePackejsonVersion () {
    
    const file = require(packageJsonPath);

    const currentVersionMin = Number(/[^.]*$/.exec(file.version)[0]),
            newVersion = `1.1.${currentVersionMin + 1}`;

    console.log('currentVersionMin', currentVersionMin)
    console.log('newVersion', newVersion)

    const oldVersion = file.version;

    file.version = newVersion;
    
    const newContent = beautify(file, null, 2, 80);
    
    fs.writeFileSync(packageJsonPath, newContent, function writeJSON(err) {
      if (err) return console.log(err);
    });

    return { newVersion, oldVersion };
}

async function updateConfigXmlVersion (newVersion, oldVersion, callback) {
    
    // Read XML file
    const data = fs.readFileSync(configXmlPath, 'utf-8')

    // Parse XML data
    await xml2js.parseString(data, (parseErr, result) => {

        if (parseErr) {
            console.error('Error parsing XML:', parseErr);
            return;
        }

        try {

            console.log('Old Version:', oldVersion);
            console.log('New Version:', newVersion);

            // Update XML with new version
            result.widget.$.version = newVersion;

            // Convert JSON back to XML
            const builder = new xml2js.Builder();
            const xml = builder.buildObject(result);

            // Write updated XML back to file
            fs.writeFileSync(configXmlPath, xml, (writeErr) => {
                if (writeErr) {
                    console.error('Error writing file:', writeErr);
                    return;
                }
                console.log('XML file updated with new version:', newVersion);
            });

            callback();

        } catch (e) {
            console.error('Error extracting version:', e);
        }
    });
}

function updateAndroidMnifestVersion (newVersion) {
       // Read the AndroidManifest.xml file
       let manifest = fs.readFileSync(androidManifestPath, 'utf-8');

       manifest = manifest.replace(/android:versionName="[^"]*"/, `android:versionName="${newVersion}"`);
       // Modify the manifest as needed
       // For example, change some attribute value
       const versionCode = newVersion.replace('1.1', '101').replaceAll('.', '')
       manifest = manifest.replace(/android:versionCode="[^"]*"/, `android:versionCode="${versionCode}"`);
   
       // Write back the modified manifest
       fs.writeFileSync(androidManifestPath, manifest, 'utf-8')
}