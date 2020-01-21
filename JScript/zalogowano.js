class TableData {
  constructor(endpoint, keys) {
    this.endpoint = endpoint;
    this.keys = keys;
    this.fetchData((data) => this.insertData(data));
  }

  getInputMarkup = (key, value, disabled=false) => {
    return `<input style="width: 100%;" data-key="${key}" type="text" value="${value}" ${disabled ? 'disabled="true"' : ""}></input>`;
  }

  insertData = (data) => {
    const table = document.getElementById(`${this.endpoint}-table`);
    data.forEach((key, i) => {
      const row = table.insertRow(i + 1);
      this.keys.forEach((key, j) => {
        const cell = row.insertCell(j);
        cell.innerHTML = this.getInputMarkup(
          key, data[i][key], j === 0
        );
      });
      const deleteBtnCell = row.insertCell(this.keys.length);
      const modifyBtnCell = row.insertCell(this.keys.length + 1);
      deleteBtnCell.innerHTML = `<button class="u" id="usunButton3" data-user_id=${data[i]['_id']} data-index=${i} onclick="delete${this.endpoint.charAt(0).toUpperCase() + this.endpoint.substring(1)}(this)">-</button>`;
      modifyBtnCell.innerHTML = `<button class="zm" id="zBM1" data-user_id=${data[i]['_id']} data-index=${i} onclick="modify${this.endpoint.charAt(0).toUpperCase() + this.endpoint.substring(1)}(this)">?</button>`;
    });
  }

  fetchData = (callback) => {
    return fetch(`http://localhost:5000/api/${this.endpoint}`)
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


const UserData = new TableData('user', [
  '_id',
  'firstName',
  'secondName',
  'dateOfBirth',
  'pesel',
  'nationality'
]);
// UserData.fetchData((data) => console.log(data))
const HouseData = new TableData('house', [
  '_id',
  'nOfBathrooms',
  'nOfBedrooms',
  'nOfRooms',
  'floor',
  'dateOfRegistration',
  'description'
]);
const ReservationData = new TableData('reservation', [
  '_id',
  'houseId',
  'rentingPersonId',
  'reservationStart',
  'reservationEnd',
  'details',
  'startOfAccomodation',
  'endOfAccomodation'
]);
