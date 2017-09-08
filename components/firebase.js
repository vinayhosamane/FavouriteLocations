import firebase from 'firebase';
 var config = {
    apiKey: "AIzaSyAFT0VK-KEMRiaqzlP2m1qpFodP1DNqm-8",
    authDomain: "my-favourite-locations.firebaseapp.com",
    databaseURL: "https://my-favourite-locations.firebaseio.com",
    storageBucket: "my-favourite-locations.appspot.com",
};
const firebaseApp = firebase.initializeApp(config);
module.exports.itemsRef = firebaseApp.database();

//module.exports.FBApp = FbApp.database(); //this doesnt have to be database only