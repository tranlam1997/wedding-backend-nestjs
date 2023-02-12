import admin from 'firebase-admin';
import { getDatabase } from 'firebase-admin/database';
import serviceAccount from './serviceAccount.json';

admin.initializeApp({
    credential: admin.credential.cert(JSON.stringify(serviceAccount)),
    databaseURL: "https://chat-app-71f35-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db = getDatabase();

export {db, admin}