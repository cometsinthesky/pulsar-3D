var config = {
  apiKey: "AIzaSyCpSSAOkaLCcLFOYv_XGgfmEwaffMSooOI",
  authDomain: "country-likes.firebaseapp.com",
  databaseURL: "https://country-likes-default-rtdb.firebaseio.com/",
  storageBucket: "country-likes.appspot.com",
  appId: "1:878805000031:web:7289c58525427e47f5a0ea",
  messagingSenderId: "878805000031",
};

// Initialize Firebase
firebase.initializeApp(config);

var dCounters = document.querySelectorAll(".CountLike");
[].forEach.call(dCounters, function (dCounter) {
  var el = dCounter.querySelector("button");
  var cId = dCounter.id;
  var dDatabase = firebase.database().ref("Like Number Counter").child(cId);

  // Get firebase data
  dDatabase.on("value", function (snap) {
    var data = snap.val() || 0;
    dCounter.querySelector("span").innerHTML = data;
  });

  // Set firebase data and log custom event with Firebase Analytics
  el.addEventListener("click", function () {
    // Get user's country and city using geolocation
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        const country = data.country_name;
        const city = data.city;
        dDatabase.transaction(function (dCount) {
          return (dCount || 0) + 1;
        });
        // Send country and city data to the real-time database
        firebase
          .database()
          .ref("CountryLikes")
          .child(country)
          .transaction(function (likes) {
            return (likes || 0) + 1;
          });
        firebase
          .database()
          .ref("CityLikes")
          .child(city)
          .transaction(function (likes) {
            return (likes || 0) + 1;
          });

        // Log custom event with Firebase Analytics
        firebase.analytics().logEvent("like_button_clicked", {
          country: country,
          city: city,
        });
      })
      .catch((error) => {
        console.error("Error getting user location:", error);
      });
  });
});

firebase.analytics(); // Certifique-se de chamar isso após a definição do evento
