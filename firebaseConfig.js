// module: This syntax is part of CommonJS, the module system used by Node.js. It uses the 'require' function to bring in the module.
// const admin = require('firebase-admin')

// module: This syntax(import and export) is commonly used in modern JavaScript(ES6) development environments to bring in the module.
// The firebase-admin module is imported using ES6 syntax. 
// This module allows the server-side Node.js application to interact with Firebase services.
import admin from 'firebase-admin'

// CommonJS module (require), the createRequire function from the node:module package is used. 
// This allows you to use require in an ES module.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// Loading the Service Account Credentials:
const serviceAccount = require('./serviceAccount.json');

// Importing getDatabase Function from the firebase-admin/database module,This function is used to get a reference to the Firebase Realtime Database.
const { getDatabase } = require('firebase-admin/database');

// Firebase Admin SDK is initialized using the initializeApp method. 
// This method takes an object with two key configurations:
// credential: The cert method of 'admin.credential' is used to generate a credential object from the service account, enabling secure communication with Firebase.
// databaseURL: This is the URL of the Firebase Realtime Database, specifying which database the application will interact with.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://digitalplantbook-default-rtdb.europe-west1.firebasedatabase.app'
});

// export const db = admin.database();
export const db = getDatabase();
