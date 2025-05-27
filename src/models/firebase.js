const admin = require("firebase-admin");

let serviceAccount;

if (process.env.FIREBASE_CONFIG_JSON) {
  // ambiente de produção (Railway)
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG_JSON);
} else {
  // ambiente local - carrega do arquivo
  serviceAccount = require("../firebase-config.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
