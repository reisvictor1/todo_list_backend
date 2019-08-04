const functions = require('firebase-functions');
const admin = require('firebase-admin')


admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
 });


 exports.addItem = functions.https.onRequest( async (req,res) => {

  
   const itemString = req.query.item;

   if(!itemString){
      res.send("Campo obrigatório está vazio")
   }

   const newItem = await admin.database().ref('/listItem').push({item: itemString})

   res.redirect(303,newItem.ref.toString())

 })

exports.deleteItems = functions.https.onRequest((req,res) => {

   const item = req.query.item;


   if(!item){
      res.send("Campo obrigatório está vazio")
   }

   const removedItem = admin.database().ref('/listItems')

   console.log(removedItem)


}) 

 exports.showItems = functions.https.onRequest( async (req,res) => {

   const allItems = await admin.database().ref('/listItems').orderByValue()

   res.send(allItems)
 })