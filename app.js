var config = {
    apiKey: "AIzaSyAn0idywCGZyCEDf3_VVOrM5-LigXkP4Qc",
    authDomain: "pokeronlinedom.firebaseapp.com",
    databaseURL: "https://pokeronlinedom.firebaseio.com",
    projectId: "pokeronlinedom",
    storageBucket: "pokeronlinedom.appspot.com",
    messagingSenderId: "727511636242"
  };
  firebase.initializeApp(config);
  var firestore = firebase.firestore();

  const docRef = firestore.doc("samples/sandwichData");
  const outputHeader = document.querySelector("#hotDogOutput");
  const inputTextField = document.querySelector("#latestHotDogStatus");
  const saveButton = document.querySelector("#saveButton");
  const loadButton = document.querySelector("#loadButton");

  saveButton.addEventListener("click", function() {
      const textToSave = inputTextField.value;
      console.log("I am going to save " + textToSave + " to Firestore");
      docRef.set({
          hotDogStatus: textToSave
      }).then(function() {
          console.log("Status saved!");
      }).catch(function (error){
          console.log("Got an error: ", error);
      });
  });

  loadButton.addEventListener("click", function() {
      docRef.get().then(function (doc) {
          if (doc && doc.exists) {
              const myData = doc.data();
              outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
          }
      }).catch(function error() {
          console.log("Got and error: ", error);
      });
  });

  getRealtimeUpdates = function() {
      docRef.onSnapshot({includeMetadataChanges: false}, function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            console.log("Check out this document I received ", doc);
            outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
        }
      })
  }

  getRealtimeUpdates();
