
# Todo X

TodoX: Simplify your life with our intuitive to-do app. Organize tasks, set priorities, and stay on top of your responsibilities effortlessly.




## Features

- Create User / Login
- Add / Update / Delete Tasks
- View Recent tasks updated in past 7 days
- Check All Tasks
- Check All Completed Tasks
- Mark Task As completed once done


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`EXPO_PUBLIC_API_URL`

`EXPO_PUBLIC_AUTH_URL`

`EXPO_PUBLIC_API_KEY`


## Run Locally

Clone the project

```bash
  git clone https://github.com/Nileshdcool/todo-app.git
```

Go to the project directory

```bash
  cd todo-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Installation

Install my-project with npm

```bash
  npm install --global eas-cli && eas init --id c2102433-1614-484c-8e90-bdb074de10b1
  eas login to make sure it assigns the project to correct EAS project ID
  eas build:configure

<!-- preview build -->
  eas build -p android --profile preview
  eas build -p ios --profile preview
  
<!-- prod builds -->
  eos build --platform android
  eos build --platform ios
  npx expo run:ios --no-build-cache
```
    
## Deployment

To deploy this project run

    1. Pay Platform fees 
    2. Generate Certificates
    3. certs/ios => add certificates here
    4. Create New IOS application under development account
    4. create prfessioning profile 
    5. add profisioning certificate under certs folder.
    6. create credentials.json file and include path
    7. Excecute certificates in mac system once to add it into keychain
    8. add // "credentialsSource": "local" under eas.json under production.




## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Related

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



## Authors

- [@Nileshdcool](https://github.com/Nileshdcool)

