/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.removeExpiredCartItems = functions.pubsub.schedule('every 24 hours').onRun(async () => {
  const now = new Date();
  const usersSnapshot = await admin.firestore().collection('users').get();

  usersSnapshot.forEach(async (userDoc: { id: any; }) => {
    const cartRef = admin.firestore().collection('users').doc(userDoc.id).collection('cart');
    const cartSnapshot = await cartRef.get();

    cartSnapshot.forEach(async (cartDoc: { data: () => any; id: any; }) => {
      const cartItem = cartDoc.data();
      const addedAt = cartItem.addedAt.toDate();
      const expirationDate = new Date(addedAt.getTime() + 3 * 24 * 60 * 60 * 1000);

      if (expirationDate < now) {
        await cartRef.doc(cartDoc.id).delete();
        console.log(`Removed expired cart item: ${cartDoc.id}`);
      }
    });
  });

  return null;
});
