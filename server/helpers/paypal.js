const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: "sandbox", // 'sandbox' or 'live'
  
  client_id: "AUSUcYXUdooc9Um1qgCE-qQ0n_KDDQeA8SlNC4qA6aHRAtS0NTXn2UTjJXi0sT9JiqB_eKQoTQJlMaUN",
  client_secret: "EAbS5Hg0UL7uKiDF-2yS4SgmBwBw_2jBdC1rtnVI3AmiGH9dEWnpcEMjgD59CfEJmrXCUPB7Nia8onXO",
});

console.log("PayPal SDK configured:", paypal);
