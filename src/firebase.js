import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: `${process.env.local.REACT_APP_apiKey}`,
    authDomain: `${process.env.local.REACT_APP_authDomain}`,
    projectId: `${process.env.local.REACT_APP_projectId}`,
    storageBucket: `${process.env.local.REACT_APP_storageBucket}`,
    messagingSenderId: `${process.env.local.REACT_APP_messagingSenderId}`,
    appId: `${process.env.local.REACT_APP_appId}`
  };
const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp)