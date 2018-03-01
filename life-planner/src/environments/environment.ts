// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDGTc0KQAwXCA0dvdSBuuhryKnvWwH2e9g',
    authDomain: 'q2-life-planner.firebaseapp.com',
    databaseURL: 'https://q2-life-planner.firebaseio.com',
    projectId: 'q2-life-planner',
    storageBucket: 'q2-life-planner.appspot.com',
    messagingSenderId: '633852515545'
  }
};
