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

  const docRefStatus = firestore.doc("filter/paramStatus");
  const docRefCountry = firestore.doc("filter/paramCountry");
  const docRefUrl = firestore.doc("filter/paramUrl");

  const pokerStatusOutput = document.querySelector("#PokerStatusOutput");
  const latestPokerStatus = document.querySelector("#latestPokerStatus");
  const saveStatusButton = document.querySelector("#saveStatusButton");
  const loadStatusButton = document.querySelector("#loadStatusButton");

  const pokerCountryOutput = document.querySelector("#PokerCountryOutput");
  const latestPokerCountry = document.querySelector("#latestPokerCountry");
  const saveCountryButton = document.querySelector("#saveCountryButton");
  const loadCountryButton = document.querySelector("#loadCountryButton");

  const pokerUrlOutput = document.querySelector("#PokerUrlOutput");
  const latestPokerUrl = document.querySelector("#latestPokerUrl");
  const saveUrlButton = document.querySelector("#saveUrlButton");
  const loadUrlButton = document.querySelector("#loadUrlButton");

  saveStatusButton.addEventListener("click", function() {
      const newStatus = latestPokerStatus.value;
      docRefStatus.set({
          Status: newStatus
      }).then(function() {
          console.log("Status saved!");
      }).catch(function (error){
          console.log("Got an error: ", error);
      });
  });

  loadStatusButton.addEventListener("click", function() {
      docRefStatus.get("Status").then(function (doc) {
          if (doc && doc.exists) {
              const myData = doc.data();
              pokerStatusOutput.innerText = "Poker status: " + myData.Status;
          }
      }).catch(function error() {
          console.log("Got and error: ", error);
      });
  });

  saveCountryButton.addEventListener("click", function() {
      const newCountry = latestPokerCountry.value;
      docRefCountry.set({
          Country: newCountry
      }).then(function() {
          console.log("Status saved!");
      }).catch(function (error){
          console.log("Got an error: ", error);
      });
  });

  loadCountryButton.addEventListener("click", function() {
      docRefCountry.get("Contry").then(function (doc) {
          if (doc && doc.exists) {
              const myData = doc.data();
              pokerCountryOutput.innerText = "Poker country: " + myData.Country;
          }
      }).catch(function error() {
          console.log("Got and error: ", error);
      });
  });

  saveUrlButton.addEventListener("click", function() {
      const newUrl = latestPokerUrl.value;
      docRefUrl.set({
          Url: newUrl
      }).then(function() {
          console.log("Status saved!");
      }).catch(function (error){
          console.log("Got an error: ", error);
      });
  });

  loadUrlButton.addEventListener("click", function() {
      docRefUrl.get("Url").then(function (doc) {
          if (doc && doc.exists) {
              const myData = doc.data();
              pokerUrlOutput.innerText = "Poker url: " + myData.Url;
          }
      }).catch(function error() {
          console.log("Got and error: ", error);
      });
  });

  getRealtimeUpdates = function() {
      docRefStatus.onSnapshot({includeMetadataChanges: false}, function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            console.log("Check out this document I received ", doc);
              pokerStatusOutput.innerText = "Poker status: " + myData.Status;
            }
          })
          docRefCountry.onSnapshot({includeMetadataChanges: false}, function (doc) {
            if (doc && doc.exists) {
                const myData = doc.data();
                console.log("Check out this document I received ", doc);
                pokerCountryOutput.innerText = "Poker country: " + myData.Country;
              }
            })
            docRefUrl.onSnapshot({includeMetadataChanges: false}, function (doc) {
              if (doc && doc.exists) {
                  const myData = doc.data();
                  console.log("Check out this document I received ", doc);
                  pokerUrlOutput.innerText = "Poker url: " + myData.Url;
                }
              })
  }

  getRealtimeUpdates();
