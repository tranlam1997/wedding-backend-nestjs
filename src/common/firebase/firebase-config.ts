import admin from 'firebase-admin';
import { getDatabase } from 'firebase-admin/database';
const serviceAccount = require('./serviceAccount.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chat-app-71f35-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db = getDatabase();

export {db, admin}