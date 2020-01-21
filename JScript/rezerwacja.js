class ReservationData {
  constructor(endpoint, keys) {
    this.endpoint = endpoint;
    this.keys = keys;
    this.fetchData((data) => this.insertData(data));
  }

  getMarkup = (house) => `
    <div class="Zdjecie1">
      <img src="Images/m1.png">
      <div>
      <input class="button1" value="Zarezerwuj" type="submit" onclick="window.location.href='zarezerwuj.html'">
    </div>
    </div>
          <div class="opis1">
              <label>Ilosc lazienek : ${house.nOfBathrooms}</label>
              </br>    </br>
              <label>Ilosc sypialni : ${house.nOfBedrooms}</label>
              </br>    </br>
              <label>Ilosc pokoi : ${house.nOfRooms}</label>
              </br>    </br>
              <label>Pietro : ${house.floor}</label>
              </br>    </br> </br>
              <label>Data wlaczenia do oferty : ${house.dateOfRegistration}</label>
          </div>
    <div class="sOpis1">
      ${house.description}
    </div>
    <div class="kreska"></div>
  `;

  insertData = (data) => {
    const contener = document.getElementsByClassName('contener')[0];
    const innerHTML = data.map((reservation) => this.getMarkup(reservation))
    .join();
    contener.innerHTML = innerHTML;
  }

  fetchData = (callback) => {
    return fetch(`http://localhost:5000/api/house`)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          callback(data);
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
}

new ReservationData()
