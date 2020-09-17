import * as firebase from 'firebase';

import '@firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyBMI1SqFrBdq2IS3GNTzA6cuEx6QbCHTls',
  authDomain: 'maziya.firebaseapp.com',
  databaseURL: 'https://maziya.firebaseio.com',
  projectId: 'maziya',
  storageBucket: 'maziya.appspot.com',
  messagingSenderId: '146625739252',
  appId: '1:146625739252:ios:360d88eff21cb85428a1a1',
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
var database = firebase.database();
const auth = firebase.auth();

export { firebase  , auth };
