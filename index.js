const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

class FireCache {

    static async set(key, value, expire = 60*60*4){
        const doc = {
            key,
            value: typeof value !== 'string' ? Value.toString() : value,
            expire: admin.firestore.Timestamp.fromMillis(new Date().getTime() + expire*1000)
        }
        return await admin.firestore().collection('cache').doc(key).set(doc);
    }

    static async get(key){
        let snap = admin.firestore().collection('cache').doc(key).get();
        return snap.exists && snap.data();
    }

}

module.exports = FireCache