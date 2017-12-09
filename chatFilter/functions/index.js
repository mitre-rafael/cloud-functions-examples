const functions = require('firebase-functions');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.chatFilter = functions.database.ref('posts/{pushId}')
.onWrite(event => {

  const post = event.data.val();

  if (post.filtered){
    return
  }
  console.log("filtering...")
  post.filtered = true;
  console.log(post.title)
  post.title = filter(post.title);
  post.body = filter(post.body);

  return event.data.ref.set(post);

})
function filter (string){
  var filteredText = string;

  filteredText = filteredText.replace(/\bstupid\b/ig, "wonderful");
  return filteredText;

}
