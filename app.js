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

  const docRef = firestore.doc("filter/param");
  const pokerStatusOutput = document.querySelector("#PokerStatusOutput");
  const latestPokerStatus = document.querySelector("#latestPokerStatus");
  const saveStatusButton = document.querySelector("#saveStatusButton");
  const loadStatusButton = document.querySelector("#loadStatusButton");

  saveStatusButton.addEventListener("click", function() {
      const newStatus = latestPokerStatus.value;
      docRef.set({
          Status: newStatus
      }).then(function() {
          console.log("Status saved!");
      }).catch(function (error){
          console.log("Got an error: ", error);
      });
  });

  loadStatusButton.addEventListener("click", function() {
      docRef.get("Status").then(function (doc) {
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
            pokerStatusOutput.innerText = "Hot dog status: " + myData.Status;
        }
      })
  }

  getRealtimeUpdates();
