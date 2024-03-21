on ~/

    apt update; 
    apt upgrade -y
    git clone git@github.com:roddonalds/builderCordova.git
    mv builderCordova app
    nano .bashrc (at end write cd app;)
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    source .bashrc
    nvm install 20
    nvm use 20
    npm install
    npm install -g cordova@latest
    npm install -g pm2
    pm2 startup

    sudo apt install build-essential
    sudo apt install openjdk-8-jdk -y
    sudo apt install android-sdk -y
    sudo apt install gradle
    sudo apt install sdkmanager
    sudo apt install imagemagisk
    sudo apt install zipalign

    sdkmanager "build-tools;19.1.0"

    git config --global init.defaultBranch main
    git config --global user.name "roddonalds"
    git config --global user.email "zaffpontoquarenta@gmail.com"

    npm run git:start
    
on ~/app

	npm install
	npm run set:icon

on .bashrc

	export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
	export ANDROID_HOME=/usr/lib/android-sdk
	export PATH=$PATH:$ANDROID_HOME/platform-tools

then

    source ~/.bashrc

then, try hit

	cordova build android

if you error Unrecognized option: --illegal-access=permit

	then edit file  

		/root/app/platforms/android/gradlew

			remove " --illegal-access = permit" from code

if you see a noising warning then edit file

	/root/app/platforms/android/build.gradle

		remove/coment on line :40

	      	defaultBuildToolsVersion="29.0.2"

if the generated .aab does not pass on Play Console because of exported attribute

	add android:exported="true" to start of <manifest> tag

		/root/app/platforms/android/app/src/main/AndroidManifest.xml

