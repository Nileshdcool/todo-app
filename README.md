# todo-app

## Reference Resources

### Setup Expo EAS Account 

1. npm install --global eas-cli && eas init --id c2102433-1614-484c-8e90-bdb074de10b1
2. eas login to make sure it assigns the project to correct EAS project ID
3. eas build:configure
<!-- preview build -->
4. eas build -p android --profile preview
5. eas build -p ios --profile preview
<!-- prod builds -->
6. eos build --platform android
7. eos build --platform ios
8. npx expo run:ios --no-build-cache

### IOS / Android Manual steps 

1. Pay Platform fees 
2. Generate Certificates
3. certs/ios => add certificates here
4. Create New IOS application under development account
4. create prfessioning profile 
5. add profisioning certificate under certs folder.
6. create credentials.json file and include path
7. Excecute certificates in mac system once to add it into keychain
8. add // "credentialsSource": "local" under eas.json under production.

### Firebase API documentation

https://firebase.google.com/docs/database/rest/retrieve-data#filtering-by-value

### Expo Reference Material 

https://docs.expo.dev/guides/environment-variables/

https://docs.expo.dev/build/setup/

https://docs.expo.dev/versions/latest/config/app/

https://docs.expo.dev/distribution/app-stores/#versioning-your-app

https://docs.expo.dev/build-reference/app-versions/

https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleshortversionstring

https://docs.expo.dev/build/introduction/

### Spalsh & Icons Screen Guide

Resolutions - 

Spalsh Screen - 1284 * 2778
Icon - 1024 * 1024
Adaptive Iocn - 1024 * 1024

https://docs.expo.dev/tutorial/configuration/

https://docs.expo.dev/develop/user-interface/splash-screen/

