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
  if (endpoint === 'user') {
    const ommitProps = ['reservations'];
    ommitProps.forEach(prop => {
      delete body[prop];
    });
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
  constructor(endpoint, keys, selects, options={}) {
    this.endpoint = endpoint;
    this.keys = keys;
    this.selects = selects;
    this.options = options;
    this.selectsData = {};
    this.data = {};

    if (this.selects) {
      Object.keys(this.selects).forEach((key, i) => {
        if (typeof this.selects[key] === 'function') {
          this.selects[key](res => {
          this.selectsData[key] = res;
            if (Object.keys(this.selectsData).length === Object.keys(this.selects).length) {
              this.fetchData((data) => {
                this.data = data;
                this.insertData(data)
              });
            }
          });
        }
      });
    } else {
      this.fetchData((data) => {
        this.data = data;
        this.insertData(data);
      });
    }
  }

  getData = () => this.data;

  getInputMarkup = (key, value, disabled=false) => {
    if (this.selects && Object.keys(this.selects).includes(key)) {
      return `<select value="${value}" style="width: 100%;" data-key="${key}" ${disabled ? 'disabled="true"' : ""}>`+
      this.selectsData[key].map(value => `<option value=${value._id}>${key === 'rentingPersonId' ? `${value.firstName} ${value.secondName}` : value._id}</option>`).join('\n')
      +
      `</select>`;
    }
    if (Array.isArray(value)) {
      return `<select value="${value[0]}" style="width: 100%;" data-key="${key}">`+
      value.map((val, i) => `<option value=${val}>${val}</option>`).join('\n')
      +
      `</select>`;
    }
    return `<input style="width: 100%;" data-key="${key}" type="text" value="${value}" ${disabled ? 'disabled="true"' : ""}></input>`;
  }

  insertData = (data) => {
    const table = document.getElementById(`${this.endpoint}-table`);
    if (!table) {
      return null;
    }
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
  'nationality',
   'reservations'
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
], { 'rentingPersonId': UserData.fetchData, 'houseId': HouseData.fetchData });
