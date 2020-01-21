function del(btn, endpoint) {
  const { _id } = btn.dataset;
  fetch(`http://localhost:5000/api/${endpoint}?id=${_id}`, { method: 'DELETE' })
  .then(res => window.location.reload());
}

function getInputKey(html) {
  const re = /(data-key=").*"/g;
  return html.match(re)[0].split("\"")[1];
}

function mod(btn, endpoint) {
  const { _id, index } = btn.dataset;
  const table = document.getElementById(`${endpoint}-table`);

  const { innerHTML } = table.childNodes[1]
  .rows
  .item(1)
  .cells[0];

  const { length } = table.childNodes[1]
  .rows
  .item(Number(index) + 1)
  .cells;

  const body = {};

  for(let i = 0; i < length - 2; i++) {
    const { innerHTML, childNodes } = table.childNodes[1]
    .rows
    .item(Number(index) + 1)
    .cells[i];

    const value = childNodes[0].value;
    const key = getInputKey(innerHTML);
    body[key] = value;
  }

  fetch(`http://localhost:5000/api/${endpoint}?id=${_id}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers : {
      'Content-Type': 'application/json'
    }
  })
  .then(res => window.location.reload());
}

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
      deleteBtnCell.innerHTML = `<button class="u" id="usunButton3" data-_id=${data[i]['_id']} data-index=${i} onclick="del(this,'${this.endpoint}')">-</button>`;
      modifyBtnCell.innerHTML = `<button class="zm" id="zBM1" data-_id=${data[i]['_id']} data-index=${i} onclick="mod(this,'${this.endpoint}')">?</button>`;
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
