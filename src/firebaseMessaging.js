// src/firebaseMessaging.js
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase'; // Importa el objeto 'messaging' correctamente

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'BNHJYZA8i_lLcP5EBDPcSx3iIAT6VI9ic7HunbCYqKWp6sLvg1PR_TgnIDKb7uSGasy56t1xuEeKNiM3Rv0ZO3k' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other necessary operations with the token
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
